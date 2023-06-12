---
title: Código
module: 3
draft: false
---

# 4. Código

Ahora que sabemos qué es substrate, cómo correr nuestro propio nodo y cómo interactuar con él, es hora de entrar en el código.

En la template que descargamos, las carpetas más importantes son las siguientes:
- node: Contiene el código del cliente, incluyendo la interfaz de linea de comandos, el servidor de rpc, la especificación de la cadena a la que pertenece, entre otros.
- pallets: Las pallets de FRAME que creemos nosotros. Esta carpeta por ahora tiene solo una llamada `template`, aquí nos enfocaremos en el siguiente módulo.
- runtime: El runtime de FRAME de la cadena que estamos construyendo. Contiene un archivo `lib.rs` donde se integran todas las pallets de terceros, y las que implementamos nosotros bajo `pallets`.

Nos centraremos en `pallets` y `runtime`, `runtime` en este módulo y `pallets` en el siguiente.

## Runtime

En `runtime/src/lib.rs` es donde se integran todas las pallets de FRAME para formar el runtime de nuestra blockchain.

### VERSION

La versión del runtime se representa en la constante `VERSION`, anotada con `#[sp_version::runtime_version]`.

```rust
#[sp_version::runtime_version]
pub const VERSION: RuntimeVersion = RuntimeVersion {
  spec_name: create_runtime_str!("node-template"),
  impl_name: create_runtime_str!("node-template"),
  authoring_version: 1,
  // The version of the runtime specification. A full node will not attempt to use its native
  //   runtime in substitute for the on-chain Wasm runtime unless all of `spec_name`,
  //   `spec_version`, and `authoring_version` are the same between Wasm and native.
  // This value is set to 100 to notify Polkadot-JS App (https://polkadot.js.org/apps) to use
  //   the compatible custom types.
  spec_version: 100,
  impl_version: 1,
  apis: RUNTIME_API_VERSIONS,
  transaction_version: 1,
  state_version: 1,
};
```

Es importante aumentar el `spec_version` cuando se actualicé el runtime.

### Configuración de las pallets

Todas las pallets exponen un trait `Config` que debe ser implementado por el struct del runtime para integrarla.
En este trait se definen tipos asociados para distintos elementos de configuración, por ejemplo constantes o incluso otras pallets.
Aquí vemos un ejemplo de la configuración de pallet-balances, una pallet para manejar un token nativo, incluído en la template:

```rust
impl pallet_balances::Config for Runtime {
	type MaxLocks = ConstU32<50>;
	type MaxReserves = ();
	type ReserveIdentifier = [u8; 8];
	type Balance = Balance; // El tipo del balance (generalmente u128 o uno de los tipos de enteros)
	type Event = Event;
	type DustRemoval = ();
	type ExistentialDeposit = ConstU128<500>;
	type AccountStore = System;
	type WeightInfo = pallet_balances::weights::SubstrateWeight<Runtime>;
}
```

Para aprender más de cada elemento de configuración, podemos ver la [documentación de pallet-balances](https://docs.rs/pallet-balances/latest/pallet_balances/index.html).

### parameter_types

Como vimos, los elementos de configuración son tipos.
Por eso vimos tipos genéricos como `ConstU32<T>` y `ConstU128<T>`, que permiten llevar enteros a tipos que podemos usar en la configuración.
Esto se logra implementando el trait `Get`, definido de la siguiente manera, en `bounded-collections`:

```rust
pub trait Get<T> {
	fn get() -> T;
}
```

Con este método `get`, es posible conseguir el valor asociado al tipo.
Podemos manualmente implementar este trait para cualquier tipo, para dar mejor nombres o usar constantes que no sean enteros en nuestra configuración.

Implementar este trait para cada tipo puede resultar tedioso.
Por esto, existe un macro `parameter_types`, también definido en `bounded-collections`.
Este macro implementa el trait para cada sentencia dentro de la llamada.

```rust
parameter_types! {
	pub const BlockHashCount: BlockNumber = 2400;
	pub const Version: RuntimeVersion = VERSION;
	/// We allow for 2 seconds of compute with a 6 second average block time.
	pub BlockWeights: frame_system::limits::BlockWeights =
		frame_system::limits::BlockWeights::with_sensible_defaults(
			Weight::from_parts(2u64 * WEIGHT_REF_TIME_PER_SECOND, u64::MAX),
			NORMAL_DISPATCH_RATIO,
		);
	pub BlockLength: frame_system::limits::BlockLength = frame_system::limits::BlockLength
		::max_with_normal_ratio(5 * 1024 * 1024, NORMAL_DISPATCH_RATIO);
	pub const SS58Prefix: u8 = 42;
}
```

Esto crea tipos capaces de ser usados como tipos asociados en la configuración de una pallet.
Este macro nos deja usar sintaxis que no se permite en Rust, como `pub BlockWeights` para ya declarar un tipo.
Esto se puede porque luego de la expansión se convierte en código Rust válido.

### Integrando las pallets: construct_runtime

El macro `construct_runtime` incorpora todas las pallets en un runtime.

```rust
construct_runtime!(
	pub struct Runtime
	where
		Block = Block,
		NodeBlock = opaque::Block,
		UncheckedExtrinsic = UncheckedExtrinsic,
	{
		System: frame_system,
		Timestamp: pallet_timestamp,
		Aura: pallet_aura,
		Grandpa: pallet_grandpa,
		Balances: pallet_balances,
		TransactionPayment: pallet_transaction_payment,
		Sudo: pallet_sudo,
		// Include the custom logic from the pallet-template in the runtime.
		TemplateModule: pallet_template,
	}
);
```

Dentro del bloque, tenemos cada pallet de nuestro runtime en una linea diferente.
Para cada una, le damos un nombre, el que está en PascalCase.
En este caso, la pallet balances se llama `Balances`, podemos usar este nombre para acceder a funciones de esta en nuestro código.
Por ejemplo, `Balances::free_balance()` o `Balances::transfer()`.

Este macro crea un tipo `Runtime`.
Es este tipo el que debe implementar todos los traits `Config` de las pallets.

## Pallets

En la carpeta `pallets` vamos a tener todas las pallets que desarrollemos nosotros.
La template incluye una pallet de ejemplo, llamada `pallet-template`.
Nos enfocaremos en la estructura de una pallet en el siguiente módulo, cuando desarrollemos una.
