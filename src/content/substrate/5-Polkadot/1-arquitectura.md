---
title: Arquitectura de Polkadot
module: 5
draft: false
---

# 1. Arquitectura de Polkadot

Polkadot es una **multicadena** **heterogénea** con **seguridad compartida** e **interoperabilidad**.

## Relay chain y parachains

La relay chain es la cadena principal de Polkadot.
Es una blockchain construída con Substrate con mínima funcionalidad aparte de seguridad y el manejo de **parachains**.
Por ejemplo, no soporta smart contracts.
Todas las funcionalidades 

Las parachains son otras blockchains que se conectan a la relay chain.
Estas parachains son la forma de escalar de Polkadot, pueden haber cientos de ellas.
Son **heterogéneas**, lo que significa que cada una puede ser completamente distinta.
Algunas parachains pueden ser específicas para una aplicación en particular, otras concentrarse en aspectos como smart contracts, privacidad, escalabilidad, entre otros.
El único requisito es que cumplan con el protocolo de Polkadot para conectarse a la relay chain, que involucra generar una prueba que la relay chain pueda verificar para asegurarse que corran correctamente.

Como vimos en los módulos anteriores, Substrate puede ser usado para construír blockchains.
Originalmente fue creado para permitir la rápida creación de parachains.
Se desarrolló de una manera genérica tal que puede usarse para crear tanto solochains, cadenas no conectadas a una relay chain, como parachains.

Las parachains se registran en la relay chain ganando una subasta con DOT, el token nativo de Polkadot, y reservando su DOT por la duración de su operación, con un máximo de 2 años.
También existen las parathreads, que son iguales que las parachains en terminos de ejecución, pero su módelo económico es distinto.
Las parathreads pagan DOT por cada bloque que quieren, a demanda, esto las hace más accesibles.
Una parathread se puede volver una parachain y viceversa.

### Seguridad compartida

Todas las parachains conectadas a la relay chain de Polkadot comparten su seguridad.
La relay chain provee seguridad a todas sus parachains.

### Interoperabilidad

#### XCM

Polkadot empezó el estándar Cross-Consensus Messaging, o XCM, para comunicación entre sistemas de consenso, como blockchains o smart contracts.
Siguiendo la filosofía de Substrate, XCM es un estándar de comunicación agnóstico al sistema donde corre.
Es un formato que transmite intenciones de acciones usuales en sistemas de consenso, como transferir y reservar tokens, además de permitir representar acciones específicas.
Adoptar este formato permite expresar acciones que deseamos realizar en otro sistema, sin importar el protocolo de transporte que lleve esos mensajes al otro sistema.

#### XCMP y VMP

En Polkadot, existen varios protocolos de transporte que envían mensajes dentro de la red.
Dos de ellos son XCMP, Cross-Consensus Message Passing, que envía mensajes entre parachains y VMP, Vertical Message Passing, que envía mensajes entre parachains y la relay chain.

#### Puentes (Bridges)

Los puentes (bridges) son una conexión que permite transferir datos arbitrarios de una red a otra.
Estas redes son interoperables a través del puente, pero pueden existir como parachains o solochains o siguiendo cualquier otro protocolo.

## Actores

### Validadores

Los validadores son un conjunto de nodos que producen bloques en la relay chain.
Dado que Polkadot usa proof of stake, para ser un validador, hay que poner cierta cantidad de DOT en juego, stake.
Para ser elegidos para formar parte del conjunto, tienen que tener suficiente DOT.
Aceptan pruebas de los collators de las parachains y reciben recompensas por su trabajo.
Parte del DOT en juego puede ser quemado si actúan maliciosamente o si fallan en estar online, esto es llamado slashing.

### Nominadores

Ser un validador requiere correr un nodo y tener una buena infraestructura para minimizar slashing.
Los nominadores son cuentas que dan su DOT a un validador para ayudarlos a formar parte del conjunto de validadores.
Son recompensados con un porcentaje de las ganancias del validador que apoyaron.

### Collators

Los collators son nodos completos tanto en una parachain como en la relay chain.
Consiguen extrinsics de los otros nodos de su parachain y generan pruebas para los validadores de la relay chain.
Ellos son los que producen bloques de la parachain, los validadores de la relay chain solamente verifican su validez.

## System parachains

Existen parachains que proveen funcionalidades base de Polkadot, estas se conocen como **system parachains**.
En lugar de ganar una subasta o pagar por cada bloque, éstas son votadas por gobernanza.

## Kusama

Kusama es la red canario de Polkadot, esto significa que es una red donde las cosas se prueban antes de ir a Polkadot.
A diferencia de las testnets, o redes de prueba, Kusama tiene valor económico real.
El token nativo de Kusama es KSM.
