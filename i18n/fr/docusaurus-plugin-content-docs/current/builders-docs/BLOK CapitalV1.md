---
sidebar_position: 2   
---

# Architecture du Protocole V1

![Texte alternatif](/img/architect.png)

## Les éléments principaux de notre architecture sont les suivants :

### Infrastructure de Portefeuille
L'intégration de nouveaux utilisateurs est freinée par la complexité et le risque de gestion des phrases de récupération. En intégrant la solution MPC de Web3Auth, nous éliminons les phrases de récupération tout en préservant la sécurité EOA et offrons aux utilisateurs avancés la possibilité de connecter leurs propres clés. Les futures mises à jour suivront les standards d'abstraction de compte d'Ethereum EIP-3074 et ERC-4337—remplaçant notre couche MPC une fois le support natif mature. Cette approche hybride offre une expérience d'inscription et de portefeuille familière de type Web2, assure une garde sécurisée des clés sans point de défaillance unique, et ouvre la voie à une adoption décentralisée plus large.

### Infrastructure du Protocole

- Jardins : Contrat intelligent agissant comme portefeuille pour les utilisateurs. Les Jardins sont déployés par le contrat GardenFactory. Un utilisateur peut posséder plusieurs Jardins.
- Jardiniers : Gestionnaires de patrimoine pouvant gérer les Jardins, c'est-à-dire le portefeuille des utilisateurs.
- Contrats d'administration des Jardins : Ces contrats sont responsables du maintien des contrôles d'administration appropriés et permettent au Jardin d'accéder de manière sécurisée à la puissance du protocole DeFi, tel que voté par la communauté.
- Registres de protocole : Ces registres sont administrés par la communauté via des votes DAO et des contrôles utilisés par les contrats d'administration des Jardins pour garantir que seules les actions vérifiées par la communauté sur les protocoles DeFi peuvent être effectuées.
- Contrats d'intégration DeFi : Contrats d'implémentation pour différentes intégrations de protocoles DeFi tels que DEX, protocoles de prêt, staking, etc.

### Sous-graphes BLOK Capital
Nous utilisons les sous-graphes du protocole The Graph pour interroger les événements on-chain, éliminant ainsi le besoin de services de données off-chain centralisés. Ces sous-graphes alimentent notre interface de gouvernance en indexant les événements clés tels que les propositions et les votes, et sont également utilisés dans nos contrats de registre. En indexant l'activité on-chain, les sous-graphes garantissent que toutes les interactions avec le protocole sont transparentes, vérifiables et facilement accessibles par la communauté. Cette approche est essentielle pour maintenir la confiance et la visibilité sur les opérations et décisions de gouvernance du protocole.

### Architecture DAO avec Aragon
Nous utilisons le protocole Aragon pour construire et gérer notre DAO, bénéficiant de son infrastructure de gouvernance hautement personnalisable et modulaire. Aragon offre la flexibilité nécessaire pour adapter la DAO aux besoins spécifiques de notre protocole. La DAO gouverne les décisions et opérations clés, garantissant que le développement du protocole et l'allocation des ressources sont dirigés par la communauté de manière transparente et décentralisée. Cette structure favorise la responsabilité, la résilience et la durabilité à long terme.

### Intégrations de Protocoles DeFi
L'intégration de différents protocoles DeFi permettrait aux utilisateurs de profiter de leurs fonctionnalités sans quitter l'interface BLOK Capital. La liste des intégrations s'élargira à mesure que la communauté grandira.
- Protocoles de prêt : Les utilisateurs peuvent déposer des actifs cryptographiques dans des protocoles de prêt intégrés comme AAVE pour gagner des intérêts et faire croître leur portefeuille—le tout dans une interface unifiée.
- DEX (Échanges Décentralisés) : Les utilisateurs peuvent échanger ou acheter les jetons de leur choix via des plateformes intégrées comme Uniswap, assurant flexibilité et facilité de gestion des actifs. 