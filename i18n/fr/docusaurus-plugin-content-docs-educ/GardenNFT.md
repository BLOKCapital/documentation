# Vue d’ensemble du marché NFT & Garden

### Principes fondamentaux du marché NFT & Garden : 
- Les NFT doivent être transférés via la place de marché BLOK Capital ; ils doivent toujours rester dans notre écosystème et ne jamais en sortir. Pourquoi ? Les NFT représentent la propriété du Jardin et de son propriétaire ; si le NFT quitte l’écosystème BLOK, la propriété du jardin serait compromise, ce qui entraînerait une perte définitive du Jardin de l’utilisateur.
- Les échanges de jardins doivent être effectués via la place de marché BLOK Capital ; les jardins doivent toujours rester à l’intérieur de notre écosystème.
- Les créateurs de collections de NFT doivent recevoir des royalties sur les échanges de NFT.
- Différentes collections de NFT débloqueront un ensemble unique de fonctionnalités de BLOK Capital Gardens, qui considèrent les Jardins à la fois comme une œuvre d’art numérique et un portefeuille d’actifs crypto en constante évolution.
- Les NFT sont mintés sur Arbitrum, sur lequel la DAO BLOK Capital réside. C’est la chaîne source.
- Un registre de propriété des NFT Garden et de leurs propriétaires sera maintenu sur toutes les autres chaînes sur lesquelles BLOK Capital choisira d’opérer prochainement.
- Nous utiliserons Chainlink CCIP, ce qui nous permettra de communiquer entre chaînes et de mettre à jour les registres de NFT sur les chaînes de destination après une transaction réussie de Garden.
- Une architecture appropriée doit être développée pour permettre la messagerie inter-chaînes afin de mettre à jour instantanément le registre de NFT. Sinon, nous risquons de perdre les Gardens sur les chaînes de destination lors du transfert.
- Une fois qu’un Garden est listé sur la place de marché par le vendeur, sa propriété sera transférée au contrat de la Marketplace, empêchant tout accès au Garden tant qu’il n’est pas vendu à un acheteur ou retiré.
- Le contrat de la marketplace est détenu et gouverné par la DAO.
- Le contrat de la marketplace sera un proxy beacon ou un proxy UUPS, ce qui sera finalisé lors de discussions ultérieures.
- Actuellement, le contrat de la Marketplace sera déployé mais non opérationnel, jusqu’à son lancement complet.
- À chaque transaction réussie de Gardens, BLOK Capital prélèvera un petit pourcentage en tant que frais de plateforme.

### Attribuer des fonctionnalités aux jardins via des collections NFT : 
- Les fonctionnalités sont définies en tant que variables locales dans une facette Features. La facette Features contient toutes les valeurs telles que la remise, les frais d’échange, les frais de protocole, etc., correspondant à la collection NFT.
- Les fonctionnalités peuvent être mises à jour à l’avenir en fonction d’un vote de la communauté, ce qui cadre avec notre choix de conception de rendre les fonctionnalités vivantes dans une facette upgradable.
- Il existe un registre qui suit l’ID NFT, l’adresse du propriétaire et l’adresse du Garden afin d’assurer la bonne propriété des Gardens et des NFT.
- La collection NFT sera lancée sur notre chaîne source, Arbitrum, et les autres chaînes sur lesquelles BLOK Capital opérera contiendront un registre qui suit la propriété des NFT avec leurs utilisateurs/propriétaires respectifs.
