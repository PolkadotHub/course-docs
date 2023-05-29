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

Una vez comprendida la estructura básica de la blockchain, se pueden considerar los diferentes escenarios de interacción:

- **Inserción**: se crea y añade un bloque con la información nueva, enlazándolo al bloque anterior.
- **Eliminación o modificación**: una característica esencial de las blockchains es su **inmutabilidad**, lo que significa que no es posible eliminar ni modificar bloques una vez que se han añadido a la cadena.

Esta inmutabilidad hace que las blockchains sean idóneas para aplicaciones que necesitan asegurar la integridad de los datos y prevenir fraudes.

# El Problema del Doble Gasto

Las blockchains han resuelto un desafío significativo en el contexto financiero conocido como el problema del doble gasto (o **double-spend**).

En transacciones digitales convencionales, dependemos de una tercera parte, como un banco, para validar las transacciones. Estas entidades aseguran que quien realiza la transacción posee los fondos requeridos y que no intenta gastar el mismo dinero dos veces. Sin embargo, en un sistema distribuido y descentralizado como la blockchain, no existe tal entidad centralizada.

El doble gasto se refiere a la capacidad de gastar el mismo activo digital más de una vez. En términos financieros, podría suceder si una persona intenta enviar la misma cantidad de dinero a dos receptores distintos al mismo tiempo.

Dado que la base de datos de la blockchain es distribuida, todos los nodos tienen una copia de todas las transacciones. En un intento de doble gasto, una transacción será considerada válida e incorporada a un bloque, mientras que la segunda será identificada como inválida y rechazada por los demás participantes de la red.

- **Lectura recomendada**: [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf)

Este documento, escrito por Satoshi Nakamoto, ofrece una visión profunda de la solución propuesta para el problema del doble gasto y el nacimiento de Bitcoin, la primera implementación exitosa de una blockchain.
