# BLOK Capital Smart contract style guide

### BLOK Capital copyright 
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

### Natspec and commenting guide
- Refer to the following repo for natspec and commenting examples : [link](https://github.com/CollarNetworks/protocol-core/blob/develop/src/ChainlinkOracle.sol)

### Framework 
- BLOK Capital uses Foundry Framework for development of smart contracts. Follow the official Foundry guide for more : [link](https://getfoundry.sh/introduction/getting-started)
