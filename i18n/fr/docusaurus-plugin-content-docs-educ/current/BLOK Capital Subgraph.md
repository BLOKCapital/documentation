# Nécessité des sous-graphes

Chez BLOK Capital, la transparence et l'absence de confiance dans le protocole ne sont pas optionnelles—elles sont fondamentales. C'est pourquoi nous nous appuyons sur le **framework Subgraph de The Graph Protocol** pour indexer et interroger directement les données on-chain, plutôt que de dépendre de services de données off-chain centralisés ou semi-centralisés.

### Qu'est-ce qu'un sous-graphe ?

Un **sous-graphe** est une spécification déclarative de la façon d'ingérer, de transformer et de servir les données de la blockchain dans un format structuré et interrogeable. Il fait partie de **The Graph Protocol**, un protocole d'indexation décentralisé conçu pour les données blockchain.

Voici comment fonctionnent les sous-graphes en coulisses :

1. **Définition du manifeste** : Les développeurs écrivent un manifeste `subgraph.yaml` qui définit :

   * Quels smart contracts surveiller
   * Quels événements ou appels de fonction indexer
   * Comment mapper les données on-chain en entités structurées (similaires à des tables de base de données)

2. **Logique de mapping** : Des mappings personnalisés (en AssemblyScript) transforment les événements bruts ou les lectures de stockage en enregistrements structurés et significatifs—par exemple, propositions DAO, votes, échanges de tokens, etc.

3. **Indexation et interrogation** : Le Graph Node synchronise en continu les événements on-chain selon le manifeste et stocke les données traitées dans une base de données interrogeable. Les clients récupèrent ensuite les données via une **API GraphQL**, qui est efficace, typée et très performante.

Dans le contexte de BLOK Capital, cela permet à nos clients frontend, tableaux de bord analytiques et outils DAO de récupérer des **données en direct et sans confiance** directement depuis l'état on-chain de notre protocole—sans dépendre d'aucun middleware mutable ou opaque.

> **Consultez notre endpoint subgraph** : [blokc-dao-token-voting](https://thegraph.com/explorer/subgraphs/kbrg2GxMGs8DrQcLUtVbn8becrzYjwhxsY1EaLF5pFq?view=Query&chain=arbitrum-one)

---

### Pourquoi utilisons-nous les sous-graphes plutôt que des fournisseurs de données off-chain ?

Utiliser les sous-graphes n'est pas qu'une question de commodité—c'est un choix stratégique de conception de protocole. Voici pourquoi nous optons pour les sous-graphes plutôt que les fournisseurs off-chain traditionnels :

| Fonctionnalité                | Sous-graphes (The Graph Protocol)                           | Fournisseurs off-chain (ex : Firebase, APIs, Indexers) |
| ----------------------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| **Modèle de confiance**       | Décentralisé, vérifiable, issu directement de l'on-chain    | Centralisé, opaque, basé sur la confiance              |
| **Actualité des données**     | Synchronisation quasi temps réel avec les événements chain  | Dépend du polling ou des mises à jour push             |
| **Personnalisation**          | Schéma d'entités et mapping d'événements totalement libres  | Limité à des endpoints prédéfinis ou du code backend   |
| **Langage de requête**        | GraphQL (puissant, typé, composable)                        | REST ou APIs propriétaires, souvent moins flexibles    |
| **Cohérence avec le protocole**| Issu directement de l'état canonique du contrat            | Peut souffrir d'incohérences ou d'artefacts de cache   |
| **Modularité**                | Facile à faire évoluer avec les upgrades et la gouvernance  | Nécessite des refontes backend fréquentes              |

En adoptant les sous-graphes, BLOK Capital garantit que :

* **Les données de gouvernance sont vérifiables et infalsifiables**, extraites directement des contrats DAO Aragon.
* Notre architecture évolue **horizontalement sur plusieurs chaînes et modules**, car les sous-graphes sont portables et standardisés.
* Nous restons **alignés avec l'éthique de la décentralisation**, en réduisant la dépendance à la logique backend tierce ou aux APIs fermées.

---

### Cas d'usage : Indexation des propositions DAO via le sous-graphe Aragon

Nous utilisons les sous-graphes publics d'Aragon pour indexer les composants clés de la DAO :

* Métadonnées des propositions (titres, descriptions, auteurs)
* Cycle de vie du vote (ouvert, actif, clos, exécuté)
* Pouvoir de vote par adresse et historique de participation
* Résultats d'exécution (succès, échec, etc.)

Ces données alimentent nos tableaux de bord de gouvernance internes, interfaces communautaires et systèmes d'alerte automatisés—le tout de manière **totalement transparente et reproductible**. 