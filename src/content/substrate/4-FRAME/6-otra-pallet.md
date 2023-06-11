---
title: Agregar otra pallet
module: 4
---

# 6. Agregar otra pallet

Nuestra pallet ya funciona, el juego es jugable, pero aún hay otra cosa importante por aprender.
Veamos cómo podemos interactuar con una pallet desde otra.
Vamos a agregar apuestas a nuestra aplicación.
Configuramos una cantidad que cada jugador debe apostar al registrarse.
Al terminar el juego, el ganador recibe ambas apuestas.
Si es un empate, ambos jugadores recuperan su apuesta.
Para esto, vamos a acoplar nuestra pallet con `pallet-balances`.

## Acoplamiento tight vs loose

Hay dos maneras de acoplar otra pallet con la nuestra.
Ambas involucran cambiar el trait `Config`.

### Tight

Acoplar las dos pallets tight implica que nuestra pallet solo puede ser usada en un runtime si ese runtime usa pallet-balances.
Esto se logra agregando una nueva restricción al trait `Config`.

```rust
#[pallet::config]
pub trait Config: frame_system::Config + pallet_balances::Config { // <- Aquí agregamos pallet_balances
	type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
}
```

Para esto, tenemos que agregar `pallet-balances` a las dependencias de nuestra pallet en su `Cargo.toml`.
Podemos simplemente copiarla del `Cargo.toml` del runtime.
Es importante acordarnos de hacer los cambios correspondientes en la sección de features.

Luego de hacer este cambio, vamos a tener un error a la hora de correr los tests.

<div class="flex justify-center">
	<figure class="flex flex-col items-center max-w-5xl">
		<img src="/assets/tight-coupling-error.png">
		<figcaption>Error por falta de pallet-balances</figcaption>
	</figure>
</div>

Esto es porque el runtime que definimos para las pruebas no tiene pallet-balances.
Este acoplamiento es fuerte porque no puede existir esta pallet sin la otra.

### Loose

El otro tipo de acoplamiento, es más flexible.
En este, no requerimos que la otra pallet exista, si no que agregamos un nuevo tipo asociado a la configuración de nuestra pallet, con un trait bound que la pallet deseada implementa.

```rust
#[pallet::config]
pub trait Config: frame_system::Config {
	type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
	type Currency: Currency<Self::AccountId>; // <- Aquí agregamos un nuevo tipo asociado
}
```

`Currency` es un trait que implementa el struct `Pallet` de pallet-balances.

Este es un nuevo tipo asociado que debemos especificar cuando configuramos nuestra pallet para nuestro runtime.

En `runtime/src/lib.rs`:

```rust
impl pallet_piedra_papel_tijera::Config for Runtime {
	type Event = Event;
	type Currency = Balances; // <- Agregamos aquí. `Balances` es el nombre de la pallet en `construct_runtime`
}
```

En `pallets/piedra-papel-tijera/src/mock.rs`:

```rust
frame_support::construct_runtime!(
	pub enum Test where
		Block = Block,
		NodeBlock = Block,
		UncheckedExtrinsic = UncheckedExtrinsic,
	{
		System: frame_system::{Pallet, Call, Config, Storage, Event<T>},
		Balances: pallet_balances, // <- Agregar pallet-balances
		PiedraPapelTijera: pallet_piedra_papel_tijera::{Pallet, Call, Storage, Event<T>},
	}
);

...

impl system::Config for Test {
	...
	type AccountData = pallet_balances::AccountData<Balance>; // <- Agregar esto como en runtime/src/lib.rs
	...
}

impl pallet_piedra_papel_tijera::Config for Test {
	type Event = Event;
	type Currency = Balances; // <- Agregar tipo
}

impl pallet_balances::Config for Test {
	type MaxLocks = ConstU32<50>;
	type MaxReserves = ();
	type ReserveIdentifier = [u8; 8];
	type Balance = Balance;
	type Event = Event;
	type DustRemoval = ();
	type ExistentialDeposit = ConstU128<500>;
	type AccountStore = System;
	type WeightInfo = pallet_balances::weights::SubstrateWeight<Test>;
}
```

