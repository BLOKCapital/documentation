---
sidebar_position: 2   
---

# Jardins & Diamants

### L'architecture des Diamants & Jardins

Chez BLOK Capital, notre architecture principale pour les smart contracts repose sur le modèle de proxy Diamond. Dans cette section, nous explorerons l'architecture des diamants, une approche de déploiement basée sur une factory inspirée du dépôt Nick Mudge Diamond, et comment ces concepts créent un « jardin » alimentant l'architecture BLOK.

### Flux du contrat proxy :
![Texte alternatif](/img/diamondSchema2.png)

### Qu'est-ce que le Diamond Standard ?

Le Diamond Standard, proposé par Nick Mudge dans l'EIP-2535, aide à résoudre le problème de la création de contrats modulaires et évolutifs sans atteindre les limites de gaz ou de taille. Les contrats traditionnels sont monolithiques, avec toute la logique dans une seule adresse, rendant les mises à jour difficiles et risquées. Les diamants, en revanche, sont comme des jardins : ils consistent en un seul **contrat Diamond** (par exemple, le sol) qui délègue des fonctionnalités à plusieurs **facettes** (par exemple, les plantes), chacune contenant une logique spécifique.

Un diamond est un contrat proxy qui utilise une architecture unique pour :

- **Modulariser la logique** : Diviser les fonctionnalités en facettes plus petites et réutilisables.
- **Permettre les mises à jour** : Ajouter, remplacer ou supprimer des facettes sans redéployer tout le contrat.
- **Contourner les limites de taille** : Stocker uniquement les sélecteurs de fonctions dans le diamond, déléguant l'exécution aux facettes.

Cette modularité rend les diamonds idéaux pour les applications décentralisées complexes (dApps) qui doivent évoluer au fil du temps, comme un jardin qui peut être replanté ou agrandi.

### L'architecture d'un Diamond

Imaginez le diamond comme un hub central (le contrat `Diamond.sol`) qui achemine les appels de fonctions vers des facettes spécialisées. Chaque facette est un contrat séparé contenant une partie des fonctionnalités du système, comme la propriété, les transferts de tokens ou la gouvernance. Le diamond maintient une correspondance des **sélecteurs de fonctions** (identifiants uniques pour les fonctions) vers les adresses des facettes, lui permettant de déléguer efficacement les appels.
![Texte alternatif](/img/delegation.png)

#### Composants clés de l'architecture Diamond

1. **Contrat Diamond** (`Diamond.sol`) :
    - Sert de point d'entrée pour toutes les interactions.
    - Stocke une correspondance des sélecteurs de fonctions vers les adresses des facettes.
    - Implémente la fonction `fallback` pour router les appels vers la bonne facette.
    - Utilise la fonction `diamondCut` pour ajouter, remplacer ou supprimer des facettes, permettant ainsi les mises à jour.
2. **Facettes** :
    - Contrats indépendants (par exemple, `DiamondCutFacet.sol`, `DiamondLoupeFacet.sol`) contenant des fonctions spécifiques.
    - Par exemple, `DiamondCutFacet` gère les mises à jour, tandis que `DiamondLoupeFacet` fournit l'introspection (interrogation des adresses et sélecteurs de facettes).
3. **Interfaces** :
    - Interfaces standard comme `IDiamondCut` et `IDiamondLoupe` pour assurer la cohérence.
    - Les facettes implémentent ces interfaces pour fournir des fonctionnalités spécifiques.
4. **Sélecteurs de fonctions** :
    - Un hash de 4 octets (par exemple, `keccak256("functionName()")`) qui identifie une fonction.
    - Le diamond associe les sélecteurs aux adresses des facettes, garantissant que chaque appel est traité par le bon contrat.

![Texte alternatif](/img/diamondFacet2.png)

