---
title: Algoritmos de Consenso
module: 1
---

# Algoritmos de Consenso

En este submódulo repasaremos dos de los algoritmos de consenso más conocidos: proof of work y proof of stake. Ambos algoritmos resuelven el problema de consenso mediante el control sobre quién tiene el derecho de proponer el siguiente bloque en la cadena, mientras que el resto de la red se encarga de validar y aceptar o rechazar dicho bloque.

# Proof Of Work (PoW)

En una blockchain que utiliza proof-of-work como algoritmo de consenso, contamos con un conjunto de participantes que se denominan mineros. Estos se encargan de resolver un problema matemático complejo que requiere muchos recursos computacionales para obtener la solución y poder proponer el siguiente bloque de la red. El término "minero" surge porque, por lo general, existe una recompensa por proponer un bloque.

Ventajas:

- Mecanismo experimentado. Ha sido utilizado por Bitcoin desde 2009.
- Seguridad ante ataques, se necesita obtener el 51% del poder de minado total.

Desventajas:

- Las economías de escala permiten la creación de grandes grupos mineros.
- Alto consumo de energía.

# Proof Of Stake (PoS)

En una red PoS, ya no contamos con mineros, sino con validadores. Estos necesitan realizar un depósito en la red, de ahí el término "stake" o "apuesta", para poder ser seleccionados como posibles creadores del próximo bloque o "proponentes". Si se detecta algún comportamiento deshonesto por parte de algún validador o si el bloque propuesto no es válido, este será castigado y se le quitará una porción de su stake, generalmente proporcional a la gravedad de lo detectado. A este último evento se le suele conocer como “slashing”.

En el caso particular de Polkadot, uno puede apostar a la red sin tener un validador, delegando nuestros tokens a algún validador ya existente, lo que nos permite participar en el aporte a la seguridad de la red.

Proof of Stake es definitivamente más eficiente que Proof of Work y también más descentralizado, ya que permite la participación de más miembros en la red debido a la baja barrera de entrada. Sin embargo, cuenta con menor seguridad, ya que si más del 33% de los validadores no actúa de manera honesta, la red podría verse comprometida.

# ¿Cuál es el mejor?

Ambos algoritmos tienen sus ventajas y desventajas y dependen del contexto en que se utilicen. Proof of Work es más seguro, pero también más centralizado y consume mucha energía. Proof of Stake es más eficiente y descentralizado, pero menos seguro. En última instancia, la elección del algoritmo de consenso depende de las necesidades y objetivos específicos del proyecto.
