---
title: Estructura de una pallet
module: 4
draft: false
---

# 1. Estructura de una pallet

Antes de empezar a desarrollar nuestra pallet, veamos cómo es la estructura de una pallet usando `pallets/template/src/lib.rs` como ejemplo.
Este archivo tiene, abreviando algunas partes, lo siguiente:

```rust
#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[cfg(test)]
mod mock;

#[cfg(test)]
mod tests;

#[cfg(feature = "runtime-benchmarks")]
mod benchmarking;

#[frame_support::pallet]
pub mod pallet {
	use frame_support::pallet_prelude::*;
	use frame_system::pallet_prelude::*;

	#[pallet::config]
	pub trait Config: frame_system::Config {
		type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
	}

	#[pallet::pallet]
	#[pallet::generate_store(pub(super) trait Store)]
	pub struct Pallet<T>(_);

	#[pallet::storage]
	#[pallet::getter(fn something)]
	pub type Something<T> = StorageValue<_, u32>;

	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
    ...
	}

	#[pallet::error]
	pub enum Error<T> {
    ...
	}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
    ...
  }
}
```

Al principio se definen los módulos donde van los tests, o pruebas automáticas, y benchmarks, requiriendo la feature adecuada.
Luego vemos el módulo `pallet`.
Todas nuestras pallets deben desarrollarse en un módulo anotado con `#[frame_support::pallet]`, esto comunica a FRAME que es una pallet.
Dentro, importamos todos los símbolos de los preludios de `frame_system` y `frame_support`, que nos da tipos muy importantes para desarrollar.
Veamos todas las partes que tiene cada pallet.

## Configuración

```rust
#[pallet::config]
pub trait Config: frame_system::Config {
	type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
}
```

Toda pallet define un trait `Config` para su configuración, que debe ser anotado con `#[pallet::config]`.
El tipo `Event` viene por defecto y es el tipo que se maneja para emitir eventos.
Se pueden agregar más tipos asociados, especificando trait bounds, que restringen a que ese tipo implemente cierto trait.

```rust
#[pallet::config]
pub trait Config: frame_system::Config {
  ...

  type Balances: Currency; // Un trait que se usa para transferir tokens,
                           // implementado, entre otros, por pallet-balances

  #[pallet::constant] // Hace que Polkadot JS Apps lo reconozca como constante
  type UnaConstante: Get<u32>; // Ya hablamos del trait `Get`

  ...
}
```

Podemos crear nuestros propios traits y usarlos en la configuración.

## struct Pallet

```rust
#[pallet::pallet]
#[pallet::generate_store(pub(super) trait Store)]
pub struct Pallet<T>(_);
```

Este fragmento, si bien es necesario, no necesita ser cambiado.
Define el struct `Pallet`, genérico sobre un tipo `T` que representa su configuración.
Este struct es el que usaremos para llamar funciones en nuestros tests.

## Almacenamiento

```rust
#[pallet::storage]
#[pallet::getter(fn something)]
pub type Something<T> = StorageValue<_, u32>;
```

En FRAME, cada elemento que querramos almacenar, debe ser anotado con `#[pallet::storage]`.
Opcionalmente, se puede agregar un getter con `#[pallet::getter(fn <nombre>)]`, que permite leer este valor más facilmente durante los tests.
Aunque pueda ser contraintuitivo, definimos cada elemento a almacenar como un tipo, no una variable.
En este caso, se usa un alias de tipo, `type`, en lugar de un nuevo tipo, `struct` o `enum`, porque se usa un tipo ya existente, con sus parámetros genéricos especificados.
Estos tipos son abstracciones que hacen que no sea necesario pensar en la codificación de los datos ni en su lugar en la base de datos.
Nos permiten concentrarnos en el desarrollo de la lógica.

FRAME tiene varios tipos que se pueden usar para almacenar elementos.
Veremos cada uno de ellos a continuación.

### StorageValue

`StorageValue` permite almacenar cualquier valor primitivo, como un entero, o para un struct, o para una colección de elementos relacionados.
Si guardamos listas de esta manera, tenemos que tener cuidado con el tamaño de las mismas.

```rust
StorageValue<_, Valor, Consulta = OptionQuery, ValorPorDefecto = GetDefault>
```

En `Valor` ponemos el tipo que queremos almacenar, por ejemplo `u32` o `BoundedVec`.
En `Consulta` tenemos dos opciones:
- `OptionQuery`: devuelve `None` si no hay un valor y `Some(valor)` si lo hay.
- `ValueQuery`: siempre devuelve un valor, usando uno por defecto si es necesario.

En `ValorPorDefecto` podemos pasar el valor por defecto que usa `ValueQuery`.
Solo especificar `Valor` es necesario, el resto es opcional, con los valores por defecto especificados en la firma.
`GetDefault` devuelve la implementación del trait `Default` del tipo siendo almacenado.

Podemos usar este tipo de almacenamiento con varias funciones, algunas de las cuales son:
- `exists()`: devuelve si existe el elemento en la base de datos.
- `get()`: devuelve el valor de la base de datos.
- `set()`: guarda un valor en la base de datos.

### StorageMap

`StorageMap` permite almacenar una asociación clave-valor, por ejemplo, una asociación cuenta-balance.

