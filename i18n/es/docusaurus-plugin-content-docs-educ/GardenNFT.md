# Descripción general del mercado NFT & Garden

### Principios fundamentales del mercado NFT & Garden:
- Los NFT deben transferirse a través del mercado BLOK Capital; deben permanecer siempre en nuestro ecosistema y nunca salir de él. ¿Por qué? Los NFT representan la propiedad del Jardín junto con su propietario; si el NFT sale del ecosistema BLOK, la propiedad del jardín estaría en riesgo, lo que resultaría en la pérdida permanente del Jardín del usuario.
- El comercio de jardines debe realizarse a través del mercado BLOK Capital; los jardines deben permanecer siempre dentro de nuestro ecosistema.
- Los creadores de la colección NFT deben recibir regalías por el comercio de NFT.
- Diferentes colecciones de NFT desbloquearán un conjunto único de características de BLOK Capital Gardens, que considera los Jardines tanto como una pieza de arte digital como una cartera de activos criptográficos en constante crecimiento.
- Los NFT se acuñan en Arbitrum, donde reside la DAO de BLOK Capital. Es la cadena de origen.
- Se mantendrá un registro de propiedad de los NFT Garden y sus propietarios en todas las demás cadenas en las que BLOK Capital elija operar en un futuro cercano.
- Utilizaremos Chainlink CCIP, lo que nos permitirá comunicarnos entre cadenas y actualizar los registros de NFT en las cadenas de destino tras una transacción exitosa de Gardens.
- Se debe desarrollar una arquitectura adecuada que permita la mensajería entre cadenas para actualizar instantáneamente el registro de NFT. De lo contrario, corremos el riesgo de perder los Gardens en cadenas de destino durante la transferencia.
- Una vez que el Garden sea listado en el mercado por el vendedor, su propiedad se transferirá al contrato de la Marketplace, impidiendo cualquier acceso al Garden hasta que sea vendido a un comprador o se retire de la lista.
- El contrato de la marketplace es propiedad del DAO y está gobernado por éste.
- El contrato de la marketplace será un beacon proxy o un proxy UUPS, lo que se finalizará tras más discusiones.
- Actualmente, el contrato de la Marketplace será desplegado pero no operará hasta su lanzamiento completo.
- Con cada comercio exitoso de Gardens, BLOK Capital tomará un pequeño porcentaje como tarifa de plataforma.

### Adjuntar características a los jardines mediante colecciones NFT:
- Las características se establecen como variables locales en una faceta Features. La faceta Features es responsable de contener todos los valores como descuento, tarifas de intercambio, tarifas del protocolo, etc., correspondientes a la colección NFT.
- Las características pueden actualizarse en el futuro dependiendo de una votación comunitaria, lo que se alinea con nuestra elección de diseño de hacer que las características estén vivas en una faceta que es actualizable.
- Existe un registro que mantiene el seguimiento del ID del NFT, la dirección del propietario y la dirección del Garden para garantizar la propiedad adecuada de los Gardens y los NFT.
- La colección NFT se lanzará en nuestra cadena fuente Arbitrum y las otras cadenas en las que operará BLOK Capital contendrán un registro que rastrea la propiedad de los NFT con sus respectivos usuarios/titulares.
