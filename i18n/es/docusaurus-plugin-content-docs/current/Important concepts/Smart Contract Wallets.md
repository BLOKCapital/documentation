# Spanish translation of the Smart Contract Wallet content
translated_swa_content = """# Cartera de Contrato Inteligente (SWA)

Una **cartera de contrato inteligente** es un tipo de cartera de criptomonedas que utiliza código programable, conocido como contratos inteligentes, para gestionar y controlar activos digitales en la blockchain. A diferencia de las carteras tradicionales que dependen únicamente de claves privadas, las carteras de contrato inteligente permiten funciones avanzadas como aprobaciones multi-firma, límites de gasto y opciones de recuperación de cuenta, mejorando tanto la seguridad como la flexibilidad para los usuarios.

## Diferencias entre Carteras de Contrato Inteligente y Cuentas Externamente Propiedad (EOAs)

1. **Mecanismo de Control**:
   - **EOAs**: Controladas directamente por los usuarios mediante claves privadas. La posesión de la clave privada otorga control total sobre la cuenta y sus activos.
   - **Carteras de Contrato Inteligente**: Gobernadas por contratos inteligentes programables que definen reglas y condiciones específicas para las transacciones, permitiendo operaciones automáticas y condicionales.

2. **Funcionalidad**:
   - **EOAs**: Soportan principalmente funciones básicas como enviar y recibir tokens.
   - **Carteras de Contrato Inteligente**: Ofrecen características avanzadas como transacciones multi-firma, protocolos de seguridad personalizables e interacción directa con aplicaciones descentralizadas (DApps).

3. **Características de Seguridad**:
   - **EOAs**: La seguridad depende únicamente de la protección de la clave privada; su pérdida o compromiso puede resultar en la pérdida de activos.
   - **Carteras de Contrato Inteligente**: Proporcionan medidas de seguridad mejoradas, incluyendo autenticación multifactor y controles de acceso programables, reduciendo la dependencia de una sola clave privada.

4. **Inicio de Transacciones**:
   - **EOAs**: Pueden iniciar transacciones en la blockchain de manera independiente.
   - **Carteras de Contrato Inteligente**: Generalmente requieren la interacción con una EOA para desplegar y ejecutar contratos inteligentes, ya que no pueden iniciar transacciones de forma autónoma.

En resumen, mientras que las EOAs son simples y controladas por el usuario a través de claves privadas, las carteras de contrato inteligente aprovechan la programabilidad de los contratos inteligentes para ofrecer mayor seguridad, flexibilidad y funcionalidad, permitiendo a los usuarios adaptar el comportamiento de su cartera a sus necesidades específicas.
"""

# Create the markdown file
swa_file_path = Path("/mnt/data/Cartera_Contrato_Inteligente_SWA.md")
swa_file_path.write_text(translated_swa_content, encoding="utf-8")

swa_file_path

