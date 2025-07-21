# ERC 4337 : Abstracción de Cuenta

La Abstracción de Cuenta (ERC-4337) es un marco que permite que las billeteras de smart contracts actúen como cuentas de usuario normales (EOA) eliminando la necesidad de claves privadas y habilitando potentes funciones programables.

![Texto alternativo](/img/AA2.png)

### Flujo de transacción en ERC-4337
1. **Inicio**: Un usuario crea una UserOperation, especificando su intención de transacción (por ejemplo, transferir tokens).
2. **Agrupación**: Un Bundler recopila esta UserOperation, junto con otras, y las agrupa en una sola transacción.
3. **Envío**: El Bundler envía la transacción agrupada al smart contract EntryPoint en la blockchain.
4. **Verificación**: El EntryPoint verifica las UserOperations, utilizando un Aggregator (si corresponde) para validar firmas de manera eficiente.
5. **Ejecución**: El EntryPoint reenvía cada UserOperation válida a la Smart Contract Account correspondiente.
6. **Gestión de gas**: Si hay un Paymaster involucrado, se encarga del pago del gas (por ejemplo, patrocinando las tarifas o aceptando otros tokens).
7. **Finalización**: La Smart Contract Account ejecuta la UserOperation, completando la acción deseada del usuario.

### Ventajas de la Abstracción de Cuenta ERC-4337
- **Transacciones sin gas**: Los Paymasters permiten a los usuarios interactuar sin tener criptoactivos para el gas, ya que las tarifas pueden ser patrocinadas o pagadas en otros tokens, mejorando la accesibilidad.

- **Mejor experiencia de usuario**: Los usuarios pueden usar billeteras de smart contracts con lógica personalizada (por ejemplo, recuperación social, límites de gasto), eliminando la necesidad de EOAs y frases semilla.

- **Eficiencia en las transacciones**: Los Bundlers agrupan múltiples UserOperations, reduciendo los costos de gas y la congestión de la red, mientras que los Aggregators optimizan la validación de firmas. 