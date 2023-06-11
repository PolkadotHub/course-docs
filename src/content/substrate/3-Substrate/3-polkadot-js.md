---
title: Polkadot JS Apps
module: 3
draft: false
---

# 3. Polkadot JS Apps

Tener nuestro propio nodo local corriendo y produciendo bloques sin duda es bueno, pero solo ver los bloques en la terminal no es lo mejor.
Aquí entra en juego [Polkadot JS Apps](https://dotapps.io), una página web que nos permite trabajar con nuestro nodo local con una UI mucho más fácil.
No solo funciona para interactuar con nuestro nodo local, también funciona con todas las cadenas del ecosistema de Polkadot.
Por defecto se conecta a la relay chain de Polkadot, pero apretando en la esquina superior izquierda se abre un menú que deja conectarse a parachains de Polkadot, Kusama, testnets y nodos locales.

<div class="flex justify-center">
	<figure class="flex flex-col items-center max-w-5xl">
		<img src="/assets/polkadot-js-home.png">
		<figcaption>Inicio de PolkadotJS Apps</figcaption>
	</figure>
</div>

## Nodo local

Al elegir el nodo local en el menú, podemos interactuar con nuestro nodo.
En la pantalla principal, vemos los bloques que el nodo va produciendo, siempre y cuando esté corriendo.
También podemos ver los eventos más recientes que ocurrieron en la cadena.
Esto es muy útil para probar nuestras aplicaciones.

<div class="flex justify-center">
	<figure class="flex flex-col items-center max-w-5xl">
		<img src="/assets/polkadot-js-home-local.png">
		<figcaption>Nodo local</figcaption>
	</figure>
</div>

## Explorador de bloques

Apretando en el número de un bloque, nos lleva a la pantalla de detalle del mismo.
En esta pantalla podemos ver el hash del bloque, hash del bloque padre, hash del vector de extrinsics, hash del estado.
También podemos ver el vector de extrinsics, los eventos y logs.
Esto es útil si queremos investigar qué pasó en cada bloque particular.

<div class="flex justify-center">
	<figure class="flex flex-col items-center max-w-5xl">
		<img src="/assets/polkadot-js-block.png">
		<figcaption>Detalle de un bloque</figcaption>
	</figure>
</div>

## Algunas funcionalidades

Abriendo el menú de desarrollo, el titulado "Developer", podemos ver varias opciones.
Detallamos algunas:
- Chain state: Nos permite ver el estado de la chain consultando por ciertas claves del almacenamiento. También podemos ver constantes.
- Extrinsics: Nos permite llamar funciones de la chain para alterar su estado. Muy útil para interactuar con nuestras aplicaciones cuando estamos prototipando y no disponemos de un UI propio todavía.
- RPC calls: Nos permite hacer RPCs (Remote Procedure Calls), como aplicar un extrinsic a mano, ingresando su codificiación, o ver valores del estado por el hash de su clave.
- Javascript: Aquí podemos interactuar con la chain usando PolkadotJS, una biblioteca de javascript. Hay varios ejemplos para aprender, con cosas como suscribirse a los nuevos bloques de la cadena, nuevos eventos, o nuevas transferencias, entre otros. Pueden aprender más en su [documentación](https://polkadot.js.org/docs/).

En las páginas con estado, extrinsics y RPCs, va a haber un listado con todas las pallets del runtime de la cadena.
En FRAME, el estado se divide por pallet.

## Consultar estado

Si vamos a la parte de chain state, podemos consultar el _timestamp_ que es [la cantidad de milisegundos desde el 1 de enero de 1970](https://es.wikipedia.org/wiki/Tiempo_Unix).
Esto es en la pallet _system_, una pallet necesaria en cualquier runtime escrito en FRAME.
Podemos consultar el estado en cualquier bloque si damos su hash.
Podemos ir al detalle de un bloque, copiar su hash, y conseguir el tiempo en ese bloque.

Los invitamos a buscar una página online que convierta el timestamp en una fecha legible, o escribir un programa en Rust que lo haga.
Ayuda: investiguen la crate `chrono`, pueden agregarla con `cargo add chrono`.

Más interesante que el tiempo, podemos consultar los balances de las cuentas.
Cuando corremos el nodo local con la bandera `--dev`, carga varias cuentas para hacer pruebas.

En la parte de chain state nuevamente, en la pallet system, elegimos el estado _account_.
Ahí podemos consultar el estado de una cuenta, incluyendo sus fondos.
Todas las cuentas muestran un número muy grande en _free_, esto es porque no están en unidades, muestran todas las cifras después de la coma.
Cada cuenta tiene un millón y algo de tokens.

<div class="flex justify-center">
	<figure class="flex flex-col items-center max-w-5xl">
		<img src="/assets/polkadot-js-chain-state.png">
		<figcaption>Detalle de un bloque</figcaption>
	</figure>
</div>

## Alterar el estado

En la parte de extrinsics, bajo la pallet _balances_, elegimos el extrinsic `transfer(dest, value)`.
Con este extrinsic, podemos alterar el estado de la cadena, haciendo una transferencia de una cuenta a otra.
Hacemos una transferencia de ALICE a BOB de cualquier cantidad.

Luego podríamos volver a consultar el estado mediante chain state, pero hay una forma más facil.
En el menú superior, a la izquierda de network, hay una pestaña que dice _accounts_.
Ahí, vemos todas las cuentas con sus balances en millones de unidades.
Aquí podemos corroborar que los balances de ALICE y BOB cambiaron.
Si no transferimos suficiente, podemos hacer más transferencias hasta verlo.

<div class="flex justify-center">
	<figure class="flex flex-col items-center max-w-5xl">
		<img src="/assets/polkadot-js-accounts.png">
		<figcaption>Sección de cuentas</figcaption>
	</figure>
</div>

Podemos usar otro atajo de polkadot JS apps para transferir.
Pasando el mouse por encima de _accounts_, hay una opción, _transfer_, que permite hacer transferencias más facilmente.
Llamar extrinsics usando Polkadot JS Apps va a ser muy útil cuando querramos probar pallets, ajenas o desarrolladas por nosotros.
También es útil para interactuar con cualquier cadena del ecosistema de Polkadot que no tenga una mejor UI.
Polkadot JS Apps, por más que sea una buena herramienta, no provee la mejor UX (experiencia de usuario), por lo que no está pensada para ser la única manera para interactuar con una cadena.

Hay más funcionalidades que no hemos cubierto, los invitamos a explorar todo lo que ofrece esta herramienta.
