# Guide: Creating a New Diamond Facet

### Overview 
In this project we use the EIP-2535 “Diamond” pattern to compose modular contracts. A Diamond is a proxy that delegates calls to multiple Facets, each holding related logic. For example, “A Facets can be compared to an implementation contract… [it] holds the external function logic the proxy (Diamond) will call”. Facets allow us to split functionality into separate contracts that can be upgraded independently. Each facet has its own isolated state (using the Diamond Storage pattern) to avoid storage conflicts. This guide explains our conventions for adding a new facet, including folder structure, contract layout, and testing.

### Folder Structure
Each new facet has its own subfolder under src/facets/, containing five Solidity files, plus corresponding tests under test/facets/. For example, a Transfer facet would use:
- `src/facets/transfer/TransferFacet.sol` – the public facet contract.
- `src/facets/transfer/TransferBase.sol` – an abstract contract with internal logic.
- `src/facets/transfer/TransferStorage.sol` – a library (or contract) defining the storage layout.
- `src/facets/transfer/ITransfer.sol` – interface for external (public) functions.
- `src/facets/transfer/ITransferBase.sol` – interface for internal types (errors, structs, events).

Tests mirror this structure in `test/facets/transfer/`. You should create:

- `test/facets/transfer/transfer.sol` – an abstract test contract(TransferFacetTest) that sets up the diamond with this facet and a helper(TransferFacetHelper) that provides facet address, selectors, etc.
- A behavior/ subfolder for unit tests (one Solidity contract per facet method, named `<Facet>_<method>.t.sol`).


This naming convention ensures clarity and allows isolating tests via Foundry’s `--match-contract` flag.

### Facet Contract Layout
Within each facet folder, we follow a strict contract layout:

- `<FacetName>Storage.sol`: Implements the Diamond Storage pattern. Declare a `bytes32 constant STORAGE_SLOT = keccak256("blokc.<facet>.storage")`, a struct Layout with all facet state variables, and a function (often named layout()) that returns a pointer to that storage slot using inline assembly. For example:

```js
library TransferStorage {
    bytes32 internal constant STORAGE_SLOT = keccak256("blokc.transfer.storage");

    struct Layout {
        // Add required variables
        uint256 lastTransferBlock;
    }

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
```
This isolates the facet’s state so that each facet “can be understood as its own unit”.

- `<FacetName>Base.sol`: An abstract contract defining internal functions and logic. This contract imports the storage library and any required interfaces, and implements internal (or internal view) functions. It may also read/write storage via Layout `storage s = <FacetName>Storage.layout()`. For example, a Transfer facet’s base might have:
```js
abstract contract TransferBase is ITransferBase {
    using SafeERC20 for IERC20;

    function _transferEth(address payable to, uint256 amount) internal {
        if (amount > address(this).balance) revert Transfer_Failed();
        (bool success,) = to.call{ value: amount }("");
        if (!success) revert Transfer_Failed();
        TransferStorage.layout().lastTransferBlock = block.timestamp;
        emit ETHTransferExecuted(msg.sender, to, amount);
    }

    function _erc20Transfer(address token, address to, uint256 amount) internal {
        IERC20(token).safeTransfer(to, amount);
        TransferStorage.layout().lastTransferBlock = block.timestamp;
        emit ERC20TransferExecuted(token, msg.sender, to, amount);
    }

    function _erc20TransferFrom(address token, address from, address to, uint256 amount) internal {
        IERC20(token).safeTransferFrom(from, to, amount);
        TransferStorage.layout().lastTransferBlock = block.timestamp;
        emit ERC20TransferExecuted(token, from, to, amount);
    }
}
```

The `<FacetName>Base` contract also implements any internal helpers and emits events defined in its interface.

- `<FacetName>Facet.sol`: The public-facing facet contract. It inherits from the Base abstract, the external interface, and a generic Facet marker (provided by our framework). This contract defines the external functions that users or the Diamond owner can call. It should include an initializer (if needed) and apply access control (e.g. onlyDiamondOwner) on mutating calls. In code:
```js
contract TransferFacet is ITransfer, TransferBase {
    function transferEth(address payable to, uint256 amount) external override {
        _transferEth(to, amount);
    }

    function erc20Transfer(address token, address to, uint256 amount) external override {
        _erc20Transfer(token, to, amount);
    }

    function erc20TransferFrom(address token, address from, address to, uint256 amount) external override {
        _erc20TransferFrom(token, from, to, amount);
    }
}
```
Here, `ITransfer` defines the external API, and onlyDiamondOwner (from Facet) protects state-changing calls. The initialize method (if any) is called when the facet is first added. As recommended: “compose initializer and protect external calls in `<FacetName>Facet`”.

