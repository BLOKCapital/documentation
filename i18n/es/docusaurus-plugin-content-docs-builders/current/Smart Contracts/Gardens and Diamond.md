---
sidebar_position: 2   
---

# Jardines y Diamantes

### La Arquitectura de Diamantes y Jardines

En BLOK Capital, nuestra arquitectura principal para los contratos inteligentes depende del patrón proxy Diamond. En esta sección, exploraremos la arquitectura de los diamantes, un enfoque de despliegue basado en fábrica inspirado en el repositorio Nick Mudge Diamond, y cómo estos conceptos crean un "jardín" que impulsa la arquitectura de BLOK.

### Flujo del Contrato Proxy:
![Texto alternativo](/img/diamondSchema2.png)

### ¿Qué es el Diamond Standard?

El Diamond Standard, propuesto por Nick Mudge en EIP-2535, ayuda a resolver el problema de cómo crear contratos modulares y actualizables sin alcanzar los límites de gas o tamaño. Los contratos tradicionales son monolíticos, con toda la lógica empaquetada en una sola dirección, lo que hace que las actualizaciones sean muy difíciles y arriesgadas. Los diamantes, en cambio, son como jardines: consisten en un único **contrato Diamond** (por ejemplo, el suelo) que delega funcionalidades a múltiples **facetas** (por ejemplo, las plantas), cada una con lógica específica.

Un diamond es un contrato proxy que utiliza una arquitectura única para:

- **Modularizar la lógica**: Dividir la funcionalidad en facetas más pequeñas y reutilizables.
- **Permitir actualizaciones**: Agregar, reemplazar o eliminar facetas sin volver a desplegar todo el contrato.
- **Evitar límites de tamaño**: Almacenar solo los selectores de funciones en el diamond, delegando la ejecución a las facetas.

Esta modularidad hace que los diamantes sean ideales para aplicaciones descentralizadas complejas (dApps) que necesitan evolucionar/actualizarse con el tiempo, como un jardín que puede ser replantado o ampliado.

### La Arquitectura de un Diamond

Imagina el diamond como un centro (el contrato `Diamond.sol`) que enruta las llamadas de función a facetas especializadas. Cada faceta es un contrato separado que contiene un subconjunto de la funcionalidad del sistema, como propiedad, transferencias de tokens o gobernanza. El diamond mantiene un mapeo de **selectores de funciones** (identificadores únicos para funciones) a direcciones de facetas, permitiendo delegar llamadas eficientemente.
![Texto alternativo](/img/delegation.png)

#### Componentes Clave en la Arquitectura Diamond

1. **Contrato Diamond** (`Diamond.sol`):
    - Actúa como punto de entrada para todas las interacciones.
    - Almacena un mapeo de selectores de funciones a direcciones de facetas.
    - Implementa la función `fallback` para enrutar llamadas a la faceta adecuada.
    - Utiliza la función `diamondCut` para agregar, reemplazar o eliminar facetas, permitiendo actualizaciones.
2. **Facetas**:
    - Contratos independientes (por ejemplo, `DiamondCutFacet.sol`, `DiamondLoupeFacet.sol`) que contienen funciones específicas.
    - Por ejemplo, `DiamondCutFacet` gestiona actualizaciones, mientras que `DiamondLoupeFacet` proporciona introspección (consulta de direcciones y selectores de facetas).
3. **Interfaces**:
    - Interfaces estándar como `IDiamondCut` y `IDiamondLoupe` para garantizar la coherencia.
    - Las facetas implementan estas interfaces para proporcionar funcionalidad específica.
4. **Selectores de Función**:
    - Un hash de 4 bytes (por ejemplo, `keccak256("functionName()")`) que identifica una función.
    - El diamond asigna selectores a direcciones de facetas, asegurando que cada llamada sea manejada por el contrato correcto.

![Texto alternativo](/img/diamondFacet2.png)

Aquí tienes un ejemplo simplificado de la función fallback de `Diamond.sol`, que delega llamadas a las facetas:

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

Este código muestra cómo el diamond enruta las llamadas entrantes (`msg.sig`) a la faceta adecuada, permitiendo la modularidad.

### El Jardín: Sistemas Modulares y Escalables

