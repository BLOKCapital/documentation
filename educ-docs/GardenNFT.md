# NFT & Garden Marketplace overview

### Core principles of NFT & Garden Marketplace : 
- NFTs must be transferred via the BLOK Capital marketplace, it should always stay in our ecosystem and must never leave. Why? NFTs are a representation of ownership of the Garden with its respective owner, if NFT leaves BLOK ecosystem, the ownership of the garden will be at stake and it would render permanent loss of the user's Garden.
- Trade of gardens must be performed via the BLOK Capital marketplace, gardens must always stay inside our ecosystem
- Creators of NFT collection must get royalty on trade of NFT
- Different NFT collections would unlock a unique set of features of BLOK Capital Gardens which considers the Gardens as both a piece of digital art and ever growing crypto asset portfolio.
- NFTs are minted on Arbitrum, on which the BLOK Capital DAO resides. It’s the source chain. 
- A registry of ownership of Garden NFTs and its owners will be maintained across every other chain on which BLOK Capital chooses to operate in the near future.
- We will be using Chainlink CCIP which would allow us to communicate cross-chain and update the NFT registries on the destination chains upon successful trade of Gardens.
- Appropriate architecture must be developed which allows the cross-chain messaging to update the NFT registry instantaneously. Otherwise we are at stake of losing the Gardens on destination chains during the transfer.
- Once Garden is listed on the marketplace by the seller, its ownership will be transferred to the Marketplace contract. Preventing any access to the Garden until it’s sold to a buyer or it’s delisted.
- The marketplace contract is owned and governed by the DAO.
- The marketplace contract will be a beacon proxy or UUPS proxy standard, which would be finalized upon further discussion.
- Currently the Marketplace contract will be deployed but not operational, until it’s fully launched. 
- Upon every successful trade of Gardens BLOK Capital will take a small % as platform fees.

### Attaching features to gardens via NFT collections : 
- The features are set as local variables in a Features facet. The Features facet is responsible for containing all the values such as discount, swap fees, protocol fees, etc, corresponding to the NFT collection.
- The features can be updated in the future depending on a community voting, which aligns with our design choice of making the features live in a facet which is upgradable.
- There exists a registry, which maintains track of NFT ID, owner’s address and Garden address to ensure proper ownership of Gardens and NFTs. 
- The NFT collection would be launched on our source chain Arbitrum, and the other chains on which BLOK Capital will be operating will contain a registry that keeps track of the ownership of NFTs with their respective user/owner.

