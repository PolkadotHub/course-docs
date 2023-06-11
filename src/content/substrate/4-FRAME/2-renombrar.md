---
title: Renombrar pallet
module: 4
---

# 2. Renombrar pallet

Vamos a usar el esqueleto en pallet-template para desarrollar nuestra pallet para jugar piedra, papel o tijera.
Antes que nada, vamos a renombrarla.
Hay varias partes del código donde debemos cambiar el nombre.

Primero renombramos la carpeta `pallets/template` a algo como `pallets/piedra-papel-tijera`:

```bash
mv pallets/template pallets/piedra-papel-tijera
```

Luego debemos cambiar el nombre en `Cargo.toml` en la raíz del directorio:

```toml
[workspace]
members = [
	"node",
	"pallets/piedra-papel-tijera", # <- Cambiamos aquí
	"runtime",
]
```

Este archivo define un [workspace](https://doc.rust-lang.org/stable/book/ch14-03-cargo-workspaces.html) de Rust, el cual nos permite trabajar con todas estas crates en un mismo lugar de manera sencilla.
Podemos compilar todas las crates con `cargo build`, o elegir cual compilar con `cargo build -p node`, por ejemplo.

Luego cambiamos el nombre en `pallets/piedra-papel-tijera/Cargo.toml`:

```toml
[package]
name = "pallet-piedra-papel-tijera" # <- Cambiamos aquí
version = "4.0.0-dev"
# Podemos cambiar más cosas como la descripción, autores, etc
...
```

Después cambiamos la dependencia del runtime a nuestra nueva pallet en `runtime/Cargo.toml`:

```toml
[dependencies]
...
# Local dependencies
pallet-piedra-tijera = {
	version = "4.0.0-dev",
	default-features = false,
	path = "../pallets/piedra-papel-tijera"
} # <- Cambiamos aquí, antes era `pallets/template`
...
[features]
std = [
	...
	"pallet-piedra-papel-tijera/std",
	...
]
runtime-benchmarks = [
	...
	"pallet-piedra-papel-tijera/runtime-benchmarks",
	...
]
try-runtime = [
	...
	"pallet-piedra-papel-tijera/try-runtime",
	...
]
```

También hay cambios que hacer en `runtime/src/lib.rs`:

```rust
impl pallet_piedra_papel_tijera::Config for Runtime { // <- Cambio aquí
	type Event = Event;
}

construct_runtime!(
	pub enum Runtime where
		Block = Block,
		NodeBlock = opaque::Block,
		UncheckedExtrinsic = UncheckedExtrinsic
	{
		System: frame_system,
		RandomnessCollectiveFlip: pallet_randomness_collective_flip,
		Timestamp: pallet_timestamp,
		Aura: pallet_aura,
		Grandpa: pallet_grandpa,
		Balances: pallet_balances,
		TransactionPayment: pallet_transaction_payment,
		Sudo: pallet_sudo,
		PiedraPapelTijera: pallet_piedra_papel_tijera, // <- Y aquí
	}
);
```

Con estos cambios, ya podemos correr `cargo check` y ver que todo esté bien.