- `I<FacetName>.sol`: A Solidity interface defining only the external (public/external) functions of the facet. This is what clients of the diamond will use to interact with the facet. It should match the external methods in `<FacetName>Facet.sol`.
```js
interface ITransfer {
    function transferEth(address payable to, uint256 amount) external;
    function erc20Transfer(address token, address to, uint256 amount) external;
    function erc20TransferFrom(address token, address from, address to, uint256 amount) external;
}
```
- `I<FacetName>Base.sol`: A Solidity interface (or abstract interface) that contains all the internal types: custom errors, event declarations, enums, and struct definitions used by the facet. The `<FacetName>Base` contract and `<FacetName>Facet` can both use these definitions. This separation (external vs base interface) keeps the external interface clean while centralizing internal definitions for reuse. Custom errors should follow the naming convention `FacetName_Error`, such as `DiamondCut_InvalidFacet()` or `Lending_Unauthorized()` for clarity and consistency.

```js
interface ITransferBase {
    error Transfer_Failed();

    event ETHTransferExecuted(address indexed from, address indexed to, uint256 amount);
    event ERC20TransferExecuted(address indexed token, address indexed from, address indexed to, uint256 amount);
}
```
### Testing Facets
We test facets by deploying them into a Diamond using the provided Foundry test framework. The key conventions are:
- **Helper Contract** (`<FacetName>Helper`): Write a helper that creates the facet, and returns its address, selectors array, initializer function, and supported interface IDs. This is used by tests to assemble the Diamond configuration. For example, a TransferFacetHelper might implement facet() (return the facet address) and selectors() (array of function selectors to add).
```js
contract TransferFacetHelper is FacetHelper {
    TransferFacet public transferFacet;

    constructor() {
        transferFacet = new TransferFacet();
    }

    function facet() public view override returns (address) {
        return address(transferFacet);
    }

    function selectors() public view override returns (bytes4[] memory selectors_) {
        selectors_ = new bytes4 ;
        selectors_[0] = transferFacet.transferEth.selector;
        selectors_[1] = transferFacet.erc20Transfer.selector;
        selectors_[2] = transferFacet.erc20TransferFrom.selector;
    }

    function initializer() public view override returns (bytes4) {
        return bytes4(0); // No initializer for TransferFacet
    }

    function supportedInterfaces() public pure override returns (bytes4[] memory interfaces) {
        interfaces = new bytes4 ;
        interfaces[0] = type(ITransfer).interfaceId;
    }

    function creationCode() public pure override returns (bytes memory) {
        return type(TransferFacet).creationCode;
    }
}
```
- **Abstract Test** (`<FacetName>FacetTest`): Write an abstract test contract extending the base `FacetTest`. In `setUp()`, deploy the helper; override `diamondInitParams()` to return a `Diamond.InitParams` struct that includes adding your facet (via `helper.makeFacetCut(...)`) and any init calls. This attaches the facet’s interface to the Diamond. For example, see how a Uniswap facet is tested:
```js
abstract contract TransferFacetTest is FacetTest, ITransfer {
    TransferFacetHelper public transferFacetHelper;

    function setUp() public virtual override {
        super.setUp();
        transferFacetHelper = new TransferFacetHelper();
    }

    function diamondInitParams() public override returns (Diamond.InitParams memory) {
        FacetCut ;
        baseFacets[0] = transferFacetHelper.makeFacetCut(FacetCutAction.Add);

        MultiInit ;
        diamondInitData[0] = transferFacetHelper.makeInitData("");

        return Diamond.InitParams({
            baseFacets: baseFacets,
            init: address(0),
            initData: ""
        });
    }
}
```

- **Unit Tests**: For each external function in the facet, create a separate test contract named `<FacetName>_<MethodName>.t.sol` (following Foundry’s naming convention) inside the behavior/ folder. In these, use the Diamond’s address to call the facet functions via the interface (`ITransfer(address(diamond))`). Tests should call `I<FacetName>` functions and check state or revert reasons. By reusing `I<FacetName>Base` types, you can also assert on custom errors or events. Naming one contract per method allows running specific tests with -`-match-contract`.
```js
contract TransferFacet_Behavior is TransferFacetTest {
    MockERC20 token;
    address user = address(0x123);
    address recipient = address(0x456);

    function setUp() public override {
        super.setUp();
        token = new MockERC20();
        token.setBalance(address(this), 100 ether);
        token.setAllowance(address(this), address(this), 100 ether);
    }

    function test_Transfer_Success() public {
        uint256 amount = 1 ether;
        vm.expectEmit(address(this));
        emit ITransfer.TransferExecuted(address(token), address(this), recipient, amount);
        transferFacetHelper.facet().call(
            abi.encodeWithSelector(
                ITransfer.erc20Transfer.selector,
                address(token),
                recipient,
                amount
            )
        );
        assertEq(token.balanceOf(recipient), amount);
    }
}
```