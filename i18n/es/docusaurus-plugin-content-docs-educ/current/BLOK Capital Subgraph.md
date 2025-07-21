# Necesidad de los Subgraphs

En BLOK Capital, la transparencia y la confianza sin intermediarios en el protocolo no son opcionales—son fundamentales. Por eso confiamos en el **framework Subgraph de The Graph Protocol** para indexar y consultar datos on-chain directamente, en lugar de depender de servicios de datos off-chain centralizados o semi-centralizados.

### ¿Qué son los Subgraphs?

Un **subgraph** es una especificación declarativa de cómo ingerir, transformar y servir datos de blockchain en un formato estructurado y consultable. Es parte de **The Graph Protocol**, un protocolo de indexación descentralizado diseñado para datos de blockchain.

Así es como funcionan los subgraphs internamente:

1. **Definición del manifiesto**: Los desarrolladores escriben un manifiesto `subgraph.yaml` que define:

   * Qué smart contracts observar
   * Qué eventos o llamadas de función indexar
   * Cómo mapear los datos on-chain en entidades estructuradas (similares a tablas de base de datos)

2. **Lógica de mapeo**: Mapeos personalizados (en AssemblyScript) transforman eventos brutos o lecturas de almacenamiento en registros estructurados y significativos—por ejemplo, propuestas DAO, votos, intercambios de tokens, etc.

3. **Indexación y consulta**: El Graph Node sincroniza continuamente los eventos on-chain según el manifiesto y almacena los datos procesados en una base de datos consultable. Los clientes luego obtienen los datos a través de una **API GraphQL**, que es eficiente, tipada y de alto rendimiento.

En el contexto de BLOK Capital, esto permite que nuestros clientes frontend, paneles analíticos y herramientas DAO obtengan **datos en vivo y sin confianza** directamente del estado on-chain de nuestro protocolo—sin depender de ningún middleware mutable u opaco.

> **Consulta nuestro endpoint de subgraph** : [blokc-dao-token-voting](https://thegraph.com/explorer/subgraphs/kbrg2GxMGs8DrQcLUtVbn8becrzYjwhxsY1EaLF5pFq?view=Query&chain=arbitrum-one)

---

### ¿Por qué usamos Subgraphs en lugar de proveedores de datos off-chain?

Usar subgraphs no es solo una cuestión de conveniencia—es una decisión estratégica de diseño de protocolo. Estas son las razones por las que optamos por subgraphs en lugar de proveedores off-chain tradicionales:

| Característica                | Subgraphs (The Graph Protocol)                              | Proveedores off-chain (ej: Firebase, APIs, Indexers)   |
| ----------------------------- | ---------------------------------------------------------- | ------------------------------------------------------ |
| **Modelo de confianza**       | Descentralizado, verificable, derivado directamente on-chain| Centralizado, opaco, basado en la confianza            |
| **Actualización de datos**    | Sincronización casi en tiempo real con eventos blockchain   | Depende de polling o actualizaciones push              |
| **Personalización**           | Esquema de entidades y mapeo de eventos totalmente libre    | Limitado a endpoints predefinidos o backend ad-hoc     |
| **Lenguaje de consulta**      | GraphQL (potente, tipado, componible)                      | REST o APIs propietarias, a menudo menos flexibles     |
| **Consistencia con el protocolo**| Derivado directamente del estado canónico del contrato   | Puede sufrir de inconsistencias o artefactos de caché  |
| **Modularidad**               | Fácil de evolucionar con upgrades y cambios de gobernanza   | Requiere refactorizaciones backend frecuentes           |

Al adoptar subgraphs, BLOK Capital garantiza que:

* **Los datos de gobernanza sean verificables y a prueba de manipulaciones**, extraídos directamente de los contratos DAO de Aragon.
* Nuestra arquitectura escale **horizontalmente entre cadenas y módulos**, ya que los subgraphs son portátiles y estandarizados.
* Mantenemos **alineación con la ética de la descentralización**, reduciendo la dependencia de lógica backend de terceros o APIs cerradas.

---

### Caso de uso: Indexación de propuestas DAO mediante el subgraph de Aragon

Utilizamos los subgraphs públicos de Aragon para indexar los componentes clave de la DAO:

* Metadatos de propuestas (títulos, descripciones, proponentes)
* Ciclo de vida de la votación (abierta, activa, cerrada, ejecutada)
* Poder de voto por dirección e historial de participación
* Resultados de ejecución (éxito, fallo, etc.)

Estos datos alimentan nuestros paneles internos de gobernanza, interfaces comunitarias y sistemas de alertas automatizadas—todo de manera **totalmente transparente y reproducible**. 