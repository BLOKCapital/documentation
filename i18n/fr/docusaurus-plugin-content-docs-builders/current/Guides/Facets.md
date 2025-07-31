
# Guide : Création d’un Nouveau Facet Diamond

### Vue d’ensemble
Ce projet utilise le pattern “Diamond” (EIP-2535) pour composer des contrats modulaires. Un Diamond est un proxy qui délègue des appels à plusieurs Facets, chacun contenant une logique spécifique. Par exemple : « Un Facet peut être comparé à un contrat d’implémentation… [il] contient la logique des fonctions externes que le proxy (Diamond) va appeler ». 

Les Facets permettent de séparer les fonctionnalités en contrats indépendants pouvant être mis à jour séparément. Chaque Facet a son propre état isolé (grâce au pattern Diamond Storage) pour éviter les conflits de stockage.

Ce guide décrit nos conventions pour ajouter un nouveau Facet, incluant la structure des dossiers, l’organisation du contrat et les tests associés.

---

### Structure des Dossiers
Chaque nouveau Facet possède son propre sous-dossier dans `src/facets/`, contenant cinq fichiers Solidity, ainsi que des tests correspondants dans `test/facets/`.

Par exemple, un Facet `Transfer` utilisera :
- `src/facets/transfer/TransferFacet.sol` – le contrat Facet public.
- `src/facets/transfer/TransferBase.sol` – un contrat abstrait avec la logique interne.
- `src/facets/transfer/TransferStorage.sol` – une bibliothèque (ou contrat) définissant le layout de stockage.
- `src/facets/transfer/ITransfer.sol` – l’interface pour les fonctions externes.
- `src/facets/transfer/ITransferBase.sol` – l’interface pour les types internes (erreurs, structures, événements).

Les tests reflètent cette structure dans `test/facets/transfer/`. Créez :

- `test/facets/transfer/transfer.sol` – un contrat de test abstrait (`TransferFacetTest`) qui initialise le Diamond avec ce Facet, et un helper (`TransferFacetHelper`) qui fournit l’adresse du Facet, ses sélecteurs, etc.
- Un sous-dossier `behavior/` pour les tests unitaires (un contrat Solidity par méthode, nommé `<Facet>_<method>.t.sol`).

Cette convention de nommage assure la clarté et permet d’isoler les tests avec l’option `--match-contract` de Foundry.

---

### Organisation du Contrat Facet

#### `<FacetName>Storage.sol`
Implémente le Diamond Storage pattern. Déclare une constante `bytes32 STORAGE_SLOT`, une structure `Layout` avec les variables de stockage, et une fonction `layout()` pour y accéder via l’assembly :

```solidity
library TransferStorage {
    bytes32 internal constant STORAGE_SLOT = keccak256("blokc.transfer.storage");

    struct Layout {
        uint256 lastTransferBlock;
    }

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
````

#### `<FacetName>Base.sol`

Un contrat abstrait définissant la logique interne. Il importe la bibliothèque de stockage et les interfaces requises. Les fonctions internes utilisent `TransferStorage.layout()` pour lire/écrire le stockage. Exemple :

```solidity
abstract contract TransferBase is ITransferBase {
    using SafeERC20 for IERC20;

    function _transferEth(address payable to, uint256 amount) internal {
        if (amount > address(this).balance) revert Transfer_Failed();
        (bool success,) = to.call{ value: amount }("");
        if (!success) revert Transfer_Failed();
        TransferStorage.layout().lastTransferBlock = block.timestamp;
        emit ETHTransferExecuted(msg.sender, to, amount);
    }

    function _erc20Transfer(address token, address to, uint256 amount) internal {
        IERC20(token).safeTransfer(to, amount);
        TransferStorage.layout().lastTransferBlock = block.timestamp;
        emit ERC20TransferExecuted(token, msg.sender, to, amount);
    }

    function _erc20TransferFrom(address token, address from, address to, uint256 amount) internal {
        IERC20(token).safeTransferFrom(from, to, amount);
        TransferStorage.layout().lastTransferBlock = block.timestamp;
        emit ERC20TransferExecuted(token, from, to, amount);
    }
}
```

#### `<FacetName>Facet.sol`

Le contrat Facet public. Il hérite de `Base`, de l’interface externe, et d’un marqueur Facet générique. Il expose les fonctions accessibles depuis l’extérieur et applique les contrôles d’accès. Exemple :

```solidity
contract TransferFacet is ITransfer, TransferBase {
    function transferEth(address payable to, uint256 amount) external override {
        _transferEth(to, amount);
    }

    function erc20Transfer(address token, address to, uint256 amount) external override {
        _erc20Transfer(token, to, amount);
    }

    function erc20TransferFrom(address token, address from, address to, uint256 amount) external override {
        _erc20TransferFrom(token, from, to, amount);
    }
}
```

#### `I<FacetName>.sol`

Interface Solidity définissant uniquement les fonctions publiques/externes. Les clients du Diamond interagiront avec cette interface.

```solidity
interface ITransfer {
    function transferEth(address payable to, uint256 amount) external;
    function erc20Transfer(address token, address to, uint256 amount) external;
    function erc20TransferFrom(address token, address from, address to, uint256 amount) external;
}
```

#### `I<FacetName>Base.sol`

Interface contenant les erreurs personnalisées, événements, structures et énumérations internes. Elle est utilisée par `<FacetName>Base` et `<FacetName>Facet`.

```solidity
interface ITransferBase {
    error Transfer_Failed();

