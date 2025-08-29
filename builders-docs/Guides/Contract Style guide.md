# Smart contract style guide

### Copyright Header
```md
/*###############################################################################

    @title Diamond
    @author BLOK Capital DAO

    ▗▄▄▖ ▗▖    ▗▄▖ ▗▖ ▗▖     ▗▄▄▖ ▗▄▖ ▗▄▄▖▗▄▄▄▖▗▄▄▄▖▗▄▖ ▗▖       ▗▄▄▄  ▗▄▖  ▗▄▖ 
    ▐▌ ▐▌▐▌   ▐▌ ▐▌▐▌▗▞▘    ▐▌   ▐▌ ▐▌▐▌ ▐▌ █    █ ▐▌ ▐▌▐▌       ▐▌  █▐▌ ▐▌▐▌ ▐▌
    ▐▛▀▚▖▐▌   ▐▌ ▐▌▐▛▚▖     ▐▌   ▐▛▀▜▌▐▛▀▘  █    █ ▐▛▀▜▌▐▌       ▐▌  █▐▛▀▜▌▐▌ ▐▌
    ▐▙▄▞▘▐▙▄▄▖▝▚▄▞▘▐▌ ▐▌    ▝▚▄▄▖▐▌ ▐▌▐▌  ▗▄█▄▖  █ ▐▌ ▐▌▐▙▄▄▖    ▐▙▄▄▀▐▌ ▐▌▝▚▄▞▘


################################################################################*/
```

### Order of Layout of smart contract elements

**Contract elements should be laid out in the following order:**

1. Pragma statements
2. Import statements
3. Events
4. Errors
5. Interfaces
6. Libraries
7. Contracts

**Inside each contract, library or interface, use the following order:**

1. Type declarations
2. State variables
3. Events
4. Errors
5. Modifiers
6. Functions