Voici un exemple simplifié de la fonction fallback de `Diamond.sol`, qui délègue les appels aux facettes :

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Diamond {
    mapping(bytes4 => address) public facets;

    fallback() external payable {
        address facet = facets[msg.sig];
        require(facet != address(0), "Function does not exist");
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())
            let result := delegatecall(gas(), facet, ptr, calldatasize(), 0, 0)
            let size := returndatasize()
            returndatacopy(ptr, 0, size)
            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }
}
```

Ce code montre comment le diamond achemine les appels entrants (`msg.sig`) vers la facette appropriée, permettant la modularité.

### Le Jardin : Systèmes modulaires et évolutifs

Pourquoi appeler cela un « jardin » ? Dans un jardin, chaque plante (facette) a un rôle : certaines apportent la structure (comme `DiamondCutFacet`), d'autres la beauté (comme `DiamondLoupeFacet`), et d'autres encore portent des fruits (comme des facettes personnalisées pour la logique de votre dApp). Le Diamond Standard vous permet de cultiver un jardin de smart contracts qui :

- **Évolue dans le temps** : Ajoutez de nouvelles facettes selon l'évolution des besoins.
- **Taillez et replantez** : Remplacez ou supprimez les facettes obsolètes sans perturber le jardin.
- **Échelle efficacement** : Gardez le contrat principal léger en déléguant la logique aux facettes.

Cette modularité est particulièrement puissante pour les dApps comme les DAO, protocoles DeFi ou plateformes NFT, où de nouvelles fonctionnalités (gouvernance, staking, etc.) peuvent être ajoutées sans redéployer tout le système.

### Déploiement basé sur une factory avec `DiamondFactory.sol`

Déployer des diamonds manuellement peut être complexe, surtout pour des systèmes nécessitant plusieurs instances (par exemple, un marketplace avec de nombreux diamonds spécifiques à chaque utilisateur). Le dépôt `diamond-foundry` introduit `DiamondFactory.sol`, un contrat factory qui automatise le déploiement des diamonds et l'initialisation des facettes, agissant comme un jardinier plantant de nouveaux parterres.

#### Fonctionnement de `DiamondFactory.sol`

La factory déploie un nouveau contrat `Diamond` et l'initialise avec les facettes spécifiées. Voici une version simplifiée de `DiamondFactory.sol` :
```js
// SPDX-License-License: MIT
pragma solidity ^0.8.0;

import {IDiamondCut} from "../interfaces/IDiamondCut.sol";
import {Diamond} from "../Diamond.sol";

contract DiamondFactory {
    event DiamondDeployed(address diamond, address owner);

    function deployDiamond(
        address _owner,
        address[] memory _facets,
        bytes[] memory _initData
    ) external returns (address diamond) {
        diamond = address(new Diamond(_owner, address(this)));
        IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](_facets.length);
        for (uint256 i = 0; i < _facets.length; i++) {
            cuts[i] = IDiamondCut.FacetCut({
                facetAddress: _facets[i],
                action: IDiamondCut.FacetCutAction.Add,
                functionSelectors: getSelectors(_facets[i])
            });
        }
        IDiamondCut(diamond).diamondCut(cuts, address(0), "");
        emit DiamondDeployed(diamond, _owner);
        return diamond;
    }

    function getSelectors(address facet) internal pure returns (bytes4[] memory selectors) {
        // Simplifié : Sélecteurs codés en dur pour les facettes connues
        selectors = new bytes4[](4);
        selectors[0] = bytes4(keccak256("facets()"));
        selectors[1] = bytes4(keccak256("facetFunctionSelectors(address)"));
        selectors[2] = bytes4(keccak256("facetAddresses()"));
        selectors[3] = bytes4(keccak256("facetAddress(bytes4)"));
        return selectors;
    }
}
```

La factory :

1. Déploie un nouveau contrat `Diamond` avec le propriétaire spécifié.
2. Crée un tableau `FacetCut` pour enregistrer les facettes (par exemple, `DiamondCutFacet`, `DiamondLoupeFacet`).
3. Appelle `diamondCut` pour initialiser le diamond avec les facettes.
4. Émet un événement pour suivre les déploiements.

Ce modèle factory permet un déploiement évolutif, vous permettant de planter plusieurs diamonds dans votre jardin avec un minimum d'effort.

#### Exemple de déploiement

Voici comment vous pourriez déployer un diamond avec un script Foundry :
```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {DiamondFactory} from "../src/factory/DiamondFactory.sol";
import {DiamondCutFacet} from "../src/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "../src/facets/DiamondLoupeFacet.sol";

