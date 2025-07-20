# Necesidad del Proxy Diamond

### Breve resumen sobre contratos Proxy y Factory

1. **Contratos Proxy**
Un contrato proxy actúa como intermediario que delega llamadas a un contrato de implementación subyacente. Permite actualizar o modificar la lógica de un smart contract sin cambiar su dirección ni alterar su estado.
   - El contrato proxy mantiene el almacenamiento (estado) y una referencia al contrato de implementación.
   - Cuando un usuario interactúa con el proxy, este reenvía la llamada al contrato de implementación usando delegatecall, que ejecuta la lógica en el contexto del almacenamiento del proxy.
   - Para actualizar, el proxy apunta a un nuevo contrato de implementación sin cambiar su dirección.

2. **Contratos Factory**
Un contrato factory es un smart contract que crea y despliega otros smart contracts, a menudo llamados "contratos hijos". Sirve como plantilla para generar múltiples instancias de un contrato. Automatiza el despliegue de contratos estandarizados y realiza un seguimiento de los contratos creados.
   - El contrato factory contiene la lógica para desplegar nuevos contratos, normalmente usando las instrucciones create o create2 en Solidity.
   - Puede almacenar referencias a los contratos desplegados y proporcionar métodos para interactuar con ellos.
   - Los usuarios llaman a la factory para crear nuevas instancias, pasando parámetros si es necesario (por ejemplo, datos de configuración).

### Necesidad del proxy Diamond

![Texto alternativo](/img/diamondProxy2.png)

Aunque los proxies Beacon y UUPS ofrecen mecanismos de actualización más simples, tienen una limitación clave: cada actualización requiere reemplazar todo el contrato de implementación. Este enfoque carece de flexibilidad, especialmente cuando el sistema necesita evolucionar y admitir extensibilidad modular.

Por ejemplo, supongamos que en el futuro introducimos una nueva función como la transferibilidad de cuentas—la capacidad de los usuarios para transferir su cuenta a otra persona. Con Beacon o UUPS, esto implicaría actualizar todo el contrato de implementación, lo que es más riesgoso y puede introducir otras vulnerabilidades en el sistema.

Por el contrario, el estándar Diamond (EIP-2535) nos permite agregar esta funcionalidad de manera modular. Simplemente podemos desarrollar una nueva faceta (por ejemplo, AccountTransferFacet) y adjuntarla al diamond existente sin afectar otras partes del contrato. Esto mejora la granularidad de las actualizaciones, minimiza el riesgo y promueve una separación clara de responsabilidades.

Cada proxy diamond tiene otras dos partes:
   - `diamondCut` — el mecanismo utilizado para agregar, reemplazar o eliminar facetas.
   - `diamondLoupe` — utilizado para consultar qué funciones existen en qué facetas.

En nuestra arquitectura, ambos (`diamondCut` y `diamondLoupe`) estarán centralizados a través de la gobernanza DAO. La DAO rastrea todas las facetas activas y gestiona las actualizaciones de forma segura y transparente.

Esta configuración nos da un mecanismo de actualización controlado por la DAO. 