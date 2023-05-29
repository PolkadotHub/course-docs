---
title: Introducción a la Blockchain
module: 1
draft: false
---

# Introducción a la Blockchain

Una **blockchain** puede ser entendida como una base de datos especializada, distinguida por ser distribuida y replicada. Esto significa que cada participante o **nodo** en la red debe mantener una copia local de todos los datos almacenados en ella.

La información nueva que se añade a la blockchain debe estructurarse en forma de un **bloque**. Cada bloque se compone de:

- Un identificador único del bloque
- Datos, que pueden ser transacciones, por ejemplo
- El identificador del bloque previo o "**bloque padre**"

Cada nuevo bloque se enlaza al bloque padre, creando una cadena de bloques conectados. De aquí surge el término **cadena de bloques** o **blockchain**.

# Interacción con la Blockchain

Una vez comprendida la estructura básica de la blockchain como base de datos, se pueden considerar los diferentes escenarios de interacción:

- **Inserción**: se crea y añade un bloque con la información nueva, enlazándolo al bloque anterior.
- **Eliminación o modificación**: una característica esencial de las blockchains es su **inmutabilidad**, lo que significa que no es posible eliminar ni modificar bloques una vez que se han añadido a la cadena.

Esta inmutabilidad hace que las blockchains sean idóneas para aplicaciones que necesitan asegurar la integridad de los datos y prevenir fraudes.

# El Problema del Doble Gasto

Las blockchains han superado un obstáculo importante en el ámbito financiero, el problema del doble gasto (o **double-spend**).

El doble gasto se refiere a la posibilidad de emplear el mismo activo digital en más de una transacción. Desde una perspectiva financiera, este problema podría surgir si un individuo intenta transferir la misma cantidad de dinero a dos receptores distintos al mismo tiempo.

En las transacciones digitales tradicionales, dependemos de un intermediario, como un banco, para autenticar las transacciones. Estas entidades se encargan de asegurar que el emisor de la transacción posee los fondos suficientes y no está tratando de utilizar el mismo dinero más de una vez.

En un sistema descentralizado y distribuido como la blockchain, no existe tal entidad centralizada. Y si tal entidad existiera, estaríamos depositando nuestra confianza en ella. Por consiguiente, se vuelve imprescindible encontrar una forma de validar las transacciones sin la necesidad de un tercero.

Las transacciones en la blockchain son validadas mediante el uso de técnicas de criptografía, y gracias a que la base de datos de la blockchain es distribuida, todos los nodos mantienen una copia de todas las transacciones. En una situación de doble gasto, una transacción será considerada legítima e incorporada a un bloque, mientras que la segunda será identificada como ilegítima y rechazada por el resto de los participantes en la red.

- **Lectura recomendada**: [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf)

Este trabajo académico, además de ser un hito en la historia de la blockchain, proporciona un entendimiento profundo de la solución propuesta al problema del doble gasto y del origen de Bitcoin, la primera implementación exitosa de una blockchain.
