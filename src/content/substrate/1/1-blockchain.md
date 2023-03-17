---
title: Blockchain
module: 1
---

# ¿Qué es una Blockchain?

Para comenzar a hablar de blockchains, podemos pensar en ellas como una base de datos particular. Esta base de datos es del tipo distribuida y replicada, lo que significa que todos los participantes o "nodos" que quieran interactuar con la misma deben tener una copia de los datos almacenados localmente.

Cada nueva información que se quiera añadir debe tener la forma de un bloque, que está compuesto básicamente por:

- Identificador del bloque
- Datos (transacciones, etcétera)
- Identificador del bloque padre

Cada nuevo bloque añadido contará con un identificador del bloque padre, que idealmente debería ser el último bloque añadido. De esta forma, se obtiene una conjunto de bloques enlazados, o una cadena de bloques.

# Modificar la Blockchain

Ya conociendo la estructura, podemos analizar los distintos escenarios de interacción con una cadena de bloques:

- Inserción: se crea un bloque con la información a añadir y se enlaza con el bloque anterior.
- Eliminación o modificación: la blockchain es **inmutable**, es decir, no es posible modificar ni eliminar bloques.

La inmutabilidad que presentan las blockchains las hace ideales para ser utilizadas en aplicaciones que requieran altas garantías en cuanto a la integridad de los datos y la inexistencia de fraudes.

# Problema Del Doble Gasto

Uno de los principales problemas que las cadenas de bloques solucionan en aplicaciones financieras es el doble gasto (o double-spend). 

El doble gasto se refiere a la posibilidad de gastar el mismo activo digital más de una vez. En el contexto de las transacciones financieras, esto podría suceder si una persona intenta enviar la misma cantidad de dinero a dos destinatarios diferentes.

Como la base de datos es distribuida, todos los participantes tienen una copia de las transacciones realizadas en la red. Una de las transacciones será válida e insertada en un bloque exitosamente, mientras que la segunda será inválida y rechazada por todos los participantes de la red.

- Lectura recomendada: [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf)
