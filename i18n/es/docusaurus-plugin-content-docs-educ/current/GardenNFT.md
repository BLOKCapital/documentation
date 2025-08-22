# Descripción general del mercado NFT & Garden

### Principios fundamentales del mercado NFT & Garden:
* Los NFTs siempre serán transferidos a través del **Marketplace de BLOK Capital**. Permanecerán en nuestro ecosistema y nunca lo abandonarán.
* **Razón:** Los NFTs representan la **propiedad de los Jardines**. Si un NFT sale del ecosistema BLOK, la propiedad de su Jardín correspondiente se compromete, lo que resulta en la pérdida permanente del Jardín del usuario.
* El **comercio de Jardines** se realizará exclusivamente a través del Marketplace de BLOK Capital. Los Jardines permanecerán en nuestro ecosistema en todo momento.
* Los creadores de colecciones NFT recibirán **regalías** en cada transacción de sus NFTs.
* Diferentes colecciones NFT desbloquearán **funcionalidades únicas** para los Jardines de BLOK Capital, posicionando los Jardines como **arte digital** y como un **portafolio cripto en crecimiento continuo**.
* Los NFTs serán **minteados en Arbitrum**, la cadena donde reside el DAO de BLOK Capital (cadena fuente).
* Se mantendrá un **registro de propiedad de NFTs Jardín** en todas las demás cadenas donde BLOK Capital opere en el futuro.
* BLOK Capital integrará **Chainlink CCIP** para permitir la **comunicación entre cadenas**, asegurando que los registros NFT en las cadenas de destino se actualicen tras cada intercambio exitoso de Jardín.
* Se desarrollará una **arquitectura cross-chain** adecuada para garantizar actualizaciones instantáneas de los registros. Sin esto, los Jardines en cadenas de destino podrían estar en riesgo durante las transferencias.
* Cuando un Jardín sea listado en el Marketplace por un vendedor, la **propiedad se transferirá temporalmente al contrato del Marketplace**, bloqueando el acceso del usuario hasta que se venda o se retire.
* El **contrato Marketplace** será propiedad y estará gobernado por el DAO.
* El contrato adoptará el **estándar Beacon Proxy o UUPS Proxy**, según se defina tras la revisión.
* El contrato Marketplace será desplegado pero permanecerá **inactivo hasta el lanzamiento oficial** del protocolo.
* Por cada intercambio exitoso de Jardín, BLOK Capital cobrará un **pequeño porcentaje en comisiones de la plataforma**.

### Adjuntar funcionalidades a los Jardines a través de las colecciones NFT

* Las funcionalidades se definirán como **variables locales** dentro de un **Features Facet**, que contendrá parámetros como: tasas de descuento, comisiones de swap y comisiones de protocolo, todos vinculados a la colección NFT correspondiente.
* Las funcionalidades serán **actualizables** y podrán modificarse en el futuro mediante **votación comunitaria**, en línea con el principio de evolución guiada por la gobernanza de BLOK Capital.
* Las colecciones NFT se lanzarán en **Arbitrum (cadena fuente)**. En todas las demás cadenas compatibles, los registros rastrearán la propiedad de los NFTs y sus titulares.