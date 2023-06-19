---
title: Primer extrinsic
module: 4
draft: false
---

# 3. Primer extrinsic

Para practicar los conceptos que aprendimos, vamos a empezar con un extrinsic.
El primer extrinsic que haremos es el de registrar un jugador para el juego.
Nuestra pallet soportará, en principio, solo una partida de dos jugadores a la vez.
Esta debe terminar antes de poder comenzar otra partida.
Primero, tenemos que definir los tipos que almacenaremos en el estado.
Acompañando, definimos también los eventos y errores que nuestro extrinsic puede emitir o retornar, respectivamente.

## Almacenamiento

Necesitamos guardar un arreglo con dos jugadores.
Para hacer las cosas más fáciles, vamos a crear un alias de tipo:

```rust
type CuentaDe<T> = <T as frame_system::Config>::AccountId;
```

Debido a que el almacenamiento on-chain es caro, y no queremos que un agente malicioso disminuya el rendimiento de nuestra cadena, es buena idea acotar los elementos que almacenamos.
En este caso, en vez de usar un `Vec` común y corriente para contener a los jugadores, usamos un `BoundedVec`.
`BoundedVec` es un vector acotado, con una cota superior que se especifica en el segundo parámetro genérico.

Como ya vimos, hay dos formas de guardar valores en substrate, `ValueQuery` y `OptionQuery`.
En este caso, nos interesa `ValueQuery`, dado que la implementación por defecto de `BoundedVec` es un vector vacío.

Por ahora vamos a guardar únicamente la cuenta del jugador, en un siguiente capítulo vamos a agregar su jugada.

```rust
#[pallet::storage]
#[pallet::getter(fn jugadores)]
pub type Jugadores<T> = StorageValue<_, BoundedVec<CuentaDe<T>, ConstU32<2>>, ValueQuery>;
```

## Eventos

Necesitamos un evento para simbolizar cuando un usuario logra registrarse exitosamente.

```rust
#[pallet::event]
#[pallet::generate_deposit(pub(super) fn deposit_event)]
pub enum Event<T: Config> {
	/// El usuario se registró exitosamente.
	Registrado { quien: CuentaDe<T> },
}
```

## Errores

Necesitamos errores para los posibles problemas que pueden surgir al tratar de registrarse para jugar.

```rust
#[pallet::error]
pub enum Error<T> {
	/// El usuario ya se registró para un juego, no puede volver a hacerlo.
	YaRegistrado,
	/// El juego está lleno, no puede registrarse.
	JuegoLleno,
}
```

## Extrinsic

Finalmente podemos crear nuestro extrinsic, haciendo uso de nuestro almacenamiento, eventos y errores.
El extrinsic se llama `registrar`, su funcionamiento es el siguiente:
- Lee el elemento de almacenamiento `Jugadores`
- Corrobora que el usuario no esté ya registrado
- Corrobora que el arreglo de jugadores no esté lleno
- Agrega el jugador al arreglo de jugadores y genera un evento exitoso en ese caso

El código se muestra a continuación:

```rust
/// Registra al usuario para jugar
#[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
pub fn registrar(origen: OriginFor<T>) -> DispatchResult {
	let quien = ensure_signed(origen)?;

	let mut jugadores = Jugadores::<T>::get();
	if let Some(primer_jugador) = jugadores.first() {
		ensure!(*primer_jugador != quien, Error::<T>::YaRegistrado);
	}
	if let Some(segundo_jugador) = jugadores.last() {
		ensure!(*segundo_jugador != quien, Error::<T>::YaRegistrado);
	}
	// `BoundedVec` provee el método `try_push`, que retorna un error si está lleno.
	ensure!(jugadores.try_push(quien.clone()).is_ok(), Error::<T>::JuegoLleno);
	Jugadores::<T>::set(jugadores);

	Self::deposit_event(Event::Registrado { quien });

	Ok(())
}
```

## Tests

Si bien podemos probar nuestros extrinsics manualmente con Polkadot JS Apps, la mejor forma de hacerlo es mediante tests.
Los tests son más rápidos de compilar, sirven como documentación de la pallet, y pueden ayudar a identificar errores en un extrinsic debido a un cambio en otro lado, entre otros beneficios.
Para hacer los tests, vamos a tener que cambiar `pallet_template` y `PalletTemplate` en `pallets/piedra-papel-tijera/src/mock.rs`.
En el archivo `mock.rs`, se define un runtime mínimo que podemos usar para probar nuestra pallet.

```rust
use crate as pallet_piedra_papel_tijera; // <- Aquí al comienzo

...

frame_support::construct_runtime!(
	pub enum Test where
		Block = Block,
		NodeBlock = Block,
		UncheckedExtrinsic = UncheckedExtrinsic,
	{
		System: frame_system::{Pallet, Call, Config, Storage, Event<T>},
		PiedraPapelTijera: pallet_piedra_papel_tijera::{Pallet, Call, Storage, Event<T>}, // <- Aquí
	}
);

...

impl pallet_piedra_papel_tijera::Config for Test { // <- Aquí
	type Event = Event;
}
```

Ahora vamos a probar nuestro primer extrinsic en `tests.rs`.
Probamos los dos casos con error y el caso exitoso.
Para correr los tests, usamos `cargo test -p pallet-piedra-papel-tijera`.

```rust
#[test]
fn registrar_funciona() {
	new_test_ext().execute_with(|| {
		// Debemos importar `assert_ok` de `frame_support`.
		// Se asegura que el valor sea una variante `Ok()`.
		assert_ok!(PiedraPapelTijera::registrar(Origin::signed(1)));
		let jugadores = PiedraPapelTijera::jugadores();
		assert_eq!(jugadores.len(), 1);
		assert_eq!(jugadores.first(), Some(&1));

		// Debemos importar `assert_noop` de `frame_support`.
		// Se asegura que el valor sea una variante `Err`,
		// y que el error sea el que se pasa como segundo parámetro.
		assert_noop!(PiedraPapelTijera::registrar(Origin::signed(1)), Error::<Test>::YaRegistrado);

		assert_ok!(PiedraPapelTijera::registrar(Origin::signed(2)));
		let jugadores = PiedraPapelTijera::jugadores(); // Recargar vector
		assert_eq!(jugadores.len(), 2);
		assert_eq!(jugadores.first(), Some(&1));
		assert_eq!(jugadores.last(), Some(&2));

		assert_noop!(PiedraPapelTijera::registrar(Origin::signed(3)), Error::<Test>::JuegoLleno);
	});
}
```

Accedemos al extrinsic y a los getters con `PiedraPapelTijera`, el nombre de la pallet en `construct_runtime`.
`PiedraPapelTijera::registrar()` y `PiedraPapelTijera::jugadores()`.
