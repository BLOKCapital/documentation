# Guía: Crear un Nuevo Facet de Diamante

### Visión General

En este proyecto utilizamos el patrón "Diamond" (EIP-2535) para componer contratos modulares. Un Diamond es un proxy que delega llamadas a múltiples Facets, cada uno con lógica relacionada. Por ejemplo, "Un Facet puede compararse con un contrato de implementación... \[éste] contiene la lógica de funciones externas que el proxy (Diamond) llamará". Los Facets nos permiten dividir funcionalidades en contratos separados que pueden ser actualizados independientemente. Cada Facet tiene su estado aislado (utilizando el patrón de Diamond Storage) para evitar conflictos de almacenamiento. Esta guía explica nuestras convenciones para añadir un nuevo facet, incluyendo estructura de carpetas, diseño del contrato y pruebas.

### Estructura de Carpetas

Cada nuevo Facet tiene su propia subcarpeta en `src/facets/`, que contiene cinco archivos Solidity, más sus pruebas correspondientes en `test/facets/`. Por ejemplo, un facet de Transfer usaría:

* `src/facets/transfer/TransferFacet.sol` – el contrato facet público.
* `src/facets/transfer/TransferBase.sol` – contrato abstracto con la lógica interna.
* `src/facets/transfer/TransferStorage.sol` – biblioteca (o contrato) que define el almacenamiento.
* `src/facets/transfer/ITransfer.sol` – interfaz para funciones externas.
* `src/facets/transfer/ITransferBase.sol` – interfaz para tipos internos (errores, structs, eventos).

Las pruebas reflejan esta estructura en `test/facets/transfer/`:

* `test/facets/transfer/transfer.sol` – contrato de prueba abstracto (`TransferFacetTest`) que configura el diamond con este facet y un helper (`TransferFacetHelper`) que proporciona la dirección del facet, selectores, etc.
* Una subcarpeta behavior/ para pruebas unitarias (un contrato por método del facet, nombrado `<Facet>_<method>.t.sol`).

Esta convención de nombres asegura claridad y permite aislar pruebas con la opción `--match-contract` de Foundry.

### Diseño del Contrato Facet

Dentro de cada carpeta de facet, seguimos una estructura estricta:

* `<FacetName>Storage.sol`: Implementa el patrón Diamond Storage. Declara una constante `bytes32 STORAGE_SLOT = keccak256("blokc.<facet>.storage")`, una estructura Layout con las variables de estado y una función (típicamente llamada layout()) que retorna un puntero a ese almacenamiento usando ensamblador inline.

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
```

Esto aísla el estado del facet permitiendo entenderlo como una unidad independiente.

* `<FacetName>Base.sol`: Contrato abstracto que define funciones internas. Este contrato importa la librería de almacenamiento y las interfaces necesarias, implementando funciones `internal` o `internal view`. También puede leer/escribir estado usando `Layout storage s = <FacetName>Storage.layout()`. Ejemplo:

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

* `<FacetName>Facet.sol`: Contrato público que hereda del `Base`, la interfaz externa y un marcador de Facet genérico. Define las funciones externas que pueden llamar usuarios o el dueño del Diamond. Aplica control de acceso y puede incluir inicializadores:

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

* `I<FacetName>.sol`: Interfaz que define solo las funciones externas del facet. Se usa para interactuar con el Diamond desde clientes externos.

```solidity
interface ITransfer {
    function transferEth(address payable to, uint256 amount) external;
    function erc20Transfer(address token, address to, uint256 amount) external;
    function erc20TransferFrom(address token, address from, address to, uint256 amount) external;
}
```

* `I<FacetName>Base.sol`: Interfaz o contrato abstracto con errores, eventos, enums y structs usados internamente. Centraliza definiciones para uso entre `<FacetName>Base` y `<FacetName>Facet`. Los errores personalizados deben seguir el formato `FacetName_Error`:

```solidity
interface ITransferBase {
    error Transfer_Failed();

    event ETHTransferExecuted(address indexed from, address indexed to, uint256 amount);
    event ERC20TransferExecuted(address indexed token, address indexed from, address indexed to, uint256 amount);
}
```

### Pruebas de Facets

Probamos los facets desplegándolos en un Diamond usando el framework de pruebas de Foundry. Las convenciones clave son:

* **Contrato Helper** (`<FacetName>Helper`): Crea el facet y retorna su dirección, selectores, initializer, e interfaces soportadas:

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
        selectors_ = new bytes4[](3);
        selectors_[0] = transferFacet.transferEth.selector;
        selectors_[1] = transferFacet.erc20Transfer.selector;
        selectors_[2] = transferFacet.erc20TransferFrom.selector;
    }

    function initializer() public view override returns (bytes4) {
        return bytes4(0);
    }

    function supportedInterfaces() public pure override returns (bytes4[] memory interfaces) {
        interfaces = new bytes4[](1);
        interfaces[0] = type(ITransfer).interfaceId;
    }

    function creationCode() public pure override returns (bytes memory) {
        return type(TransferFacet).creationCode;
    }
}
```

* **Prueba Abstracta** (`<FacetName>FacetTest`): Contrato de prueba que extiende `FacetTest`. En `setUp()` despliega el helper. En `diamondInitParams()` retorna `Diamond.InitParams` con el facet y datos de init:

```solidity
abstract contract TransferFacetTest is FacetTest, ITransfer {
    TransferFacetHelper public transferFacetHelper;

    function setUp() public virtual override {
        super.setUp();
        transferFacetHelper = new TransferFacetHelper();
    }

    function diamondInitParams() public override returns (Diamond.InitParams memory) {
        FacetCut[] memory baseFacets = new FacetCut[](1);
        baseFacets[0] = transferFacetHelper.makeFacetCut(FacetCutAction.Add);

        return Diamond.InitParams({
            baseFacets: baseFacets,
            init: address(0),
            initData: ""
        });
    }
}
```

* **Pruebas Unitarias**: Por cada función externa, crea un contrato separado en behavior/ llamado `<FacetName>_<MethodName>.t.sol`. Usa la dirección del Diamond con la interfaz `I<FacetName>`:

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
        emit ITransfer.TransferExecuted(address(token), address(this), recipient, amount);
        transferFacetHelper.facet().call(
            abi.encodeWithSelector(
                ITransfer.erc20Transfer.selector,
                address(token),
                recipient,
                amount
            )
        );
        assertEq(token.balanceOf(recipient), amount);
    }
}
```