    event ETHTransferExecuted(address indexed from, address indexed to, uint256 amount);
    event ERC20TransferExecuted(address indexed token, address indexed from, address indexed to, uint256 amount);
}
```

---

### Tests des Facets

On teste les Facets en les déployant dans un Diamond via Foundry.

#### **Helper Contract** (`<FacetName>Helper`)

Un helper qui crée le Facet et retourne son adresse, ses sélecteurs, l’initialiseur, et les interfaces supportées :

```solidity
contract TransferFacetHelper is FacetHelper {
    TransferFacet public transferFacet;

    constructor() {
        transferFacet = new TransferFacet();
    }

    function facet() public view override returns (address) {
        return address(transferFacet);
    }

    function selectors() public view override returns (bytes4[] memory selectors_) {
        selectors_ = new bytes4 ;
        selectors_[0] = transferFacet.transferEth.selector;
        selectors_[1] = transferFacet.erc20Transfer.selector;
        selectors_[2] = transferFacet.erc20TransferFrom.selector;
    }

    function initializer() public view override returns (bytes4) {
        return bytes4(0); // Pas d’initialiseur
    }

    function supportedInterfaces() public pure override returns (bytes4[] memory interfaces) {
        interfaces = new bytes4 ;
        interfaces[0] = type(ITransfer).interfaceId;
    }

    function creationCode() public pure override returns (bytes memory) {
        return type(TransferFacet).creationCode;
    }
}
```

#### **Test Abstrait** (`<FacetName>FacetTest`)

Un contrat de test abstrait qui configure le Diamond avec ce Facet :

```solidity
abstract contract TransferFacetTest is FacetTest, ITransfer {
    TransferFacetHelper public transferFacetHelper;

    function setUp() public virtual override {
        super.setUp();
        transferFacetHelper = new TransferFacetHelper();
    }

    function diamondInitParams() public override returns (Diamond.InitParams memory) {
        FacetCut ;
        baseFacets[0] = transferFacetHelper.makeFacetCut(FacetCutAction.Add);

        return Diamond.InitParams({
            baseFacets: baseFacets,
            init: address(0),
            initData: ""
        });
    }
}
```

#### **Tests Unitaires**

Créez un contrat de test par méthode externe, dans `behavior/`, nommé `<Facet>_<Method>.t.sol`. Exemple :

```solidity
contract TransferFacet_Behavior is TransferFacetTest {
    MockERC20 token;
    address user = address(0x123);
    address recipient = address(0x456);

    function setUp() public override {
        super.setUp();
        token = new MockERC20();
        token.setBalance(address(this), 100 ether);
        token.setAllowance(address(this), address(this), 100 ether);
    }

    function test_Transfer_Success() public {
        uint256 amount = 1 ether;
        vm.expectEmit(address(this));
        emit ITransfer.ERC20TransferExecuted(address(token), address(this), recipient, amount);
        ITransfer(address(diamond)).erc20Transfer(address(token), recipient, amount);
        assertEq(token.balanceOf(recipient), amount);
    }
}
```

---
