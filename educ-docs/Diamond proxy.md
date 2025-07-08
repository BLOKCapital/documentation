# Why do we need the Diamond Proxy pattern?

### Some brief on Proxy and Factory contracts

1. **Proxy Contracts**
A proxy contract acts as an intermediary that delegates calls to an underlying implementation contract. It allows us to upgrade or modify the logic of a smart contract without changing its address or disturbing its state.
   - The proxy contract holds the storage (state) and a reference to the implementation contract.
   - When a user interacts with the proxy, it forwards the call to the implementation contract using delegatecall, which executes the logic in the context of the proxy's storage.
   - To upgrade, the proxy is pointed to a new implementation contract without altering its address.

2. **Factory Contracts**
A factory contract is a smart contract that creates and deploys other smart contracts, often referred to as "child contracts." It serves as a template for generating multiple instances of a contract. It automates the deployment of standardized contracts and tracks created contracts.
   - The factory contract contains logic to deploy new contracts, typically using the create or create2 opcode in Solidity.
   - It may store references to the deployed contracts and provide methods to interact with them.
   - Users call the factory to create new instances, passing parameters if needed (e.g., configuration data).


### Need for Diamond proxy

![Alt text](/img/diamondProxy2.png)

While Beacon and UUPS proxies offer simpler upgrade mechanisms, they have a key limitation: each upgrade requires replacing the entire implementation contract. This approach lacks flexibility, especially when the system needs to evolve and support modular extensibility.

For example, suppose in the future we introduce a new feature such as account transferability—the ability for users to transfer their account to someone else. With Beacon or UUPS, implementing this would mean updating the entire implementation contract, which is riskier and it can introduce other vulnerabilities in the system.

On the contrary, the Diamond standard (EIP-2535) allows us to add this functionality in a modular way. We can simply develop a new facet (e.g., AccountTransferFacet) and attach it to the existing diamond without affecting other parts of the contract. This improves upgrade granularity, minimizes risk, and promotes clean separation of concerns.

Each diamond proxy has two other parts:
   - `diamondCut` — the mechanism used to add, replace, or remove facets.
  - `diamondLoupe` — used to query which functions exist on which facets.


In our architecture, both of these (`diamondCut` and `diamondLoupe`) will be centralized through DAO governance. The DAO tracks all active facets and handles upgrades securely and transparently.

This setup gives us a DAO controlled upgrade mechanism
