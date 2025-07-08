---
sidebar_position: 2   
---

# Gardens and Diamonds

## The Architecture of Diamonds and Gardens

At BLOK Capital, our main architecture for the smart contracts depends on the Diamond proxy pattern. In this section, we’ll explore the architecture of diamonds, a factory-based deployment approach inspired by the Nick Mudge Diamond repository, and how these concepts create a "garden" powering the BLOK architecture.

## Proxy Contract Flow: 
![Alt text](/img/diamondSchema2.png)

## What is the Diamond Standard?

The Diamond Standard, proposed by Nick Mudge in EIP-2535, helps to address the problem of how to create upgradable, modular contracts without hitting gas limits or size constraints. Traditional contracts are monolithic, with all logic packed into a single address, making upgrades super hard and risky. Diamonds, by contrast, are like gardens: they consist of a single **Diamond contract** (for e.g. the soil) that delegates functionality to multiple **facets** ( e.g. the plants), each containing specific logic.

A diamond is a proxy contract that uses a unique architecture to:

- **Modularize logic**: Break functionality into smaller, reusable facets.
- **Enable upgrades**: Add, replace, or remove facets without redeploying the entire contract.
- **Bypass size limits**: Store only function selectors in the diamond, delegating execution to facets.

This modularity makes diamonds ideal for complex decentralized applications (dApps) that need to evolve/upgrade over time, much like a garden that can be replanted or expanded.

## The Architecture of a Diamond

Imagine the diamond as a central hub (the `Diamond.sol` contract) that routes function calls to specialized facets. Each facet is a separate contract containing a subset of the system’s functionality, such as ownership, token transfers, or governance. The diamond maintains a mapping of **function selectors** (unique identifiers for functions) to facet addresses, allowing it to delegate calls efficiently.
![Alt text](/img/delegation.png)

### Key Components in the Diamond Architecture

1. **Diamond Contract** (`Diamond.sol`):
    - Acts as the entry point for all interactions.
    - Stores a mapping of function selectors to facet addresses.
    - Implements the `fallback` function to route calls to the appropriate facet.
    - Uses the `diamondCut` function to add, replace, or remove facets, enabling upgrades.
2. **Facets**:
    - Independent contracts (e.g., `DiamondCutFacet.sol`, `DiamondLoupeFacet.sol`) containing specific functions.
    - For example, `DiamondCutFacet` handles upgrades, while `DiamondLoupeFacet` provides introspection (querying facet addresses and selectors).
3. **Interfaces**:
    - Standard interfaces like `IDiamondCut` and `IDiamondLoupe` ensure consistency.
    - Facets implement these interfaces to provide specific functionality.
4. **Function Selectors**:
    - A 4-byte hash (e.g., `keccak256("functionName()")`) that identifies a function.
    - The diamond maps selectors to facet addresses, ensuring the correct contract handles each call.

![Alt text](/img/diamondFacet2.png)

Here’s a simplified example of the `Diamond.sol` fallback function, which delegates calls to facets:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Diamond {
    mapping(bytes4 => address) public facets;

    fallback() external payable {
        address facet = facets[msg.sig];
        require(facet != address(0), "Function does not exist");
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())
            let result := delegatecall(gas(), facet, ptr, calldatasize(), 0, 0)
            let size := returndatasize()
            returndatacopy(ptr, 0, size)
            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }
}

```

This code shows how the diamond routes incoming calls (`msg.sig`) to the appropriate facet, enabling modularity.

## The Garden: Modular and Scalable Systems

Why call this a "garden"? In a garden, each plant (facet) serves a purpose, some provide structure (like `DiamondCutFacet`), others add beauty (like `DiamondLoupeFacet`), and some bear fruit (like custom facets for your dApp’s logic). The Diamond Standard allows you to cultivate a garden of smart contracts that:

- **Grow over time**: Add new facets as requirements evolve.
- **Prune and replant**: Replace or remove outdated facets without disrupting the garden.
- **Scale efficiently**: Keep the core contract lightweight by offloading logic to facets.

This modularity is particularly powerful for dApps like DAOs, DeFi protocols, or NFT platforms, where new features (e.g., governance, staking) can be added without redeploying the entire system.

## Factory-Based Deployment with `DiamondFactory.sol`

Deploying diamonds manually can be tricky, especially for systems requiring multiple instances (e.g., a marketplace with many user-specific diamonds). The `diamond-foundry` repository introduces `DiamondFactory.sol`, a factory contract that automates diamond deployment and facet initialization, acting like a gardener planting new plots.

### How `DiamondFactory.sol` Works

The factory deploys a new `Diamond` contract and initializes it with specified facets. Here’s a simplified version of `DiamondFactory.sol`:
```js
// SPDX-License-License: MIT
pragma solidity ^0.8.0;

import {IDiamondCut} from "../interfaces/IDiamondCut.sol";
import {Diamond} from "../Diamond.sol";