contract DeployDiamond is Script {
    function run() external {
        vm.startBroadcast();
        DiamondCutFacet cutFacet = new DiamondCutFacet();
        DiamondLoupeFacet loupeFacet = new DiamondLoupeFacet();
        DiamondFactory factory = new DiamondFactory();
        address[] memory facets = new address[](2);
        facets[0] = address(cutFacet);
        facets[1] = address(loupeFacet);
        bytes[] memory initData = new bytes[](2);
        initData[0] = "";
        initData[1] = "";
        address diamond = factory.deployDiamond(msg.sender, facets, initData);
        console.log("Diamond deployed at:", diamond);
        vm.stopBroadcast();
    }
}
```
Exécutez ce script avec :
```shell
forge script script/DeployDiamond.s.sol --fork-url http://localhost:8545 --broadcast
```

### Tester le Jardin

Pour garantir la robustesse de votre jardin diamond, vous avez besoin de tests solides. Les tests basés sur Solidity de Foundry rendent cela simple. Voici une suite de tests vérifiant le déploiement de la factory et la fonctionnalité du diamond :
```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {DiamondFactory} from "../src/factory/DiamondFactory.sol";
import {DiamondCutFacet} from "../src/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "../src/facets/DiamondLoupeFacet.sol";
import {IDiamondLoupe} from "../src/interfaces/IDiamondLoupe.sol";

contract DiamondFactoryTest is Test {
    DiamondFactory factory;
    DiamondCutFacet cutFacet;
    DiamondLoupeFacet loupeFacet;
    address diamond;

    function setUp() public {
        cutFacet = new DiamondCutFacet();
        loupeFacet = new DiamondLoupeFacet();
        factory = new DiamondFactory();
        address[] memory facets = new address[](2);
        facets[0] = address(cutFacet);
        facets[1] = address(loupeFacet);
        bytes[] memory initData = new bytes[](2);
        initData[0] = "";
        initData[1] = "";
        diamond = factory.deployDiamond(address(this), facets, initData);
    }

    function testDiamondDeployment() public {
        assertTrue(diamond != address(0), "Diamond not deployed");
    }

    function testLoupeFunctions() public {
        IDiamondLoupe loupe = IDiamondLoupe(diamond);
        address[] memory facets = loupe.facetAddresses();
        assertEq(facets.length, 2, "Incorrect number of facets");
        assertEq(facets[0], address(cutFacet), "DiamondCutFacet not registered");
        assertEq(facets[1], address(loupeFacet), "DiamondLoupeFacet not registered");
    }
}
```
Lancez les tests avec :
```shell
forge test
```

### Avantages du Jardin Diamond

Le Diamond Standard, associé à un déploiement basé sur une factory, offre :

- **Modularité** : Ajoutez de nouvelles fonctionnalités (facettes) sans redéployer le contrat principal.
- **Scalabilité** : Déployez plusieurs diamonds pour différents utilisateurs ou cas d'usage.
- **Évolutivité** : Mettez à jour les fonctionnalités sans casser les contrats existants.
- **Efficacité en gaz** : Gardez le contrat diamond léger en déléguant la logique aux facettes.

### Conclusion

Le Diamond Standard est un outil puissant pour construire des systèmes de smart contracts modulaires et évolutifs, semblable à la culture d'un jardin où chaque plante (facette) contribue à un écosystème florissant. En utilisant `DiamondFactory.sol`, vous pouvez automatiser le déploiement des diamonds, facilitant l'extension de votre jardin à de multiples instances. Que vous construisiez un protocole DeFi, une DAO ou une marketplace NFT, le Diamond Standard offre la flexibilité nécessaire pour évoluer et s'adapter.

Pour plus de détails, consultez le dépôt [forgenie diamond-foundry](https://github.com/forgenie/diamond-foundry) et [EIP-2535](https://eips.ethereum.org/EIPS/eip-2535).

Bon jardinage ! 