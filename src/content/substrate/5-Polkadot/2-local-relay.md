---
title: Relay chain local
module: 5
draft: false
---

# 2. Relay chain local

En módulos anteriores, vimos como correr un nodo de Substrate local.
Ahora, vamos a correr una relay chain localmente.
Crear una red parecida al ambiente de producción es una buena practica para hacer pruebas y asegurarnos que todo funcione correctamente.
Veremos más formas de probar en ambientes de prueba, con herramientas específicas y testnets públicas.

El proceso de registrar una parachain nos va a ayudar a entender la arquitectura de Polkadot.

## Nodo

En el [repositorio de Polkadot](https://github.com/paritytech/polkadot/) tenemos todo lo que necesitamos para construir nuestra relay chain local.
Primero clonamos el repo:

```bash
git clone --branch release-v0.9.37 https://github.com/paritytech/polkadot.git
```

Las parachains tienen que tener la misma versión que su relay chain, si no, es posible que dejen de producir bloques.
Por esto, es importante decidir en una versión para nuestra relay chain local, que debe ser la misma para nuestras parachains.
En este caso usamos la `0.9.37`.

Compilamos:

```bash
cargo build --release
```

Demora bastante.

## Chain spec

Al igual que antes, necesitamos un spec para nuestra cadena.

Podemos descargar un spec ejemplo en [texto plano](https://docs.substrate.io/assets/tutorials/relay-chain-specs/plain-local-chainspec.json/) o [raw](https://docs.substrate.io/assets/tutorials/relay-chain-specs/raw-local-chainspec.json/).

Este spec es válido para una sola parachain con dos nodos validadores de la relay chain.
Siempre tiene que haber por lo menos 1 validor más que la cantidad de collators.
Recordemos que los collators son los que producen bloques de una parachain y los validadores deben verificar esto.

## Correr el nodo

Para correr con Alice:

```bash
./target/release/polkadot \
  --alice \
  --validator \
  --base-path /tmp/relay/alice \
  --chain /tmp/rawRelaySpec.json \
  --port 30333 \
  --ws-port 9944
```

Aquí guardamos la versión raw del spec en `/tmp/rawRelaySpec.json`, pero podríamos haberlo guardado en cualquier lado.
El comando también asigna los valores por defecto al puerto, `port`, y al puerto de WebSocket, `ws-port`.
Podemos ver en los logs el identificador local de libp2p.
Este identificador se usa para que otros nodos puedan conectarse al nuestro.

En una nueva terminal podemos correr al validador Bob:

```bash
./target/release/polkadot \
  --bob \
  --validator \
  --base-path /tmp/relay-bob \
  --chain /tmp/rawRelaySpec.json \
  --port 30334 \
  --ws-port 9945
```

Este comando usa un path distinto para guardar los datos, `/tmp/relay-bob`, una clave de validador distinta, `--bob`, y puertos distintos.

Al correr los dos nodos en la misma máquina, no hay que especificar la opción `--bootnodes`.