Follow the official solidity guide for more : [link](https://docs.soliditylang.org/en/latest/style-guide.html#order-of-layout)

### Order of Functions

Ordering helps readers identify which functions they can call and to find the constructor and fallback definitions easier.

Functions should be grouped according to their visibility and ordered:

- constructor
- receive function (if exists)
- fallback function (if exists)
- external
- public
- internal
- private

Within a grouping, place the `view` and `pure` functions last.

---

```js
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract A {
    constructor() {
        // ...
    }

    receive() external payable {
        // ...
    }

    fallback() external {
        // ...
    }

    // External functions
    // ...

    // External functions that are view
    // ...

    // External functions that are pure
    // ...

    // Public functions
    // ...

    // Internal functions
    // ...

    // Private functions
    // ...
}
```
### Natspec and commenting guide
- Refer to the following repo for natspec and commenting examples : [link](https://github.com/CollarNetworks/protocol-core/blob/develop/src/ChainlinkOracle.sol)

### Sample contract
```js
// SPDX-License-Identifier: GPL-3.0
/*###############################################################################

    @title Diamond
    @author BLOK Capital DAO

    ▗▄▄▖ ▗▖    ▗▄▖ ▗▖ ▗▖     ▗▄▄▖ ▗▄▖ ▗▄▄▖▗▄▄▄▖▗▄▄▄▖▗▄▖ ▗▖       ▗▄▄▄  ▗▄▖  ▗▄▖ 
    ▐▌ ▐▌▐▌   ▐▌ ▐▌▐▌▗▞▘    ▐▌   ▐▌ ▐▌▐▌ ▐▌ █    █ ▐▌ ▐▌▐▌       ▐▌  █▐▌ ▐▌▐▌ ▐▌
    ▐▛▀▚▖▐▌   ▐▌ ▐▌▐▛▚▖     ▐▌   ▐▛▀▜▌▐▛▀▘  █    █ ▐▛▀▜▌▐▌       ▐▌  █▐▛▀▜▌▐▌ ▐▌
    ▐▙▄▞▘▐▙▄▄▖▝▚▄▞▘▐▌ ▐▌    ▝▚▄▄▖▐▌ ▐▌▐▌  ▗▄█▄▖  █ ▐▌ ▐▌▐▙▄▄▖    ▐▙▄▄▀▐▌ ▐▌▝▚▄▞▘


################################################################################*/

pragma solidity ^0.8.24;

/*//////////////////////////////////////////////////////////////
                            IMPORTS
//////////////////////////////////////////////////////////////*/

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/*//////////////////////////////////////////////////////////////
                           CONTRACTS
//////////////////////////////////////////////////////////////*/

/// @title ProtocolTemplate
/// @notice A starting point for BLOK Capital protocol modules adhering to the style guide.
/// @dev Replace placeholders with domain-specific logic. Follow visibility and layout ordering strictly.
contract ProtocolTemplate {
    /*//////////////////////////////////////////////
                1) TYPE DECLARATIONS
    //////////////////////////////////////////////*/

    /// @notice Example struct for cohesive configuration/state.
    struct Config {
        // slot 0
        address admin;     // privileged controller (e.g., DAO multisig or Diamond facet admin)
        // slot 1
        uint96  feeBps;    // example fee in basis points
        bool    paused;    // simple circuit breaker
    }

    /*//////////////////////////////////////////////
                2) STATE VARIABLES
    //////////////////////////////////////////////*/

    /// @notice Packed configuration/state.
    Config private _cfg;

    /// @notice Generic key-value parameters (optional pattern).
    mapping(bytes32 => uint256) private _params;

    /// @notice Example immutable version tag for off-chain tooling.
    string public constant VERSION = "v0.1.0-template";

    /*//////////////////////////////////////////////
                    3) EVENTS
    //////////////////////////////////////////////*/
    /// @notice Emitted when the admin address is updated.
    /// @param oldAdmin The previous admin.
    /// @param newAdmin The new admin.
    event AdminUpdated(address indexed oldAdmin, address indexed newAdmin);

    /*//////////////////////////////////////////////
                    4) ERRORS
    //////////////////////////////////////////////*/
    /// @notice Thrown when a caller that is not the admin invokes an admin-only function.
    error NotAdmin();

    /// @notice Thrown when an operation uses a zero address where it is not allowed.
    error ZeroAddress();

    /*//////////////////////////////////////////////
                    5) MODIFIERS
    //////////////////////////////////////////////*/

    /// @notice Restricts function to the current admin.
    modifier onlyAdmin() {
        if (msg.sender != _cfg.admin) revert NotAdmin();
        _;
    }

    /// @notice Reverts when the contract is paused.
    modifier whenNotPaused() {
        if (_cfg.paused) revert InvalidParameter(LibKeys.K_PAUSED, 1);
        _;
    }

    /*//////////////////////////////////////////////
                    6) FUNCTIONS
    //////////////////////////////////////////////*/

    //------------- Constructor -------------

    /// @notice Initializes the template with an admin and optional initial params.
    /// @param initialAdmin The admin address (DAO, multisig, or Diamond owner).
    /// @param initialFeeBps Initial fee basis points (0–10_000).
    /// @param initiallyPaused Whether the module starts paused.
    constructor(address initialAdmin, uint96 initialFeeBps, bool initiallyPaused) {
        if (initialAdmin == address(0)) revert ZeroAddress();
        if (initialFeeBps > 10_000) revert InvalidParameter(LibKeys.K_FEE_BPS, initialFeeBps);

        _cfg.admin = initialAdmin;
        _cfg.feeBps = initialFeeBps;
        _cfg.paused = initiallyPaused;

        _params[LibKeys.K_FEE_BPS] = initialFeeBps;
        _params[LibKeys.K_PAUSED] = initiallyPaused ? 1 : 0;
    }

    //------------- Receive (if exists) -------------

    /// @notice Accepts ETH transfers.
    receive() external payable {
        // Intentionally empty. Consider emitting an event if tracking deposits is required.
    }

    //------------- Fallback (if exists) -------------

    /// @notice Fallback for non-matching function selectors.
    fallback() external payable {
        // Intentionally empty. Consider delegating or reverting depending on module design.
    }

    //------------- External -------------

    /// @notice Update the admin address.
    /// @param newAdmin The new admin address.
    /// @dev External to keep the interface surface clear; restricted via onlyAdmin.
    function setAdmin(address newAdmin) external onlyAdmin {
        if (newAdmin == address(0)) revert ZeroAddress();
        address old = _cfg.admin;
        _cfg.admin = newAdmin;
        emit AdminUpdated(old, newAdmin);
    }

    /// @notice Update a numeric parameter by key.
    /// @param key The parameter key (see LibKeys).
    /// @param value The new value.
    /// @dev Example: setting FEE_BPS or PAUSED.
    function setParam(bytes32 key, uint256 value) external onlyAdmin {
        uint256 old = _params[key];

        // Example validation: enforce bounds for known keys.
        if (key == LibKeys.K_FEE_BPS) {
            if (value > 10_000) revert InvalidParameter(key, value);
            _cfg.feeBps = uint96(value);
        } else if (key == LibKeys.K_PAUSED) {
            _cfg.paused = (value != 0);
        }

        _params[key] = value;
        emit ParamUpdated(key, old, value);
    }

    //------------- External view -------------

    /// @inheritdoc IProtocolTemplate
    function admin() external view returns (address) {
        return _cfg.admin;
    }

    /// @inheritdoc IProtocolTemplate
    function getParam(bytes32 key) external view returns (uint256 value) {
        return _params[key];
    }

    /// @notice Get the current fee in basis points.
    function feeBps() external view returns (uint96) {
        return _cfg.feeBps;
    }

    /// @notice Return whether the contract is paused.
    function paused() external view returns (bool) {
        return _cfg.paused;
    }

    //------------- Public -------------

    /// @notice Example public function demonstrating the `whenNotPaused` guard.
    /// @dev Replace with real business logic (e.g., deposit/withdraw/swap).
    function exampleAction(uint256 amount) public whenNotPaused {
        // Implement domain-specific logic. This is a stub.
        // e.g., _takeFee(amount); _doSomething(amount);
        amount; // silence compiler warning for template
    }

    //------------- Internal -------------

    /// @notice Example internal helper to compute a fee.
    /// @param amount The gross amount.
    /// @return fee The computed fee based on current feeBps.
    function _computeFee(uint256 amount) internal view returns (uint256 fee) {
        unchecked {
            fee = (amount * _cfg.feeBps) / 10_000;
        }
    }

    //------------- Private -------------

    // Add private helpers as needed, placed after internal functions.
}
```

### Contract Template
```js
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;
/*###############################################################################

    @title Enter contract title
    @author BLOK Capital DAO
    @notice Enter contract utility

    ▗▄▄▖ ▗▖    ▗▄▖ ▗▖ ▗▖     ▗▄▄▖ ▗▄▖ ▗▄▄▖▗▄▄▄▖▗▄▄▄▖▗▄▖ ▗▖       ▗▄▄▄  ▗▄▖  ▗▄▖ 
    ▐▌ ▐▌▐▌   ▐▌ ▐▌▐▌▗▞▘    ▐▌   ▐▌ ▐▌▐▌ ▐▌ █    █ ▐▌ ▐▌▐▌       ▐▌  █▐▌ ▐▌▐▌ ▐▌
    ▐▛▀▚▖▐▌   ▐▌ ▐▌▐▛▚▖     ▐▌   ▐▛▀▜▌▐▛▀▘  █    █ ▐▛▀▜▌▐▌       ▐▌  █▐▛▀▜▌▐▌ ▐▌
    ▐▙▄▞▘▐▙▄▄▖▝▚▄▞▘▐▌ ▐▌    ▝▚▄▄▖▐▌ ▐▌▐▌  ▗▄█▄▖  █ ▐▌ ▐▌▐▙▄▄▖    ▐▙▄▄▀▐▌ ▐▌▝▚▄▞▘


################################################################################*/


/*//////////////////////////////////////////////////////////////
                            IMPORTS
//////////////////////////////////////////////////////////////*/

/*//////////////////////////////////////////////////////////////
                           CONTRACTS
//////////////////////////////////////////////////////////////*/

contract ProtocolTemplate {
    /*//////////////////////////////////////////////
                1) TYPE DECLARATIONS
    //////////////////////////////////////////////*/


    /*//////////////////////////////////////////////
                2) STATE VARIABLES
    //////////////////////////////////////////////*/

    /// constant
    /// public  
    /// private
    /// mapping
    
    /*//////////////////////////////////////////////
                    3) EVENTS
    //////////////////////////////////////////////*/


    /*//////////////////////////////////////////////
                    4) ERRORS
    //////////////////////////////////////////////*/


    /*//////////////////////////////////////////////
                    5) MODIFIERS
    //////////////////////////////////////////////*/


    /*//////////////////////////////////////////////
                    6) FUNCTIONS
    //////////////////////////////////////////////*/

    //------------- Constructor -------------

    //------------- Receive (if exists) -------------

    //------------- Fallback (if exists) -------------

    //------------- External -------------

    //------------- External view -------------

    //------------- Public -------------

    //------------- Internal -------------

    //------------- Private -------------

    // Add private helpers as needed, placed after internal functions.
}