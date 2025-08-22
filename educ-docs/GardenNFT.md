# NFT Marketplace and Collection architecture overview

### Core Principles of the NFT & Garden Marketplace

* **NFTs will always be transferred via the BLOK Capital Marketplace**. They will remain within our ecosystem and will never leave.

  * **Reason:** NFTs represent ownership of Gardens. If an NFT leaves the BLOK ecosystem, the ownership of its corresponding Garden is compromised, resulting in the **permanent loss of the user’s Garden**.

* **Trading of Gardens will exclusively occur through the BLOK Capital Marketplace.** Gardens will remain within our ecosystem at all times.

* **Creators of NFT collections will receive royalties** on every trade of their NFTs.

* **Different NFT collections will unlock unique features** for BLOK Capital Gardens, positioning Gardens as both **digital art** and an **ever-growing crypto asset portfolio**.

* **NFTs will be minted on Arbitrum**, the chain where the BLOK Capital DAO resides. This serves as the **source chain**.

* A **registry of Garden NFT ownership** will be maintained across all other chains where BLOK Capital operates in the future.

* BLOK Capital will integrate **Chainlink CCIP** to enable **cross-chain communication**, ensuring NFT registries on destination chains are updated following each successful Garden trade.

* An **appropriate cross-chain architecture** will be developed to ensure **instantaneous registry updates**. Without this, Gardens on destination chains may be at risk during transfers.

* When a **Garden is listed on the Marketplace by a seller**, ownership will temporarily be transferred to the **Marketplace contract**, preventing any user access until it is either **sold to a buyer** or **delisted**.

* The **Marketplace contract** will be **owned and governed by the DAO**.

* The Marketplace contract will adopt either the **Beacon Proxy** or **UUPS Proxy** standard, which will be finalized upon further review.

* The **Marketplace contract will be deployed but remain inactive** until the protocol formally launches.

* For every **successful Garden trade**, BLOK Capital will charge a **small percentage as platform fees**.

---

### Attaching Features to Gardens via NFT Collections

* **Features will be defined as local variables** within a **Features Facet**. This facet contains parameters such as **discount rates, swap fees, and protocol fees**, all mapped to the corresponding NFT collection.

* **Features will be upgradable** and can be updated in the future through **community voting**, aligning with BLOK Capital’s principle of **governance-driven evolution**.

* **NFT collections will be launched on Arbitrum (source chain).** On all other supported chains, **registries will track NFT ownership** and their respective holders.

---


