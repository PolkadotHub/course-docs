---
title: Ejecución
module: 3
draft: false
---

# 2. Ejecución

Para hacer aún más rápido el desarrollo, existe [substrate-node-template](https://github.com/substrate-developer-hub/substrate-node-template), una template de nodo de substrate con todo lo necesario para empezar una nueva blockchain.
Este nodo se puede compilar y correr localmente.
Viene con usuarios precargados ya con tokens para probar cosas e iterar más rápido.
Cone esta template, ya vamos a tener un nodo funcional produciendo bloques y aceptando transacciones.

## Primero, un pequeño fix <!-- TODO: Fix cuando cambie la versión -->

En `node/Cargo.toml`, tenemos que agregar la siguiente linea en la sección de dependencias:

```toml
tracing-core = "=0.1.26"
```

Esto arregla un problema en el que no se muestran todos los logs que deberían.

## Compilar el nodo de substrate

Para descargar la template de substrate primero clonamos el repo y entramos a la carpeta.
Abrimos la terminal y ponemos los siguiente comandos:

```bash
git clone https://github.com/substrate-developer-hub/substrate-node-template curso-substrate
cd curso-substrate
```

Para compilarla, ejecutamos el siguiente comando:

```bash
cargo build --release
```

Es importante que se compile en modo `release`.
Este perfil realiza optimizaciones para que el binario resultante sea lo más rápido posible.
Es necesario dado que los nodos tienen un tiempo máximo para ejecutar cada bloque.

Compilar la template, especialmente por primera vez, va a llevar un rato, debido a la cantidad de dependencias de substrate y las optimizaciones que realiza el perfil `release` (a diferencia de `debug`).

<div class="flex justify-center">
	<figure class="flex flex-col items-center">
		<img src="/assets/xkcd-compiling.png">
		<figcaption>"La excusa #1 para perder el tiempo: 'está compilando'". Fuente: <a href="https://xkcd.com/303/">XKCD</a></figcaption>
	</figure>
</div>

## Correr el nodo

`cargo build --release` compila el código del proyecto y guarda el binario en `./target/release/node-template`.
Para desarrollo, lo corremos con la bandera `--dev`.

Podemos correr el nodo de dos maneras:
```bash
./target/release/node-template --dev
```

o

```bash
cargo run --release -- --dev
```

Al correrlo, el nodo comienza a producir bloques y llegar a consenso, aunque solo, sobre el estado final.

## Parar el nodo

En cualquier momento se puede parar el nodo local con `Ctrl + c` en la terminal donde esté corriendo.

## Más de un nodo en la red

Vamos a agregar otro nodo validador a la red.
Podemos correr dos nodos locales, o correr uno en una computadora y otro en otra.
Para esto, tenemos que editar nuestro _chain-spec_.
Este archivo es una especificación que identifica nuestra blockchain.
Es usada por los nodos para saber que están conectados a la blockchain correcta.
Al correr el nodo local, usa un chain spec por defecto, vamos a cambiarlo para que reconozca nuevas cuentas generando bloques.

```bash
./target/release/node-template build-spec --disable-default-bootnode --chain local > miSpec.json
```

Este comando nos crea un spec custom, basado en la cadena "local", y lo guarda en un archivo `miSpec.json`.
En este archivo se especifican los valores del estado en el genesis de la cadena.
Esto incluye balances iniciales para las cuentas precargadas, el binario del runtime en WASM, y las autoridades de AURA y GRANDPA, entre otros.

Como vimos, las blockchains necesitan un algoritmo de consenso.
Por defecto, las cadenas hechas con Substrate usan PoS (Proof of Stake), pero es posible crear cadenas PoW (Proof of Work).
Substrate divide el consenso en dos etapas:
-	Producción de bloques: Aquí entra AURA
- Finalidad: Aquí entra GRANDPA

AURA es un protocolo de producción de bloques determinista, que se limita a una lista rotante de autoridades que toman turnos para producir, basado en su stake.
GRANDPA es un mecanismo de finalidad determinista, cuya especificación formal es mantenida por la web3 foundation.
Existen otros protocolos de producción y finalidad que pueden usarse.
También pueden crearse otros e integrarse facilmente.

Necesitamos crear autoridades para AURA y GRANDPA.
Podemos generar las claves usando los siguientes comandos.

Sr25519 (AURA):
```bash
./target/release/node-template key generate --scheme Sr25519 --password-interactive
```

El comando nos pide una contraseña para proteger nuestra clave.
No es necesario que sea segura para este tutorial, pero es vital para producción.
Va a generar la clave, la que nos interesa es la SS58, y una secuencia de palabras.
La secuencia de palabras la necesitamos para generar una clave de GRANDPA.

Ed25519 (GRANDPA):
```bash
./target/release/node-template key inspect --scheme Ed25519 --password-interactive <palabras>
```

Esto concluye la creación de un par de claves.
Vamos a necesitar otro par para el segundo miembro de la red, así que repetimos el mismo proceso.
Al final vamos a tener dos pares de claves como los siguientes:

- Primer par
	- Sr25519 (AURA): 5Ctans3VYyJpBpNccyfg9C3TR2cmGGvM4RWkrVoaqAD2YHi1
	- Ed25519 (GRANDPA): 5GayBXzWe2gUegiVdsn2UWv2nrDmmbH1J73rMuPgMo1TgoNV
- Segundo par
	- Sr25519 (AURA): 5DCZYrWcQSNB9FNUeoSJuNdK8ReEeTtarGfjUAdjLvWLadhE
	- Ed25519 (GRANDPA): 5G4L8Ww7zsjf4EnMCyyYHMtLHLai9k7EG3Aq83qtR1YN6A5a

Ahora que tenemos nuestras claves, editamos nuestro chain-spec, cambiando el nombre y agregando las autoridades.
Con las claves de ejemplo, se vería así:

```json
"name": "Curso Substrate",
...
"aura": {
  "authorities": [
    "5Ctans3VYyJpBpNccyfg9C3TR2cmGGvM4RWkrVoaqAD2YHi1",
    "5DCZYrWcQSNB9FNUeoSJuNdK8ReEeTtarGfjUAdjLvWLadhE"
  ]
},
"grandpa": {
  "authorities": [
    [
      "5GayBXzWe2gUegiVdsn2UWv2nrDmmbH1J73rMuPgMo1TgoNV",
      1
    ],
    [
      "5G4L8Ww7zsjf4EnMCyyYHMtLHLai9k7EG3Aq83qtR1YN6A5a",
      1
    ]
  ]
},
...
```

Esta técnica se puede usar para agregar cuantos validadores querramos.

Es necesario transformar este chain-spec al formato _raw_ (crudo):

```bash
./target/release/node-template build-spec --chain=miSpec.json \
	--raw --disable-default-bootnode > miSpecRaw.json
```

El formato _raw_ tiene la misma información que la especificación original, pero ya contiene las claves específicas que irán en la base de datos.
Es mejor distribuir el chain-spec usando este formato porque asegura que tengan las claves correctas en génesis.

Estamos en condiciones de correr dos nodos.
Abrimos dos terminales.
En una, corremos el primer nodo:

```bash
./target/release/node-template \
  --base-path /tmp/nodo01 \
  --chain ./miSpecRaw.json \
  --port 30333 \
  --ws-port 9945 \
  --rpc-port 9933 \
  --telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
  --validator \
  --rpc-methods Unsafe \
  --name MiNodo01 \
  --password-interactive
```

Este comando nos pide una contraseña para las claves, donde usamos la misma que para el primer par de claves.
Explicamos algunas de las banderas del comando:
- `--base-path` especifica una ubicación para la cadena asociada con el primer nodo.
- `--chain` especifica nuestro chain-spec.
- `--validator` especifica que este nodo es una autoridad de la cadena.
- `--rpc-methods Unsafe` permite hacer cosas que no se podrían en un ambiente de producción.
- `--name` da un nombre legible al nodo para la telemetría.

Paramos el nodo para agregar las claves, donde "\<palabras-clave-aura\>" y "\<palabras-clave-grandpa\>" significa que tenemos que agregar la secuencia de palabras de nuestra clave, entre comillas:

```bash
./target/release/node-template key insert --base-path /tmp/nodo01 \
  --chain miSpecRaw.json \
  --scheme Sr25519 \
  --suri <palabras-clave-aura> \
  --password-interactive \
  --key-type aura
```

```bash
./target/release/node-template key insert \
  --base-path /tmp/nodo01 \
  --chain miSpecRaw.json \
  --scheme Ed25519 \
  --suri <palabras-clave-grandpa> \
  --password-interactive \
  --key-type gran
```

Para corroborar que las claves hallan sido insertadas correctamente, podemos correr `ls /tmp/node01/chains/local_testnet/keystore` y corroborar que hayan dos resultados.

Ahora podemos correr el segundo nodo con:

```bash
./target/release/node-template \
  --base-path /tmp/nodo02 \
  --chain ./miSpecRaw.json \
  --port 30334 \
  --ws-port 9946 \
  --rpc-port 9934 \
  --telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
  --validator \
  --rpc-methods Unsafe \
  --name MiNodo02 \
  --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/<id-de-libp2p>\
  --password-interactive
```

El id de libp2p que va en la dirección del nodo al que nos queremos conectar, `bootnode`, lo podemos ver en los primeros logs que conseguimos al ejecutar el programa.
La linea dice "Local node identity is: <id>".
Insertamos las claves de la misma manera.

¡Tenemos una red local corriendo con dos validadores produciendo y finalizando bloques!
Lo mejor es que podemos distribuir nuestro chain-spec y binario para correr nodos distribuidos.
Usualmente se incluye el chain-spec en el binario de nuestra blockchain, así se necesita solo un archivo para formar parte.
