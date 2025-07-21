---
sidebar_position: 2   
---

# Arquitectura del Protocolo V1

![Texto alternativo](/img/architect.png)

## Las partes principales de nuestra arquitectura son las siguientes:

### Infraestructura de Cartera
La incorporación de nuevos usuarios se ve obstaculizada por la complejidad y el riesgo de la gestión de frases semilla. Al integrar la solución MPC de Web3Auth, eliminamos las frases semilla mientras preservamos la seguridad EOA y ofrecemos a los usuarios avanzados la opción de conectar sus propias claves. Las futuras actualizaciones seguirán los estándares de abstracción de cuentas de Ethereum EIP-3074 y ERC-4337, eliminando nuestra capa MPC una vez que el soporte nativo madure. Este enfoque híbrido ofrece una experiencia de registro y cartera al estilo Web2, garantiza la custodia segura de claves sin un único punto de fallo y allana el camino para una adopción descentralizada más amplia.

### Infraestructura del Protocolo

- Jardines: Contrato inteligente que actúa como portafolio para los usuarios. Los Jardines son desplegados por el contrato GardenFactory. Un solo usuario puede poseer varios Jardines.
- Jardineros: Gestores de patrimonio que podrán administrar los Jardines, es decir, el portafolio de los usuarios.
- Contratos de administración de Jardines: Estos contratos son responsables de mantener los controles administrativos adecuados y permiten que el Jardín acceda de forma segura al poder del protocolo DeFi según lo votado por la comunidad.
- Registros de protocolo: Estos registros son administrados por la comunidad a través de votos DAO y controles utilizados por los contratos de administración de Jardines para garantizar que solo se puedan realizar acciones verificadas por la comunidad en los protocolos DeFi.
- Contratos de integración DeFi: Contratos de implementación para diferentes integraciones de protocolos DeFi como DEX, protocolos de préstamos, staking, etc.

### Subgráficos de BLOK Capital
Aprovechamos los subgráficos del protocolo The Graph para consultar eventos on-chain, eliminando la necesidad de servicios de datos off-chain centralizados. Estos subgráficos impulsan nuestra interfaz de gobernanza al indexar eventos clave como propuestas y votos, y también se utilizan en nuestros contratos de registro. Al indexar la actividad on-chain, los subgráficos aseguran que todas las interacciones con el protocolo sean transparentes, verificables y fácilmente accesibles por la comunidad. Este enfoque es fundamental para mantener la confianza y la visibilidad en las operaciones y decisiones de gobernanza del protocolo.

### Arquitectura DAO con Aragon
Utilizamos el protocolo Aragon para construir y gestionar nuestra DAO, beneficiándonos de su infraestructura de gobernanza altamente personalizable y modular. Aragon proporciona la flexibilidad necesaria para adaptar la DAO a los requisitos específicos de nuestro protocolo. La DAO gobierna las decisiones y operaciones clave, asegurando que el desarrollo del protocolo y la asignación de recursos sean impulsados por la comunidad de manera transparente y descentralizada. Esta estructura promueve la responsabilidad, la resiliencia y la sostenibilidad a largo plazo.

### Integraciones de Protocolos DeFi
La integración de diferentes protocolos DeFi permitiría a los usuarios utilizar sus funciones sin tener que salir de la interfaz de BLOK Capital. La lista de integraciones crecerá a medida que la comunidad crezca con el tiempo.
- Protocolos de préstamos: Los usuarios pueden depositar activos criptográficos en protocolos de préstamos integrados como AAVE para ganar intereses y hacer crecer su portafolio, todo dentro de una interfaz unificada.
- DEX (Intercambios Descentralizados): Los usuarios pueden intercambiar o comprar los tokens de su elección a través de plataformas integradas como Uniswap, asegurando flexibilidad y facilidad en la gestión de activos. 