contract DiamondFactory {
    event DiamondDeployed(address diamond, address owner);

    function deployDiamond(
        address _owner,
        address[] memory _facets,
        bytes[] memory _initData
    ) external returns (address diamond) {
        diamond = address(new Diamond(_owner, address(this)));
        IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](_facets.length);
        for (uint256 i = 0; i < _facets.length; i++) {
            cuts[i] = IDiamondCut.FacetCut({
                facetAddress: _facets[i],
                action: IDiamondCut.FacetCutAction.Add,
                functionSelectors: getSelectors(_facets[i])
            });
        }
        IDiamondCut(diamond).diamondCut(cuts, address(0), "");
        emit DiamondDeployed(diamond, _owner);
        return diamond;
    }

    function getSelectors(address facet) internal pure returns (bytes4[] memory selectors) {
        // Simplified: Hardcode selectors for known facets
        selectors = new bytes4[](4);
        selectors[0] = bytes4(keccak256("facets()"));
        selectors[1] = bytes4(keccak256("facetFunctionSelectors(address)"));
        selectors[2] = bytes4(keccak256("facetAddresses()"));
        selectors[3] = bytes4(keccak256("facetAddress(bytes4)"));
        return selectors;
    }
}

```

The factory:

1. Deploys a new `Diamond` contract with the specified owner.
2. Creates a `FacetCut` array to register facets (e.g., `DiamondCutFacet`, `DiamondLoupeFacet`).
3. Calls `diamondCut` to initialize the diamond with the facets.
4. Emits an event for tracking deployments.

This factory pattern enables scalable deployment, allowing you to plant multiple diamonds in your garden with minimal effort.

### Deployment Example

Here’s how you might deploy a diamond using Foundry’s scripting:
```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {DiamondFactory} from "../src/factory/DiamondFactory.sol";
import {DiamondCutFacet} from "../src/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "../src/facets/DiamondLoupeFacet.sol";

contract DeployDiamond is Script {
    function run() external {
        vm.startBroadcast();
        DiamondCutFacet cutFacet = new DiamondCutFacet();
        DiamondLoupeFacet loupeFacet = new DiamondLoupeFacet();
        DiamondFactory factory = new DiamondFactory();
        address[] memory facets = new address[](2);
        facets[0] = address(cutFacet);
        facets[1] = address(loupeFacet);
        bytes[] memory initData = new bytes[](2);
        initData[0] = "";
        initData[1] = "";
        address diamond = factory.deployDiamond(msg.sender, facets, initData);
        console.log("Diamond deployed at:", diamond);
        vm.stopBroadcast();
    }
}
```
Run this script with:
```shell
forge script script/DeployDiamond.s.sol --fork-url http://localhost:8545 --broadcast
```

## Testing the Garden

To ensure your diamond garden thrives, you need robust tests. Foundry’s Solidity-based testing makes this straightforward. Below is a test suite verifying the factory deployment and diamond functionality:
```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {DiamondFactory} from "../src/factory/DiamondFactory.sol";
import {DiamondCutFacet} from "../src/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "../src/facets/DiamondLoupeFacet.sol";
import {IDiamondLoupe} from "../src/interfaces/IDiamondLoupe.sol";

contract DiamondFactoryTest is Test {
    DiamondFactory factory;
    DiamondCutFacet cutFacet;
    DiamondLoupeFacet loupeFacet;
    address diamond;

    function setUp() public {
        cutFacet = new DiamondCutFacet();
        loupeFacet = new DiamondLoupeFacet();
        factory = new DiamondFactory();
        address[] memory facets = new address[](2);
        facets[0] = address(cutFacet);
        facets[1] = address(loupeFacet);
        bytes[] memory initData = new bytes[](2);
        initData[0] = "";
        initData[1] = "";
        diamond = factory.deployDiamond(address(this), facets, initData);
    }

    function testDiamondDeployment() public {
        assertTrue(diamond != address(0), "Diamond not deployed");
    }

    function testLoupeFunctions() public {
        IDiamondLoupe loupe = IDiamondLoupe(diamond);
        address[] memory facets = loupe.facetAddresses();
        assertEq(facets.length, 2, "Incorrect number of facets");
        assertEq(facets[0], address(cutFacet), "DiamondCutFacet not registered");
        assertEq(facets[1], address(loupeFacet), "DiamondLoupeFacet not registered");
    }
}
```
Run tests with:
```shell
forge test
```

## Benefits of the Diamond Garden

The Diamond Standard, paired with a factory-based deployment, offers:

- **Modularity**: Add new features (facets) without redeploying the core contract.
- **Scalability**: Deploy multiple diamonds for different users or use cases.
- **Upgradability**: Update functionality without breaking existing contracts.
- **Gas Efficiency**: Keep the diamond contract lightweight by offloading logic to facets.

## Conclusion

The Diamond Standard is a powerful tool for building modular, upgradable smart contract systems, akin to cultivating a garden where each plant (facet) contributes to a thriving ecosystem. By using `DiamondFactory.sol`, you can automate diamond deployment, making it easy to scale your garden across multiple instances. Whether you’re building a DeFi protocol, a DAO, or an NFT marketplace, the Diamond Standard offers the flexibility to grow and adapt.

For more details, check out the [forgenie diamond-foundry](https://github.com/forgenie/diamond-foundry) repository and [EIP-2535](https://eips.ethereum.org/EIPS/eip-2535).

Happy gardening!
