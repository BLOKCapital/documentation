# Understanding Subgraphs in BLOK Capital’s Data Architecture

At BLOK Capital, protocol transparency and trustlessness are not optional — they are foundational. That’s why we rely on **The Graph Protocol’s Subgraph framework** to index and query onchain data directly, rather than depending on centralized or semi-centralized offchain data services.

### What Are Subgraphs?

A **subgraph** is a declarative specification of how to ingest, transform, and serve blockchain data in a structured, queryable format. It is part of **The Graph Protocol**, a decentralized indexing protocol designed for blockchain data.

Here’s how subgraphs work under the hood:

1. **Manifest Definition**: Developers write a `subgraph.yaml` manifest that defines:

   * Which smart contracts to watch
   * Which events or function calls to index
   * How to map onchain data into structured entities (similar to database tables)

2. **Mapping Logic**: Custom mappings (in AssemblyScript) transform raw events or storage reads into meaningful, structured records — for example, DAO proposals, votes, token swaps, etc.

3. **Indexing and Querying**: The Graph Node continuously syncs onchain events according to the manifest and stores the processed data in a queryable database. Clients then fetch the data via a **GraphQL API**, which is efficient, typed, and highly performant.

In the context of BLOK Capital, this enables our frontend clients, analytics dashboards, and DAO tooling to pull **live, trustless data** directly from our onchain protocol state — without relying on any mutable or opaque middleware.


> **Checkout our subgraph endpoint** : [blokc-dao-token-voting](https://thegraph.com/explorer/subgraphs/kbrg2GxMGs8DrQcLUtVbn8becrzYjwhxsY1EaLF5pFq?view=Query&chain=arbitrum-one)

---

### Why We Use Subgraphs Over Offchain Data Providers

Using subgraphs is not just a matter of convenience — it’s a strategic protocol design choice. Below are the reasons we opt for subgraphs over traditional offchain providers:

| Feature                       | Subgraphs (The Graph Protocol)                               | Offchain Providers (e.g., Firebase, APIs, Indexers)    |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| **Trust Model**               | Decentralized, verifiable, derived directly from onchain     | Centralized, opaque, trust-based                       |
| **Data Freshness**            | Near real-time syncing with blockchain events                | Depends on polling or push updates                     |
| **Customizability**           | Fully customizable entity schema and event mappings          | Limited to predefined endpoints or ad-hoc backend code |
| **Query Language**            | GraphQL (powerful, typed, composable)                        | REST or proprietary APIs, often less flexible          |
| **Consistency with Protocol** | Derived directly from canonical contract state               | May suffer from inconsistencies or caching artifacts   |
| **Modularity**                | Easy to evolve with protocol upgrades and governance changes | Requires constant refactoring or backend rebuilds      |

By adopting subgraphs, BLOK Capital ensures that:

* **Governance data is verifiably accurate** and tamper-proof, pulled directly from Aragon DAO contracts.
* Our architecture scales **horizontally across chains and modules**, since subgraphs are portable and standardized.
* We maintain **alignment with the ethos of decentralization**, reducing reliance on third-party backend logic or closed APIs.


---

### Use Case: DAO Proposal Indexing via Aragon Subgraph

We utilize Aragon’s publicly hosted subgraphs to index key DAO components:

* Proposal metadata (titles, descriptions, proposers)
* Voting lifecycle (open, active, closed, executed)
* Per-address voting power and participation history
* Execution results (successful, failed, etc.)

This data powers our internal governance dashboards, community interfaces, and automated alerting systems — all in a **fully transparent and reproducible way**.

