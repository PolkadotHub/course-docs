---
title: Forkless upgrades
module: 3
draft: false
---

# 5. Forkless upgrades

Como vimos en el capítulo de la arquitectura de substrate, el runtime es un binario de WASM que se almacena en el estado de la cadena.
Esto permite actualizar la cadena mientras está corriendo tan solo llamando un extrinsic.
En este capítulo, vamos a actualizar nuestro runtime mientras nuestro nodo local está corriendo.
Para eso, usaremos Polkadot JS Apps.

## Cambio en nuestro runtime

Debemos tener un nodo local corriendo.
El cambio simple que haremos en el runtime es el cambio de una constante.
Cambiemos `ExistentialDeposit` de pallet-balances.
Este valor representa la mínima cantidad de tokens que debe tener una cuenta para no ser eliminada.

```rust
impl pallet_balances::Config for Runtime {
  ...
  type ExistentialDeposit = ConstU128<500>; // <- Cambiemoslo por cualquier otro valor, por ejemplo, 1000
  ...
}
```

También tenemos que incrementar la versión del runtime:

```rust
#[sp_version::runtime_version]
pub const VERSION: RuntimeVersion = RuntimeVersion {
  ...
  spec_version: 100, // <- Cambiemoslo por 101
  ...
}
```

## Generación del nuevo WASM

Para actualizar el runtime, necesitamos un nuevo WASM.
Para generar este nuevo WASM con los cambios, necesitamos recompilar la template:

```bash
cargo build --release
```

Vamos a tener que abrir una nueva terminal para correr este comando, dado que queremos que el nodo esté corriendo.

## Actualización del runtime

Típicamente, cambios del runtime se hacen mediante governanza, donde todos deben votar si aceptan o no la actualización.
En este caso, vamos a usar la pallet-sudo, incluída en la template, para forzar el cambio.
El extrinsic que debemos usar es `set_code`, incluído en la system pallet.

Vamos a Polkadot JS Apps, a la parte de extrinsics, ahí elegimos la pallet sudo y el extrinsic `sudoUncheckedWeight`.
Esto nos abre otro input para elegir otro extrinsics, aquí elegimos `setCode`.
Debido a que este extrinsic toma bytes, permite subir un archivo.
Subimos el archivo `target/release/wbuild/node-template-runtime/node_template_runtime.compact.compressed.wasm` que fue generado al compilar.

<div class="flex justify-center">
	<figure class="flex flex-col items-center max-w-5xl">
		<img src="/assets/polkadot-js-runtime-upgrade.png">
		<figcaption>Actualización del runtime</figcaption>
	</figure>
</div>

Corroboramos que la versión se actualizó viendo el número de versión de la cadena en la esquina superior izquierda.
Donde antes decía "node-template/100" ahora debe decir "node-template/101".
Ahora podemos revisar el valor de la constante `ExistentialDeposit` en Polkadot JS Apps y ver que tiene el nuevo valor.
