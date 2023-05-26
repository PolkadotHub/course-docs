---
title: Máquinas de Estado
module: 1
---

# Blockchain como Máquinas de Estado

Para comprender completamente cómo funcionan las blockchains, resulta esencial considerarlas como **máquinas de estado**. En términos generales, una máquina de estados es una abstracción matemática que representa un objeto que puede estar en uno de varios estados posibles. Esta descripción se ajusta perfectamente a una blockchain, donde el estado puede cambiar de acuerdo con las **transacciones procesadas**.

## Modelado de Máquina de Estados en Blockchains

Dentro del contexto de las blockchains, la máquina de estados representa una instantánea del **estado actual** de la cadena, o el estado resultante luego de ser procesada la ultima transacción. Este estado puede incluir diferentes tipos de información, como saldos de criptomonedas, datos de contratos inteligentes o información de gobernanza descentralizada.

Cada bloque en una blockchain contiene un conjunto de transacciones. Cuando una de estas transacciones se procesa, provoca un cambio en el estado de la blockchain. Este cambio se conoce como una **transición de estado**. Este proceso de transición es fundamental para el funcionamiento de cualquier blockchain.

## Transiciones de Estado y Validación de Transacciones

Una transacción válida desencadena una transición de estado, llevando la máquina de un estado a otro. Un ejemplo de esto es cuando un usuario A transfiere criptomonedas a un usuario B. Esta transacción dará lugar a un cambio en los saldos de ambas partes, lo que constituye una transición de estado.

Es importante subrayar que la **validez de estas transacciones** se verifica antes de realizar cualquier cambio de estado. Si una transacción resulta ser no válida, la transición de estado no se produce, y el estado actual de la blockchain permanece intacto.

## Máquinas de Estados en Múltiples Blockchains

Diversas blockchains implementan y manejan máquinas de estado de formas distintas, adaptándose a sus necesidades y objetivos específicos.

Por ejemplo, Polkadot implementa un modelo de máquina de estado a través del **Substrate Runtime**. En esta cadena, cada transacción afecta el estado global, que incluye información como los saldos de DOT y los datos de contratos inteligentes.

Por otro lado, Bitcoin también utiliza una máquina de estados, pero su implementación es mucho más simple en comparación con la de Polkadot. En Bitcoin, las únicas transiciones de estado son aquellas transacciones que cambian los saldos de Bitcoin de las direcciones.
