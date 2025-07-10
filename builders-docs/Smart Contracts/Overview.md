---
sidebar_position: 1   
---

# Overview 

## Gardens
Gardens are programmable crypto portfolios implemented as ERC-2535 Diamond contracts. Each Garden acts as a smart “hub” for a user’s investments, enabling upgradable DeFi strategies while abstracting away gas and transaction complexity. Investors control Gardens via an ERC-721 NFT (unique token), which represents ownership of the portfolio. The system leverages Account Abstraction (ERC-4337) concepts (bundlers and paymasters) to make investing seamless and gas-efficient. A DAO-managed Facet Registry ensures only approved modules (facets) can be added, enabling a secure, governance-curated upgrade path.

## Gardens as Diamond Portfolios
Each Garden is an instance of an ERC-2535 Diamond proxy. The Diamond Standard defines a proxy that delegates calls to multiple facet contracts. In essence, “a diamond is a contract with external functions that are supplied by contracts called facets”. This modular pattern means Gardens have virtually unlimited size and can be extended with new logic post-deployment. By default, every Garden includes the reference facets for upgrades, introspection, and ownership control. The DiamondCut and DiamondLoupe facets enable adding/replacing/removing functionality on the fly, and the Ownership facet manages admin rights. In the standard implementation, DiamondCutFacet, DiamondLoupeFacet, and OwnershipFacet are deployed for each Garden. Together they allow a Garden to evolve: developers can call diamondCut on the proxy to plug in new modules (e.g. a lending module or swap integration) without needing a full contract redeployment.

## DAO-Curated Facet Registry

To maintain security and decentralization, the protocol uses a DAO-governed Facet Registry. All candidate facets (upgrade modules) must be registered and vetted before use. In practice, a new facet contract must be registered by the DAO’s governance process. Only facets in this on-chain registry can be added to Gardens by diamondCut. Upgrading a facet’s implementation also requires DAO approval, so arbitrary code cannot be injected. Each facet undergoes a stringent verification by auditors before registry inclusion. This model balances flexibility with security: the DAO ensures only trusted, reviewed modules (e.g. audited DEX or lending facets) are available for Gardens.

## Default Facets (Cut, Loupe, Ownership)
Every Garden includes the core Diamond facets from the outset. The DiamondCutFacet provides the diamondCut interface used to add, replace, or remove function selectors in the Garden proxy. The DiamondLoupeFacet offers introspection: it lets anyone query which facets are present and what functions they implement. The OwnershipFacet manages the Garden’s owner/admin (initially the user who created it). These default facets enforce upgradability and access control. By design, each new Garden deploys its own instances of these facets, so the user has full control (through their NFT-owner account) over their portfolio’s modules.

## Composable DeFi Modules
Beyond the defaults, Gardens can “plug in” various DeFi modules as needed. For instance, a Lending facet could integrate a lending/borrowing protocol, and a DEX facet could enable token swaps via an AMM. These facets are simply other contracts implementing financial logic. Via diamondCut, a user (or an authorized contract) can add these facets to their Garden, composing custom investment strategies. Because facets are stateless and reusable, a single lending facet deployment can serve many Gardens, saving gas. This modularity means Gardens can adapt: new protocols can be integrated simply by registering their facet and cutting it into the Garden when needed.

## Garden Factory & NFT Ownership
New Gardens are created by the Garden Factory (itself a Diamond facet). When a user calls the factory, it deploys a fresh Garden proxy with the user as owner. The factory takes two key parameters: the user’s address (msg.sender) and a new token ID. It then mints a corresponding ERC-721 token for that ID, binding it to the Garden. This NFT is the deed of the Garden: owning the NFT means owning the portfolio contract. In practice, if a user sells or transfers their NFT, the Garden goes with it: the new token owner has full control. We rely on ERC-721’s transfer functions (transferFrom/safeTransferFrom) and ownerOf checks to manage this ownership logic. Thus, Gardens are fully transferable portfolios – an NFT marketplace could let users buy and sell entire DeFi strategies in one transaction.