---
title: Testnet
module: 5
draft: false
---

# 4. Testnet

Un paso más en el proceso de desarrollo de una parachain es probar en una testnet pública, como [Rococo](https://substrate.io/developers/rococo-network/).
Si vamos a [Polkadot JS Apps](rococo.dotapps.io), en la sección de "Network -> Parachains" vemos muchos ambientes de prueba para parachains de Polkadot.

Vamos a ver los pasos necesarios para lanzar una parachain en Rococo, sin embargo, para realmente abrir una, necesitamos llenar un formulario y recibir autorización de Parity.
En el futuro, se planea que las parachains en Rococo se puedan lanzar mediante gobernanza.

## Cuenta y tokens

Para realizar cualquier acción en Rococo, necesitamos ROC, su token nativo.
Para guardar estos tokens, necesitamos una wallet compatible con substrate.
No es aconsejable usar claves de desarrollo en cualquier ambiente público.

Hay muchas opciones para guardar tokens, pero para nuestros propósitos, podemos usar la extensión de Polkadot JS.
Para ambientes no de prueba, vamos a querer usar wallets, de las cuales hay muchas para elegir, como [Talisman](https://www.talisman.xyz/wallet) o [Nova](https://novawallet.io/), entre otras.

Una vez que hayamos descargado la extensión para nuestro navegador, [Firefox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/) o [Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd), necesitamos crear una cuenta.
Al crear la cuenta en la extensión, anotamos la frase semilla (seedphrase) generada, esta frase nos permitirá recuperar nuestra cuenta en el futuro si la borramos de la extensión.
Al entrar a Polkadot JS Apps, tenemos que darle permiso a nuestro extensión para que nos permita usar nuestra cuenta en la página.

Para conseguir ROC, para esto, usaremos un **faucet**.
Un faucet es una aplicación donde podemos ir a cargar nuestra cuenta con tokens de la testnet, suele existir en las testnets públicas.
En el caso de Rococo, existe [un faucet web](https://paritytech.github.io/polkadot-testnet-faucet/) que podemos usar para conseguir ROC.

<div class="flex justify-center">
	<figure class="flex flex-col items-center max-w-5xl">
		<img src="/assets/rococo-faucet.png">
		<figcaption>Faucet de Rococo</figcaption>
	</figure>
</div>

<div class="flex justify-center">
	<figure class="flex flex-col items-center max-w-5xl">
		<img src="/assets/rococo-faucet-success.png">
		<figcaption>Conseguimos ROC en nuestra cuenta</figcaption>
	</figure>
</div>

## Reservar ParaId

Ahora podemos reservar nuestro `ParaId`.
En [Polkadot JS Apps](rococo.dotapps.io), bajo "Network -> Parachains", en la pestaña de "Parathreads", podemos registrar nuestro `ParaId`.
Al confirmar, la extensión nos va a pedir que firmemos la transacción, escribiendo nuestra contraseña.
Luego de confirmada, corroboramos que tenemos nuestro `ParaId` viendo los eventos de la cadena.

## Modificar el spec

Como vimos antes, tenemos que modificar el spec de nuestro collator para incluír el `ParaId` que registramos.
En este caso, la `relay_chain` cambia de `rococo-local` a `rococo`, dado que queremos conectarnos a la testnet pública.
Editamos nuestro archivo `parachainSpec.json` para cambiar esas lineas:

```json
...
"relay_chain": "rococo",
"para_id": <para-id>,
...
"parachainInfo": {
  "parachainId": <para-id>,
  ...
},
...
```

Agregamos la clave pública de nuestra cuenta a la sección de "session -> keys".

```json
...
"session": {
  "keys": [
    ...
    [
      "5CfrJf9mCYuBmdsrizTkjiQi85SQvgNAWFc14gaLdoUbMZPK",
      "5CfrJf9mCYuBmdsrizTkjiQi85SQvgNAWFc14gaLdoUbMZPK",
      {
        "aura": "5CfrJf9mCYuBmdsrizTkjiQi85SQvgNAWFc14gaLdoUbMZPK"
      }
    ]
  ]
},
...
```

Luego generamos la raw spec a partir de nuestra spec modificada.

```bash
./target/release/parachain-template-node build-spec --chain parachainSpec.json \
  --disable-default-bootnodes --raw > rawParachainSpec.json
```

## Exportar archivos requeridos

Como ya vimos, tenemos que registrar el runtime y el estado génesis en nuestra relay chain, así que tenemos que exportarlos.

```bash
./target/release/parachain-template-node export-genesis-wasm --chain rawParachainSpec.json para-wasm
```

```bash
./target/release/parachain-template-node export-genesis-state --chain rawParachainSpec.json para-genesis-state
```

## Correr el collator

Ahora podemos correr el collator.

```bash
./target/release/parachain-template-node \
  --collator \
  --chain rawParachainSpec.json \
  --base-path /tmp/parachain/tutorial \
  --port 50333 \
  --ws-port 8855 \
  -- \
  --execution wasm \
  --chain rococo \
  --port 50343 \
  --ws-port 9988
```

## Registrar como parathread

Antes de poder ser una parachain, tenemos que registrarnos como parathread.
Podemos hacer esto en la misma pantalla de parathreads en la que registramos nuestro `ParaId`.
Apretamos en el botón `ParaThread`.

Si bajamos en la página, vemos que nuestra parathread está "Onboarding", toma dos sesiones para quedar efectiva.
Podemos ver el tiempo que falta ahí mismo.

Una vez que nuestra parathread está operativa, podemos pasar a una parachain [abriendo una petición](https://github.com/paritytech/subport/issues/new?assignees=&labels=Rococo&template=rococo.yaml).
Si queremos desarrollar una parachain, este camino es una buena opción para probar antes de lanzar en una red en producción como Kusama o Polkadot.

En este momento, el modelo de pagos a demanda, pay-as-you-go, de las parathreads no está implementado, lo que significa que solo podemos realizar acciones si tenemos una parachain.