¿Por qué llamarlo un "jardín"? En un jardín, cada planta (faceta) cumple una función: algunas aportan estructura (como `DiamondCutFacet`), otras belleza (como `DiamondLoupeFacet`), y otras dan fruto (como facetas personalizadas para la lógica de tu dApp). El Diamond Standard te permite cultivar un jardín de contratos inteligentes que:

- **Crece con el tiempo**: Agrega nuevas facetas a medida que evolucionan los requisitos.
- **Poda y replanta**: Reemplaza o elimina facetas obsoletas sin interrumpir el jardín.
- **Escala eficientemente**: Mantén el contrato principal ligero delegando la lógica a las facetas.

Esta modularidad es especialmente poderosa para dApps como DAOs, protocolos DeFi o plataformas NFT, donde se pueden agregar nuevas funciones (gobernanza, staking, etc.) sin volver a desplegar todo el sistema.

### Despliegue Basado en Fábrica con `DiamondFactory.sol`

Desplegar diamantes manualmente puede ser complicado, especialmente para sistemas que requieren múltiples instancias (por ejemplo, un marketplace con muchos diamantes específicos de usuario). El repositorio `diamond-foundry` introduce `DiamondFactory.sol`, un contrato fábrica que automatiza el despliegue de diamantes y la inicialización de facetas, actuando como un jardinero plantando nuevas parcelas.

#### Cómo Funciona `DiamondFactory.sol`

La fábrica despliega un nuevo contrato `Diamond` y lo inicializa con las facetas especificadas. Aquí tienes una versión simplificada de `DiamondFactory.sol`:
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
        // Simplificado: Selectores codificados para facetas conocidas
        selectors = new bytes4[](4);
        selectors[0] = bytes4(keccak256("facets()"));
        selectors[1] = bytes4(keccak256("facetFunctionSelectors(address)"));
        selectors[2] = bytes4(keccak256("facetAddresses()"));
        selectors[3] = bytes4(keccak256("facetAddress(bytes4)"));
        return selectors;
    }
}
```

La fábrica:

1. Despliega un nuevo contrato `Diamond` con el propietario especificado.
2. Crea un array `FacetCut` para registrar las facetas (por ejemplo, `DiamondCutFacet`, `DiamondLoupeFacet`).
3. Llama a `diamondCut` para inicializar el diamond con las facetas.
4. Emite un evento para rastrear los despliegues.

Este patrón de fábrica permite un despliegue escalable, permitiéndote plantar múltiples diamantes en tu jardín con un esfuerzo mínimo.

#### Ejemplo de Despliegue

Así es como podrías desplegar un diamond usando un script de Foundry:
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
Ejecuta este script con:
```shell
forge script script/DeployDiamond.s.sol --fork-url http://localhost:8545 --broadcast
```

### Probando el Jardín

Para asegurar que tu jardín diamond prospere, necesitas pruebas robustas. Las pruebas basadas en Solidity de Foundry lo hacen sencillo. A continuación, una suite de pruebas que verifica el despliegue de la fábrica y la funcionalidad del diamond:
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
Ejecuta las pruebas con:
```shell
forge test
```

### Beneficios del Jardín Diamond

El Diamond Standard, junto con un despliegue basado en fábrica, ofrece:

- **Modularidad**: Agrega nuevas funciones (facetas) sin volver a desplegar el contrato principal.
- **Escalabilidad**: Despliega múltiples diamantes para diferentes usuarios o casos de uso.
- **Actualizabilidad**: Actualiza la funcionalidad sin romper los contratos existentes.
- **Eficiencia de gas**: Mantén el contrato diamond ligero delegando la lógica a las facetas.

### Conclusión

El Diamond Standard es una herramienta poderosa para construir sistemas de contratos inteligentes modulares y actualizables, similar a cultivar un jardín donde cada planta (faceta) contribuye a un ecosistema próspero. Usando `DiamondFactory.sol`, puedes automatizar el despliegue de diamantes, facilitando la expansión de tu jardín a múltiples instancias. Ya sea que estés construyendo un protocolo DeFi, una DAO o un marketplace NFT, el Diamond Standard ofrece la flexibilidad para crecer y adaptarse.

Para más detalles, consulta el repositorio [forgenie diamond-foundry](https://github.com/forgenie/diamond-foundry) y [EIP-2535](https://eips.ethereum.org/EIPS/eip-2535).

¡Feliz jardinería! 