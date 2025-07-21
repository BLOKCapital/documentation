# Nécessité du proxy Diamond

### Bref aperçu des contrats Proxy et Factory

1. **Contrats Proxy**
Un contrat proxy agit comme un intermédiaire qui délègue les appels à un contrat d'implémentation sous-jacent. Il permet de mettre à jour ou de modifier la logique d'un smart contract sans changer son adresse ni perturber son état.
   - Le contrat proxy détient le stockage (état) et une référence au contrat d'implémentation.
   - Lorsqu'un utilisateur interagit avec le proxy, il transfère l'appel au contrat d'implémentation via delegatecall, qui exécute la logique dans le contexte du stockage du proxy.
   - Pour mettre à jour, le proxy est pointé vers un nouveau contrat d'implémentation sans modifier son adresse.

2. **Contrats Factory**
Un contrat factory est un smart contract qui crée et déploie d'autres smart contracts, souvent appelés « contrats enfants ». Il sert de modèle pour générer plusieurs instances d'un contrat. Il automatise le déploiement de contrats standardisés et suit les contrats créés.
   - Le contrat factory contient la logique pour déployer de nouveaux contrats, généralement en utilisant l'opcode create ou create2 en Solidity.
   - Il peut stocker des références aux contrats déployés et fournir des méthodes pour interagir avec eux.
   - Les utilisateurs appellent la factory pour créer de nouvelles instances, en passant des paramètres si nécessaire (par exemple, des données de configuration).

### Besoin du proxy Diamond

![Texte alternatif](/img/diamondProxy2.png)

Bien que les proxies Beacon et UUPS offrent des mécanismes de mise à jour plus simples, ils présentent une limitation majeure : chaque mise à jour nécessite de remplacer l'intégralité du contrat d'implémentation. Cette approche manque de flexibilité, surtout lorsque le système doit évoluer et prendre en charge une extensibilité modulaire.

Par exemple, supposons qu'à l'avenir nous introduisions une nouvelle fonctionnalité telle que la transférabilité de compte—la capacité pour les utilisateurs de transférer leur compte à quelqu'un d'autre. Avec Beacon ou UUPS, cela impliquerait de mettre à jour tout le contrat d'implémentation, ce qui est plus risqué et peut introduire d'autres vulnérabilités dans le système.

Au contraire, le standard Diamond (EIP-2535) nous permet d'ajouter cette fonctionnalité de manière modulaire. Nous pouvons simplement développer une nouvelle facette (par exemple, AccountTransferFacet) et l'attacher au diamond existant sans affecter les autres parties du contrat. Cela améliore la granularité des mises à jour, minimise les risques et favorise une séparation claire des responsabilités.

Chaque proxy diamond a deux autres parties :
   - `diamondCut` — le mécanisme utilisé pour ajouter, remplacer ou supprimer des facettes.
   - `diamondLoupe` — utilisé pour interroger quelles fonctions existent sur quelles facettes.

Dans notre architecture, ces deux éléments (`diamondCut` et `diamondLoupe`) seront centralisés via la gouvernance DAO. La DAO suit toutes les facettes actives et gère les mises à jour de manière sécurisée et transparente.

Cette configuration nous donne un mécanisme de mise à jour contrôlé par la DAO. 