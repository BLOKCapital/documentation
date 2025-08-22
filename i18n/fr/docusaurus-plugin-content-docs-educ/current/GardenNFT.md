# Vue d’ensemble du marché NFT & Garden

### Principes fondamentaux du marché NFT & Garden : 
* Les NFTs seront toujours transférés via le **Marketplace BLOK Capital**. Ils resteront dans notre écosystème et ne le quitteront jamais.
* **Raison :** Les NFTs représentent la propriété des Jardins. Si un NFT quitte l’écosystème BLOK, la propriété de son Jardin correspondant est compromise, entraînant une perte définitive du Jardin de l’utilisateur.
* Le **commerce des Jardins** se fera exclusivement via le Marketplace BLOK Capital. Les Jardins resteront toujours dans notre écosystème.
* Les créateurs de collections NFT recevront des **redevances** sur chaque transaction de leurs NFTs.
* Différentes collections NFT débloqueront des fonctionnalités uniques pour les Jardins BLOK Capital, positionnant les Jardins à la fois comme **œuvres d’art numériques** et comme un **portefeuille crypto en croissance continue**.
* Les NFTs seront **mintés sur Arbitrum**, la chaîne où réside le DAO BLOK Capital (chaîne source).
* Un **registre de propriété des NFTs Jardins** sera maintenu sur toutes les autres chaînes où BLOK Capital opérera dans le futur.
* BLOK Capital intégrera **Chainlink CCIP** pour permettre la communication inter-chaînes, garantissant que les registres NFT sur les chaînes de destination soient mis à jour après chaque échange réussi de Jardin.
* Une **architecture inter-chaînes** appropriée sera développée pour assurer des mises à jour instantanées des registres. Sans cela, les Jardins sur les chaînes de destination pourraient être exposés à des risques lors des transferts.
* Lorsqu’un Jardin est listé sur le Marketplace par un vendeur, la **propriété sera temporairement transférée au contrat Marketplace**, empêchant tout accès utilisateur jusqu’à sa vente ou son retrait.
* Le **contrat Marketplace** sera possédé et gouverné par le DAO.
* Le contrat adoptera le **standard Beacon Proxy ou UUPS Proxy**, après examen.
* Le contrat Marketplace sera déployé mais restera **inactif jusqu’au lancement officiel** du protocole.
* Pour chaque échange réussi de Jardin, BLOK Capital prélèvera un **petit pourcentage en frais de plateforme**.

### Attacher des fonctionnalités aux Jardins via les Collections NFT

* Les fonctionnalités seront définies comme **variables locales** dans une **Features Facet**, qui contiendra des paramètres tels que : taux de réduction, frais de swap et frais de protocole, tous liés à la collection NFT correspondante.
* Les fonctionnalités seront **évolutives** et pourront être mises à jour dans le futur via un **vote communautaire**, conformément au principe d’évolution guidée par la gouvernance.
* Les collections NFT seront lancées sur **Arbitrum (chaîne source)**. Sur toutes les autres chaînes supportées, des registres suivront la propriété et les détenteurs des NFTs.