También son necesarios algunos imports y aliases de tipos.

## Usando Currency

Vamos a ir con el acoplamiento loose debido a su flexibilidad.
Nuestra pallet funcionará siempre y cuando usemos una implementación del trait `Currency`.
Esto permite usar otras implementaciones distintas a pallet-balances.

Vamos a usar las funciones del trait `Currency` para implementar apuestas en nuestra pallet.
Agregamos el siguiente tipo a `tipos.rs` para simplificar, representando el tipo de las cantidades de tokens:

```rust
pub type BalanceDe<T> = <<T as crate::Config>::Currency as Currency<CuentaDe<T>>>::Balance;
```

Usamos este tipo en vez de algo concreto como `u128` para ser más flexibles.

Agregamos un par de constantes a la configuración de nuestra pallet:

```rust
#[pallet::config]
pub trait Config: frame_system::Config {
	...

	#[pallet::constant]
	type PalletId: Get<PalletId>; // Importar de `frame_support`

	#[pallet::constant]
	type TokensParaJugar: Get<BalanceDe<Self>>;
}
```

Hay que configurar estas constantes en los runtimes de `runtime/src/lib.rs` y `pallets/piedra-papel-tijera/src/mock.rs`.
Algo como `PalletId(*b"py/pptij")` y `ConstU128<10000>` funcionan.

Los únicos extrinsics que hay que modificar son `registrar` y `finalizar_juego`, agregando el pago una vez que sabemos que no hubo error:

```rust
pub fn registrar(origen: OriginFor<T>) -> DispatchResult {
	...

	// Guardamos la apuesta de este jugador
	T::Currency::transfer(
		&quien,
		&Self::account_id(),
		T::TokensParaJugar::get(),
		KeepAlive, // Importamos `frame_support::traits::ExistenceRequirement::KeepAlive`
	)?;

	// Avanzar etapa
	etapa.next();
	EtapaDelJuego::<T>::set(etapa);

	...
}
```

`KeepAlive` hace que la función tire error si destruiría la cuenta, debido a bajar su balance a menos del mínimo.

```rust
pub fn finalizar_juego(origen: OriginFor<T>) -> DispatchResult {
	...

	// Pagarle al ganador
	if let Some(ganador) = ganador.clone() {
		let (cuenta_pallet, total) = Self::pot();
		let result = T::Currency::transfer(&cuenta_pallet, &ganador, total, KeepAlive);
		debug_assert!(result.is_ok()); // No manejamos error
	} else {
		// Empate, devolver las cantidades originales
		let (cuenta_pallet, total) = Self::pot();
		let total: u128 = total.saturated_into(); // Importamos `sp_runtime::traits::SaturatedConversion`
		let cantidad_original = total.saturating_div(2); // Importamos `sp_runtime::traits::Saturating`
		let result = T::Currency::transfer(
			&cuenta_pallet,
			&jugador_1.0,
			cantidad_original.saturated_into(),
			KeepAlive,
		);
		debug_assert!(result.is_ok());
		let result = T::Currency::transfer(
			&cuenta_pallet,
			&jugador_2.0,
			cantidad_original.saturated_into(),
			KeepAlive,
		);
		debug_assert!(result.is_ok());
	}

	Self::deposit_event(Event::Fin { ganador });

	...
}
```

Los tests fallan ahora debido a falta de fondos.
Para resolver esto podemos darles una cantidad inicial suficiente a las cuentas `1` y `2` que usamos en nuestros tests.
En `mock.rs`, cambiamos `new_test_ext` para que se vea de la siguiente manera:

```rust
pub fn new_test_ext() -> sp_io::TestExternalities {
	let mut t = system::GenesisConfig::default().build_storage::<Test>().unwrap();
	pallet_balances::GenesisConfig::<Test> { balances: vec![(1, 100_000), (2, 100_000)] }
		.assimilate_storage(&mut t)
		.unwrap();
	t.into()
}
```

Con esto, nuestra pallet está completa.
Todo el código está en [este repositorio](https://github.com/franciscoaguirre/substrate-piedra-papel-tijera).
