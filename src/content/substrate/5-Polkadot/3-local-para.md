---
title: Parachain local
module: 5
draft: false
---

# 3. Parachain local

Ahora vamos a compilar y correr una parachain local.

Igual que la [substrate-node-template](https://github.com/substrate-developer-hub/substrate-node-template), existe una template para parachains, [substrate-parachain-template](https://github.com/substrate-developer-hub/substrate-parachain-template).
No podemos usar la template de Substrate, porque necesitamos la lógica extra de generar la prueba para los validadores de la relay chain.
Esta template también tiene un nodo de la relay chain embebido.

Vamos a descargarla:

```bash
git clone --depth 1 https://github.com/substrate-developer-hub/substrate-parachain-template.git
```

Es importante que sea la misma versión que la relay chain local.
Para eso, nos movemos a un tag con la versión que queremos, por ejemplo:

```bash
git tag # Para ver las versiones
git checkout polkadot-v0.9.37
git switch -c mi-branch # Para hacer todos nuestro cambios en una branch local con esa versión
```

Ahora podemos compilarla:

```bash
cargo build --release
```

Como siempre, puede demorar bastante.

## Reservar un identificador único

Cada parachain debe reservar un identificador único, su `ParaId`, con la relay chain a la que quiere conectarse.
Cada relay chain mantiene sus propios identificadores.
Para reservar un `ParaId`, se necesita una cierta cantidad de fondos.
Para saber la cantidad, podemos ver la constante `ParaDeposit` de la pallet `paras_registrar` de la relay chain, asumiendo que usan FRAME.
Por ejemplo, Rococo, la testnet pública de Polkadot, requiere 5 ROC para reservar un identificador.

Para reservar un `ParaId`, podemos usar Polkadot JS Apps:
1. Corroboramos que estemos corriendo un validador de nuestra relay chain local
2. Abrimos Polkadot JS Apps y nos conectamos a nuestro validador
3. Bajo Network -> Parachains, apretamos el botón con etiqueta `ParaId`
4. Después de confirmar, corroboramos que haya un evento de éxito en reservar nuestro id

## Modificar el spec

Creamos el chain spec para luego modificarlo:

```bash
./target/release/parachain-template-node build-spec --disable-default-bootnode > parachainSpec.json
```

Abrimos el archivo y ponemos nuestro identificador en el campo `para_id` y en `parachainId` dentro de `parachainInfo`.
Para no conectarnos con los nodos de otra persona que esté haciendo el mismo tutorial en nuestra red local, tenemos que hacer que nuestro `protocolId` sea distinto, agregando un par de caracteres es suficiente.

Como ya sabemos, tenemos que convertir nuestro spec a raw antes de usarlo:

```bash
./target/release/parachain-template-node build-spec --chain parachainSpec.json \
  --disable-default-bootnode --raw > rawParachainSpec.json
```

## Preparar el collator

Ahora debemos preparar nuestro collator.

La relay chain necesita el WASM del runtime de nuestra parachain para poder validar sus bloques, así que lo exportamos:

```bash
./target/release/parachain-template-node export-genesis-wasm --chain rawParachainSpec.json para-wasm
```

Además del código del runtime, la relay chain también necesita el estado inicial, en genesis, de la base de datos.
Lo exportamos con el siguiente comando:

```bash
./target/release/parachain-template-node export-genesis-state --chain rawParachainSpec.json para-genesis-state
```

Este runtime y estado son para el bloque **genesis**.
Todas las parachains tienen que empezar desde el bloque 0 con su relay chain.
Para convertir una solochain en una parachain, se convierte la lógica pero no su estado.

Para correr nuestro collator, usamos el siguiente comando:

```bash
./target/release/parachain-template-node \
--alice \
--collator \
--force-authoring \
--chain rawParachainSpec.json \
--base-path /tmp/parachain/alice \
--port 40333 \
--ws-port 8844 \
-- \
--execution wasm \
--chain ../polkadot/rawRelaySpec.json \
--port 30343 \
--ws-port 9977
```

Los argumentos antes del `--` son para el collator y los que vienen después son para el nodo de la relay chain embebido en el collator.
Usamos tanto el spec de la parachain como de la relay chain a la que nos queremos conectar.
El collator va a empezar a generar bloques cuando lo registremos a la relay chain.

## Registrar con la relay chain

Registrar una parachain en una red pública en producción usualmente requiere una subasta.
En nuestro caso, vamos a usar **sudo** para evitar ese paso.

Nos conectamos al nodo de la relay chain local usando Polkadot JS Apps.
Elegimos `Sudo` en el menú de desarrollo.
Elegimos la pallet `paraSudoWrapper` y `sudoScheduleParaInitialize(id, genesis)` para inicializar el `ParaId` que registramos.
El parámetro `id` es el `ParaId`.
`genesisHead` es el estado en génesis, subimos nuestro archivo `para-genesis-state`.
`validationCode` es el WASM del runtime, subimos nuestro archivo `para-wasm`.
`parachain` elegimos `yes`.
Firmamos la transacción y vemos que fue exitosa en los eventos.

Ahora si vamos a la sección "Network -> Parachains", vemos nuestra parachain.
El proceso de inicialización demora 1 [epoch](https://wiki.polkadot.network/docs/glossary#epoch), un período de tiempo utilizado por BABE, el algoritmo de producción de bloques.

## Siguientes pasos

Ahora que tenemos una parachain corriendo localmente, podemos ponerle la pallet que desarrollamos en el módulo anterior.
No hay necesidad de escribir nada de cero, solo hay que copiar y pegar la pallet que ya tenemos.
Luego podemos actualizar el runtime como aprendimos en módulos anteriores para efectuar el cambio.
Queda como ejercicio.

Esto es un camino que muchos equipos que construyen en Polkadot siguen.
Primero reservan la parachain, en su caso ganando una subasta, en lugar de usar sudo, y después la actualizan para añadirle su funcionalidad.

## Otras herramientas

Hicimos el ejercicio de correr una relay chain y una parachain localmente "a mano".
Existen herramientas que nos permiten facilitar este proceso, como ser [zombienet](https://github.com/paritytech/zombienet), que crea una red de prueba usando contenedores, creados por kubernetes o podman.
También existe [chopsticks](https://github.com/AcalaNetwork/chopsticks/tree/master), una herramienta creada por Acala que también crea una red de prueba, haciendo uso de [smoldot](https://github.com/paritytech/smoldot).
