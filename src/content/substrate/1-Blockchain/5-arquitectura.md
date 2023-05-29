---
title: Arquitectura
module: 1
draft: false
---

# Arquitectura

La arquitectura de las **blockchains** puede ser bastante diversa, pero la mayoría de ellas siguen un modelo de diseño común. En términos generales, la arquitectura de una blockchain puede dividirse en **tres capas principales**:

1. **Capa de Red**: Esta capa es responsable de las operaciones de **red** dentro de la blockchain, tales como descubrir nodos y transmitir transacciones y mensajes relacionados con el **consenso** entre nodos individuales.

2. **Capa de Consenso**: Esta capa es donde se ejecuta el **algoritmo de consenso** entre los nodos individuales de una **red peer-to-peer**. Esencialmente, esta capa trabaja para asegurar que todos los nodos estén de acuerdo sobre el estado actual de la blockchain.

3. **Capa de Ejecución**: En esta capa se ejecuta una **máquina de estado** que define el **estado actual de la blockchain** y lo actualiza a través del procesamiento de **transacciones**.

**La Capa de Ejecución** es quizás una de las más críticas, ya que es donde la blockchain realmente procesa las transacciones y modifica su estado. En el caso de Bitcoin, por ejemplo, esta capa es responsable de verificar que las transacciones sean válidas (por ejemplo, que el remitente tenga suficientes fondos) y de actualizar los saldos de las cuentas correspondientes. En el caso de blockchains más complejas como Ethereum o Polkadot, la capa de ejecución también maneja la ejecución de contratos inteligentes.

Los **protocolos de blockchain** definen programas que mantienen un estado y describen cómo modificar el estado de acuerdo con las entradas recibidas, llamadas **transacciones**. El mecanismo de consenso garantiza que una blockchain tenga un **historial de transacciones canónico**. Las transacciones de blockchain deben ser deterministas, lo que significa que solo hay una interpretación correcta. El estado de la blockchain también es determinista. Si se comienza con el mismo estado de génesis y se replican todos los cambios, siempre se obtendrá el mismo estado.

# Blockchains Monolíticas

Las **blockchains monolíticas** son aquellas en las que las capas de **consenso** y de **ejecución** están fuertemente entrelazadas. Esto se traduce en sistemas que son eficientes y seguros pero que carecen de flexibilidad.

Un cambio en una de las capas generalmente requiere un cambio en las demás. Esto se debe a la naturaleza interconectada de las capas en este tipo de arquitectura. Los cambios son a menudo difíciles de implementar debido a la naturaleza descentralizada de las blockchains.

**Bitcoin** es un ejemplo clásico de blockchain monolítica. Todos los aspectos de su funcionamiento están codificados en su protocolo de consenso. Cualquier cambio, por lo tanto, requiere un amplio consenso de la red.

# Blockchains Modulares

Las **blockchains modulares**, por otro lado, son una evolución de las blockchains monolíticas. Estas separan las capas de consenso y ejecución en componentes distintos. Esta separación proporciona una gran flexibilidad y permite que cada capa se desarrolle y evolucione de forma independiente.

La arquitectura modular facilita la adaptación y la evolución de la blockchain en respuesta a las nuevas necesidades y tecnologías. **Polkadot** es un ejemplo de blockchain modular. En Polkadot, Substrate permite a los desarrolladores personalizar y optimizar su propia blockchain, pero a la vez, se acoplan al consenso de Polkadot.
