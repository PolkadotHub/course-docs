---
title: Algoritmos de Consenso
module: 1
---

# Algoritmos de Consenso

Para mantener la integridad de la cadena de bloques en un entorno **descentralizado**, es crucial tener un mecanismo que permita llegar a un **consenso** entre todos los participantes de la red. Los **algoritmos de consenso** son el medio por el cual se logra este acuerdo. En este submódulo, examinaremos dos de los algoritmos de consenso más populares: **Proof of Work (PoW)** y **Proof of Stake (PoS)**.

# Proof of Work (PoW)

El algoritmo de **Proof of Work**, o **Prueba de Trabajo**, es el pionero en la blockchain y el que utiliza **Bitcoin**. Los participantes de la red, conocidos como **mineros**, deben resolver un problema matemático complejo que requiere una gran cantidad de recursos computacionales. El primer minero que resuelve el problema tiene el derecho de proponer el siguiente bloque en la cadena.

**Ventajas de PoW:**

- Es un mecanismo experimentado y probado, en funcionamiento desde el lanzamiento de Bitcoin en 2009.
- Ofrece robusta seguridad ante ataques, ya que para alterar la red, un atacante necesitaría controlar el 51% del poder de minado total.

**Desventajas de PoW:**

- Las economías de escala pueden favorecer la creación de grandes grupos de minería, lo que puede llevar a la centralización.
- Tiene un alto consumo de energía, lo que plantea preocupaciones medioambientales.

# Proof of Stake (PoS)

En contraste con PoW, la **Prueba de Participación (Proof of Stake)** emplea un enfoque diferente para seleccionar quién tiene el derecho de proponer el siguiente bloque. En lugar de mineros, tenemos **validadores** que deben bloquear una cierta cantidad de criptomonedas (su "participación" o "stake") para ser seleccionados como posibles creadores del siguiente bloque.

**Polkadot** es una de las blockchains que adopta el modelo de PoS. En su caso, no necesitas ser un validador para participar en la seguridad de la red. Puedes delegar tus tokens a un validador existente, lo que te permite contribuir con un capital inicial accesible.

**Ventajas de PoS:**

- Menor consumo de energía en comparación con PoW, lo que lo hace más sustentable.
- Ofrece una mayor descentralización al permitir la participación de más miembros en la red debido a una menor barrera de entrada.

**Desventajas de PoS:**

- Menor seguridad que PoW. Si más del 33% de los validadores actúan de forma deshonesta, la red podría verse comprometida.

**¿Cuál es Mejor?**

La elección entre **PoW** y **PoS** (o cualquier otro algoritmo de consenso) depende en gran medida de las necesidades y objetivos específicos de la red blockchain. PoW puede ofrecer mayor seguridad, pero es más centralizado y consume más energía. Por otro lado, PoS es más eficiente y descentralizado, pero puede comprometer la seguridad de la red.

# Finalidad

La **finalidad** en la blockchain señala el punto en el cual las transacciones inscritas en los bloques ya no pueden ser anuladas o revertidas. Para entender completamente este concepto, es esencial distinguir entre la _finalidad probabilística_ y la _finalidad absoluta_.

**Finalidad probabilística**

La finalidad probabilística es un aspecto distintivo de las blockchains que utilizan el consenso de Nakamoto a través de la Prueba de Trabajo (PoW). Este tipo de finalidad sugiere que, bajo ciertas suposiciones acerca de la red y sus participantes, la permanencia de una transacción en un bloque se vuelve cada vez más probable a medida que se agregan más bloques en la cadena sobre el bloque que contiene dicha transacción. Este fenómeno se debe a la aplicación de las reglas de la cadena _más larga_ o _más pesada_ en el caso de bifurcaciones.

En la blockchain de **Bitcoin**, se considera que una transacción ha alcanzado la "finalidad" una vez que se han agregado suficientes bloques por encima del bloque que la contiene. El consenso general es que después de 6 bloques (aproximadamente una hora), se considera muy improbable que se produzca una reorganización de 6 bloques debido al enorme poder de minado necesario para ello. Sin embargo, en teoría, una transacción podría revertirse si se reorganizan los bloques.

**Finalidad absoluta**

Por otro lado, la finalidad absoluta es una característica inherente a los protocolos basados en la **Prueba de Participación (PoS)**. En este tipo de protocolos, una transacción y un bloque se consideran finales tan pronto como se verifican de acuerdo con las reglas de finalidad del protocolo. No hay ningún escenario en el cual una transacción pueda revocarse una vez que se ha finalizado.

Los dispositivos de finalidad, como **GRANDPA** (GHOST-based Recursive ANcestor Deriving Prefix Agreement) en Polkadot o **Casper FFG** (the Friendly Finality Gadget) en Ethereum, están diseñados para proporcionar garantías más fuertes y rápidas sobre la finalidad de los bloques. Específicamente, estos mecanismos aseguran que los bloques no puedan revertirse una vez que se cumpla el proceso acordado. Esta noción de consenso irreversible es conocida como finalidad demostrable.
