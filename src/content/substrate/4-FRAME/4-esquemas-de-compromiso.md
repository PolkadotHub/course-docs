---
title: Esquemas de compromiso
module: 4
draft: false
---

# 4. Esquemas de compromiso

Los esquemas de compromiso, commitment schemes, o commit-reveal schemes, permiten comprometerse a un valor que permanece oculto, con la capacidad de revelarlo luego.
Esto es exactamente lo que necesitamos para poder juegar piedra, papel o tijera en una blockchain, en la que todo se hace de manera pública.
Dados dos jugadores, nuestro esquema de compromiso va a funcionar de la siguiente manera:
- Un jugador se compromete a una jugada presentando un hash del valor, por ejemplo, piedra.
- El otro jugador se compromete a su jugada haciendo lo mismo.
- A partir de ese momento, ningún jugador puede cambiar su jugada, solo pueden revelarlas y ver quién ganó.

Cuando un jugador sabe que no pueden cambiar sus compromisos y quiere revelar, presenta su jugada sin hashear.
Al hashear la jugada, si corresponde con el compromiso del jugador, sabemos que es la correcta y podemos guardarla como su verdadera jugada.

Hay un problema con esto.
Al haber tan solo tres posibles jugadas, es muy fácil hashear todas las opciones y compararlas con el compromiso del otro jugador para saber qué es lo que jugó y hacer trampa.
Para resolver esto, hacemos que al comprometerse, en lugar de presentar el hash de solo su jugada, cada jugador elije un número aleatorio, llamemosle `nonce`, y presenta el hash de su jugada concatenada con el nonce elegido.
Si usamos un entero de 128 bits para el nonce, un `u128`, hay 3,4x10^38 posibles números que podrían haber sido elegidos.
De esta manera, nos aseguramos que un jugador no pueda averiguar la jugada del otro mirando su compromiso.
Si quisieramos más seguridad de esto, podríamos usar más bits para el valor aleatorio, como una string de 32 bytes.

## Etapas del juego

Hay dos claras etapas en el juego, comprometerse y revelar.
No queremos que hayan nuevos compromisos una vez que estamos en la etapa de revelar y no queremos que se intente revelar cuando todavía estamos en la etapa de compromiso.
Podemos manejar esto caso por caso, pero también podemos guardar la etapa actual del juego en un enum y almacenarlo en el estado.
Esto hace más claro el comportamiento de nuestro juego y simplifica la comprobación de las entradas.

Primero definimos el enum que representa las etapas del juego.
Para mantener una mejor separación, creamos un nuevo archivo `tipos.rs` en la misma carpeta de la pallet.
Luego importamos este módulo desde `lib.rs` con:

```rust
mod tipos;

#[frame_support::pallet]
pub mod pallet {
	use super::tipos::*;

	...
}
```

Ahora definimos el enum, el cual debe derivar varios traits para poder ser almacenado en el estado, como `Encode`, `Decode`, `TypeInfo`, y `MaxEncodedLen`.
Derivamos algunos traits más por su utilidad.

```rust
#[derive(Encode, Decode, Debug, PartialEq, Eq, Clone, TypeInfo, MaxEncodedLen)]
pub enum Etapa {
	Compromiso,
	Revelacion,
}
```

Agregamos dos etapas más, una de comienzo, `EsperandoJugadores`, y una de fin, `Fin`.

```rust
#[derive(Encode, Decode, Debug, PartialEq, Eq, Clone, TypeInfo, MaxEncodedLen)]
pub enum Etapa {
	EsperandoJugadores,
	Compromiso,
	Revelacion,
	Fin,
}
```

Para decidir cuándo avanzar de una etapa a la siguiente, agregamos a cada variante, excepto la de fin, la cantidad de jugadores que actualmente participaron en la etapa.
Podríamos representarlo con un entero, pero esto tiene muchas más posibilidades que las que queremos, así que creamos otro enum.

```rust
#[derive(Encode, Decode, Debug, PartialEq, Eq, Clone, TypeInfo, MaxEncodedLen)]
pub enum CantidadDeJugadores {
	Cero,
	Uno,
}

#[derive(Encode, Decode, Debug, PartialEq, Eq, Clone, TypeInfo, MaxEncodedLen)]
pub enum Etapa {
	EsperandoJugadores(CantidadDeJugadores),
	Commit(CantidadDeJugadores),
	Reveal(CantidadDeJugadores),
	Fin,
}
```

Dado que vamos a almacenar este tipo en el estado, implementamos el trait `Default` para indicar el comienzo del juego.
De esta manera, al usar `ValueQuery`, conseguimos el estado inicial cuando no había nada almacenado antes, en la primer partida por ejemplo.

```rust
impl Default for Etapa {
	fn default() -> Self {
		Self::EsperandoJugadores(CantidadDeJugadores::Cero)
	}
}
```

Vamos a querer avanzar la etapa del juego en cada extrinsic.
Para reducir código duplicado, agregamos esta lógica al propio enum.

```rust
impl Etapa {
	/// Avanza hacia la siguiente etapa del juego.
	/// Si la etapa ya es Etapa::Fin, es idempotente.
	pub fn next(&mut self) {
		use CantidadDeJugadores::*;
		use Etapa::*;

		*self = match *self {
			EsperandoJugadores(Cero) => EsperandoJugadores(Uno),
			EsperandoJugadores(Uno) => Commit(Cero),
			Commit(Cero) => Commit(Uno),
			Commit(Uno) => Reveal(Cero),
			Reveal(Cero) => Reveal(Uno),
			Reveal(Uno) => Fin,
			Fin => Fin,
		};
	}
}
```

De vuelta en `lib.rs`, agregamos un nuevo elemento de almacenamiento:

```rust
#[pallet::storage]
#[pallet::getter(fn etapa)]
pub type EtapaDelJuego<T> = StorageValue<_, Etapa, ValueQuery>;
```

## Jugadores

Para avanzar con el juego, necesitamos almacenar junto a cada jugador, su compromiso y su jugada, las cuales pueden ser `None`, dependiendo de la etapa del juego.
Las tuplas implementan todos los traits necesarios para ser almacenadas en el estado, por lo que podemos reunir todo esto junto a la cuenta del jugador.

En `tipos.rs`, agregamos algunos tipos más:

```rust
#[derive(Encode, Decode, Debug, PartialEq, Eq, Clone, Copy, TypeInfo, MaxEncodedLen)]
pub enum Jugada {
	Piedra,
	Papel,
	Tijera,
}

pub type CuentaDe<T> = <T as frame_system::Config>::AccountId; // Este fue movido de lib.rs
pub type HashDe<T> = <T as frame_system::Config>::Hash;

pub type Jugador<T> = (CuentaDe<T>, Option<HashDe<T>>, Option<Jugada>);
```

De vuelta en `lib.rs`, cambiamos el arreglo de jugadores:

```rust
#[pallet::storage]
#[pallet::getter(fn jugadores)]
pub type Jugadores<T> = StorageValue<_, BoundedVec<Jugador<T>, ConstU32<2>>, ValueQuery>;
```