```rust
StorageMap<_, Hasher, Clave, Valor, Consulta = OptionQuery, ValorPorDefecto = GetDefault>;
```

El tipo `Hasher` especifica cómo se hashea la clave para llegar al valor. Sus posibles valores son:
- `Blake2_128Concat`: hashea la clave usando el algoritmo `blake_2` de 128 bits. Es un algoritmo criptográficamente seguro.
- `Twox_64Concat`: hashea la clave usando el algoritmo `twox` de 64 bits. No es criptográficamente seguro.
- `Identity`: no hashea la clave.

Todos estos hashers concatenan la clave al resultado del hash, permitiendo iterar por los mapas, aunque si el mapa tiene muchas claves, no es recomendado.
Que un algoritmo de hash sea criptográficamente seguro implica que es más dificil influenciar la distribución de las claves.
Esta distribución afecta el rendimiento de leer una clave, por lo que siempre que un usuario pueda elegir las claves de un mapa, lo mejor es usar `blake_2`, si no, `twox` es más rápido para calcular.
Es una buena idea usar `blake_2` por defecto.

El valor almacenado puede ser un entero, una tupla de distintos valores, un struct, un enum, o una lista, entre otros.

### DoubleStorageMap y StorageNMap

Estos tipos ponen el valor detrás de una serie de claves, no solamente una.
Pueden ser usados para, por ejemplo, asociar una cuenta y un tipo de token, con su balance.

## Eventos

Cada pallet emite eventos.
Este es un mecanismo de reportar operaciones exitosas.
Los eventos emitidos pueden contener distintos tipos de información.
Aplicaciones front-end pueden suscribirse a escuchar estos eventos y reaccionar acorde al recibirlos.

```rust
#[pallet::event]
#[pallet::generate_deposit(pub(super) fn deposit_event)]
pub enum Event<T: Config> {
  ...
}
```

Cada variante de este enum es un evento que puede emitirse con función asociada `deposit_event()` del struct `Pallet`.
Las variantes pueden contener datos extra, con tipos que pueden sacarse de `T`, la configuración.
Es una buena práctica nombrar los campos extra y documentar, con un doc comment, `///`, cada variante.

```rust
pub enum Event<T: Config> {
  /// Una operación fue exitosa, la realizó la cuenta `quien` en el bloque `cuando`.
  OperacionExitosa { quien: T::AccountId, cuando: T::BlockNumber },
}
```

### Errores

No todo puede ser exitoso, por eso cada pallet también expone un enum para devolver errores.
Cada variante de este enum es un posible valor de error, que puede ser devuelto por un extrinsic en caso que falle.
También pueden incluír información extra.

```rust
#[pallet::error]
pub enum Error<T> {
  ...
}
```

### Extrinsics

Finalmente llegamos a los extrinsics, las funcionalidades de nuestra cadena que los usuarios pueden usar.
Los extrinsics son funciones asociadas al struct `Pallet` en un bloque `impl` anotado con el macro `#[pallet::call]`.

```rust
#[pallet::call]
impl<T: Config> Pallet<T> {
	#[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
	pub fn do_something(origin: OriginFor<T>, something: u32) -> DispatchResult {
		let who = ensure_signed(origin)?;
		Something::<T>::put(something);
		Self::deposit_event(Event::SomethingStored(something, who));
		Ok(())
	}
}
```

Cada extrinsic tiene una anotación `#[pallet::weight()]`.
Esto permite darles un peso que da un indicio de qué tanto tiempo toma la función, para poder calcular la fee necesaria para llamarla.
Es importante cobrar una fee mayor si la función utiliza más recursos para prevenir ataques de denegación de servicio, DoS, por sus siglas en inglés.
Estos pesos se calculan corriendo benchmarks, pruebas en las que se mide el uso de recursos, como el tiempo de ejecución.
Para nuestro tutorial, no vamos a preocuparnos por definir y correr benchmarks, pero es importante para una pallet lista para producción.

Cada extrinsic toma como primer parámetro un valor de tipo `OriginFor<T>`, que representa la entidad que inició la llamada, usualmente una cuenta.
Para conseguir la cuenta dado este origen, llamamos a la función `ensure_signed()`, que se asegura que la llamada haya sido firmada y devuelve la cuenta que la firmó.
Si la llamada no fue firmada, devuelve un error, el cual se propaga con el uso del operador `?`.
Cada extrinsic devuelve un valor de tipo `DispatchError`, que es `Ok(())` si todo salió bien y `Err(Error)`, siendo `Error` el tipo de error que vimos antes, si todo salió mal.

En este extrinsic de ejemplo, vemos que se se pone un valor en el almacenamiento, se deposita un evento, y se devuelve `Ok(())` para simbolizar que todo salió bien.

Cuando queremos retornar un error, hay un macro muy útil llamado `ensure`.
Digamos que queremos retornar un error si un número `x` es menor a cero, podemos hacer lo siguiente:

```rust
#[pallet::call]
impl<T: Config> Pallet<T> {
  ...
  pub fn extrinsic_ejemplo(_origen: OriginFor<T>, x: u32) -> DispatchResult {
    ensure!(x > 0, Error::<T>::NumeroNegativo);
    Ok(())
  }

  ...
}
```

Este extrinsic toma un entero `x` y solo continúa la ejecución si `x > 0`, si no, retorna un error.
