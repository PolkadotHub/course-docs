---
title: Criptografía
module: 1
draft: false
---

# Criptografía

Mediante el uso de varias técnicas criptográficas, las blockchains aseguran la integridad y autenticidad de las transacciones y datos. En esta sección, exploraremos tres aspectos clave: el hashing criptográfico, la criptografía de clave pública y las firmas digitales.

# Hashing Criptográfico

El **hashing** es una técnica que permite transformar cualquier clase de datos en una secuencia fija de caracteres, conocida como un **hash**. Las funciones hash convierten los datos de entrada de tal forma que resulta prácticamente inviable obtener los datos originales a partir del hash resultante. Además, cualquier variación, por mínima que sea, en los datos de entrada provoca un cambio drástico en el hash resultante, fenómeno conocido como **efecto avalancha**.

Los árboles de Merkle (o **Merkle Trees**) son una aplicación práctica del hashing. Se trata de una estructura de datos que vincula información mediante hashes, y es donde se almacenan los datos. Estos árboles son esenciales para comprobar la integridad de los datos almacenados en la blockchain, ya que cualquier modificación en el estado desencadena un cambio en el hash de la **raíz** del árbol de Merkle.

Este concepto también se aplica a los identificadores de los bloques. El identificador de un bloque es el hash de su cabecera, que incluye detalles como el hash del bloque anterior y la raíz del árbol de Merkle. Esto implica que cualquier modificación en el contenido del bloque resultará en un cambio en su identificador, lo que constituye un mecanismo efectivo para comprobar su integridad.

Algunos ejemplos de funciones hash empleadas en blockchain incluyen SHA-256 (Bitcoin), Keccak256 (Ethereum) y Blake2 (Polkadot y ZCash).

# Criptografía de Clave Pública

La criptografía de clave pública, también conocida como criptografía asimétrica, utiliza un par de claves: una **pública** y una **privada**. En el mundo de las blockchains, cada usuario posee un par de estas claves. La clave pública sirve como identificador del usuario en la blockchain, mientras que la clave privada se utiliza para firmar transacciones y proporcionar una prueba de autenticidad.

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
