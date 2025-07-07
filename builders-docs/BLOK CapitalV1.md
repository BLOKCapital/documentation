---
sidebar_position: 2   
---

# Blok Capital V1 Architecture

![Alt text](/img/ar.png)

## The core parts of our architecture is as follows :

### Wallet Infrastructure
Onboarding new users is hindered by the complexity and risk of seed-phrase management. By integrating Web3Auth’s MPC solution, we eliminate seed phrases while preserving EOA security and offer advanced users the option to connect their own keys. Future upgrades will track Ethereum’s EIP-3074 and ERC-4337 account-abstraction standards—phasing out our MPC layer once native support matures. This hybrid approach delivers familiar Web2-style signup and wallet experiences, ensures secure key custody without single-point-of-failure, and paves the way for broader decentralized adoption.

### Protocol Infrastructure

- Gardens : Smart contract acting as portfolio for the users. Gardens are deployed by the GardenFactory contract. A single user can own multiple Gardens.
- Gardeners : Wealth managers who will be able to manage Gardens i.e. portfolio of users.
- Garden Administration contracts : These contracts are responsible for maintaining proper admin checks and allow the Garden to access to power of DeFi protocol securely as voted on by the community.
- Protocol registries : These registries are administered by the community through DAO votes and checks and balances used by the Garden Administration contracts to ensure that only community verified actions on DeFi protocols can be carried out.
- DeFi integration contracts : Implementation contracts for different DeFi protocol integrations such as DEXs, Lending protocols, Staking etc.

### BLOK Capital Subgraphs
We leverage The Graph protocol’s subgraphs to query on-chain events, eliminating the need for centralized off-chain data services. These subgraphs power our gov-
ernance interface by indexing key events such as proposals and votes, and are also used in our registry contracts. By indexing on-chain activity, subgraphs ensure that all protocol interactions are transparent, verifiable, and easily accessible by the community. This approach is critical to maintaining trust and visibility into protocol operations and governance decisions.

### DAO architecture with Aragon
We leverage the Aragon protocol to build and manage our DAO, benefiting from its highly customizable and modular governance infrastructure. Aragon provides the flexibility needed to tailor the DAO to our protocol’s specific requirements. The DAO governs key decisions and operations, ensuring that protocol development and
resource allocation are driven by the community in a transparent, decentralized manner. This structure promotes accountability, resilience, and long-term sustain-
ability.

### DeFi Protocol Integrations
Integrating different DeFi protocols would allow users to utilize their features without having to leave the BLOK Capital interface. The list of integrations would grow as the community grows with time.
- Lending Protocols: Users can deposit crypto assets into integrated lending protocols like AAVE to earn interest and grow their portfolio—all within a unified interface.
8
- DEXs (Decentralized Exchanges): Users can swap or purchase tokens of their choice through integrated platforms like Uniswap, ensuring flexibility and ease of asset management.