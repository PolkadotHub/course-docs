---
title: Criptografía
module: 1
---

# Criptografía

La seguridad es un componente crítico en las blockchains, y la criptografía es la que respalda esta seguridad. Mediante el uso de varias técnicas criptográficas, las blockchains aseguran la integridad y autenticidad de las transacciones y datos. En esta sección, exploraremos tres aspectos clave: el hashing criptográfico, la criptografía de clave pública y las firmas digitales.

# Hashing Criptográfico

El **hashing** es el proceso de convertir cualquier tipo de datos en una cadena de caracteres de longitud fija, conocida como un **hash**. Las funciones hash transforman la entrada de manera que es prácticamente imposible derivar la entrada original a partir del hash de salida. Además, cualquier cambio, por mínimo que sea, en la entrada provoca un cambio significativo en el hash de salida, un fenómeno conocido como **efecto avalancha**.

En el contexto de blockchain, los árboles de Merkle son un ejemplo de cómo se utiliza el hashing. Cada bloque en la cadena de bloques incluye un hash que enlaza con el bloque anterior, creando así una conexión inmutable entre los bloques. Algunos ejemplos de funciones hash utilizadas en blockchain incluyen SHA-256 (Bitcoin), Keccak256 (Ethereum) y Blake2 (Polkadot y ZCash).

# Criptografía de Clave Pública

La criptografía de clave pública, también conocida como **criptografía asimétrica**, utiliza un par de claves: una pública y una privada. En el mundo de las blockchains, cada usuario posee un par de estas claves. La clave pública sirve como identificador del usuario en la blockchain, mientras que la clave privada se utiliza para firmar transacciones y proporcionar una prueba de autenticidad.

# Firmas Digitales

Las **firmas digitales** son una aplicación esencial de la criptografía de clave pública en las blockchains. Al realizar una transacción, el usuario firma la transacción con su clave privada, generando una firma digital que se añade a la transacción. Los demás nodos de la red pueden utilizar la clave pública del remitente para verificar que la firma digital se creó con la clave privada correspondiente, proporcionando así una prueba de que la transacción fue realmente enviada por el propietario de esa clave privada.

Estas técnicas criptográficas trabajan en conjunto para preservar la integridad y seguridad de la blockchain, garantizando que sólo las transacciones auténticas y válidas sean añadidas a la cadena y que una vez que una transacción ha sido confirmada, no puede ser alterada ni eliminada.

# Algoritmos de Firma Digital

En Polkadot, se utiliza un algoritmo distinguido conocido como **Schnorrkel/Ristretto x25519** o **"sr25519"** para la generación de claves y la firma de transacciones. Este esquema aprovecha las firmas de **Schnorr**, lo que permite una mayor eficiencia sin comprometer el nivel de seguridad. Además, una característica distintiva de "sr25519" es su capacidad para permitir la **multisignatura nativa** a través de la agregación de firmas.

Un elemento central de estos sistemas es la **criptografía de curva elíptica**, que aporta seguridad mediante la utilización de claves más cortas. Este enfoque disminuye significativamente la demanda de recursos computacionales y de almacenamiento, lo cual es esencial en ambientes con recursos limitados. La seguridad de estos sistemas radica en la complejidad del problema del **logaritmo discreto en curvas elípticas**.

Dentro de este esquema, se genera un par de claves. La **clave pública**, que corresponde a un punto en la curva elíptica, y la **clave privada**, que es un número generado aleatoriamente. A partir de este número aleatorio, el mensaje, la clave privada y ciertos datos específicos relacionados con la curva elíptica utilizada, se establece la firma digital.

La curva utilizada en Polkadot es la **curva elíptica Curve25519**, la cual puede representarse a través de la siguiente ecuación:

- y² = x³ + 486662x² + x

Aquí, (x,y) corresponde a un punto en la curva. El **punto base** de la curva, designado como G = (x,y), tiene las siguientes coordenadas:

- x = 9
- y = 14781619447589544791020593568409986887264606134616475288964881837755586237401

La clave pública se deriva a partir de la multiplicación escalar de la clave privada (generada aleatoriamente) por el punto base de la curva.

- Para aquellos interesados en los detalles matemáticos de este proceso, recomendamos el siguiente video de Computerphile: **[Elliptic Curves](https://www.youtube.com/watch?v=NF1pwjL9-DE)**
