---
title: Agregando pallets
module: 3
draft: false
---

# 6. Agregando pallets

FRAME permite reutilizar pallets.
Hay varias pallets que uno puede agregar a su blockchain para ya tener las funcionalidades que desea, incluso sin tener que crear sus propias pallets específicas.
En este capítulo, añadiremos una pallet extra a nuestra blockchain, `pallet-nicks`.

## Nicks

Nicks es una pallet de ejemplo que permite la funcionalidad de asociar nombres, o nicks, a cuentas on-chain, no está pensada para ser usada en producción sin realizar ajustes.
Para nuestro propósito funciona perfecto.
Los tres extrinsics que provee esta pallet son:
- `set_name`: Asocia un nombre a una cuenta, se reserva un pequeño depósito; falla si ese nombre ya está tomado.
- `clear_name`: Remueve el nombre asociado con una cuenta; el depósito se devuelve.
- `kill_name`: Forzosamente remueve el nombre asociado; el depósito se pierde.

## Dependencias

Para agregar la nueva pallet a nuestro runtime, debemos primero agregarla a las dependencias de nuestro proyecto, especificadas en `Cargo.toml`.
En `runtime/Cargo.toml`, bajo la sección de `[dependencies]`, agregamos la siguiente linea:

```toml
pallet-nicks = {
  version = "4.0.0-dev",
  default-features = false,
  git = "https://github.com/paritytech/substrate.git",
  branch = "polkadot-v0.9.26"
}
```

Luego, agregamos la feature `std` de la nueva pallet a la lista de features que se activan solo cuando la crate actual se usa con `std`:

```toml
[features]
default = ["std"]
std = [
  ...
  "pallet-nicks/std",
]
```

Las crates en Rust pueden compilarse habilitando features opcionales.
Las crates de Substrate definen una feature `std`, que las hace usar o no la biblioteca estándar de Rust.
La biblioteca estándar se puede usar en un ambiente nativo, por ejemplo, corriendo en una computadora, pero no corriendo en WASM.

Existe esta feature porque hay un runtime nativo en Substrate, que antes se usaba debido a demoras en el tiempo de ejecución del WASM.
Ahora ya no se usa tanto debido a mejoras en la eficiencia de ambientes de ejecución de WASM.

`cargo build --release` descarga y compila la nueva dependencia.

## Implementar configuración

Debemos implementar el trait `Config` para integrar la nueva pallet a nuestro runtime.
En este caso, `pallet-nicks` tiene pocos elementos de configuración.
Agregamos la siguiente implementación en `runtime/src/lib.rs`.

```rust
parameter_types! {
  pub const DepositoCreacionNick: Balance = 100;
  pub const LargoMinimo: u32 = 4;
  pub const LargoMaximo: u32 = 20;
}

impl pallet_nicks::Config for Runtime {
  type RuntimeEvent = RuntimeEvent;
  type Currency = Balances;
  type ReservationFee = DepositoCreacionNick;
  type Slashed = (); // Implementación por defecto
  type ForceOrigin = EnsureRoot;
  type MinLength = LargoMinimo;
  type MaxLength = LargoMaximo;
}
```

## Integrar al runtime

Una vez que el runtime implementa la configuración de la pallet, la agregamos a la lista de pallets en `construct_runtime`.

```rust
construct_runtime!(
	pub struct Runtime
	where
		Block = Block,
		NodeBlock = opaque::Block,
		UncheckedExtrinsic = UncheckedExtrinsic,
	{
    System: frame_system,
    ...
    Nicks: pallet_nicks, // <- Aquí
	}
);
```

## Probar las nuevas funcionalidades

Ahora que tenemos una nueva pallet en nuestro runtime, podemos interactuar con ella, llamar sus extrinsics y consultar su estado.
En Polkadot JS Apps, en la parte de extrinsics, deberíamos ver la nueva pallet nicks.
Aquí podemos asociar un nombre con una cuenta y remover esa asociación.
Las operaciones siempre se hacen sobre la cuenta que firma el extrinsic.
