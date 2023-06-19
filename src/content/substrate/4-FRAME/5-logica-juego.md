---
title: Lógica del juego
module: 4
draft: false
---

# 5. Lógica del juego

En este capítulo, construímos los extrinsics restantes necesarios para jugar al piedra, papel o tijera.

## Registro

Primero, cambiamos un poco el extrinsic de registro con los nuevos tipos.

Ya no es necesario el error `JuegoLleno` porque podemos simplemente usar la etapa.
Así que creamos una nueva variante de error `EtapaIncorrecta`.
Devolvemos este error si la etapa del juego no es la adecuada, `EsperandoJugadores`.

Cuando un jugador se registra, agregamos su cuenta al arreglo de jugadores, junto con `None` para su compromiso y jugada.

Al final de todo, avanzamos la etapa usando el método que creamos en el capítulo anterior.

```rust
pub fn registrar(origen: OriginFor<T>) -> DispatchResult {
	// Revisar etapa del juego
	let mut etapa = EtapaDelJuego::<T>::get();
	ensure!(matches!(etapa, Etapa::EsperandoJugadores(_)), Error::<T>::EtapaIncorrecta);

	let quien = ensure_signed(origen)?;
	let mut jugadores = Jugadores::<T>::get();
	// Si la etapa es correcta, hay máximo un jugador en el arreglo.
	if let Some(primer_jugador) = jugadores.first() {
		ensure!(primer_jugador.0 != quien, Error::<T>::YaRegistrado);
	}

	let jugador = (quien.clone(), None, None); // Jugadores comienzan sin jugada ni compromiso.
	jugadores.force_push(jugador); // Sabemos que no está lleno el arreglo porque la etapa es correcta.
	Jugadores::<T>::set(jugadores);

	// Avanzar etapa
	etapa.next();
	EtapaDelJuego::<T>::set(etapa);

	Self::deposit_event(Event::Registrado { quien });

	Ok(())
}
```

El macro `matches!()` devuelve `true` si el primer parámetro coincide con el patrón en el segundo parámetro, si no, devuelve `false`.

## Compromiso

En el extrinsic de compromiso, tenemos que:
- Comprobar que la etapa sea la adecuada
- Comprobar que el jugador esté en el arreglo de jugadores
- Comprobar que el jugador no tenga un compromiso pasado
- Asignarle el compromiso al jugador
- Avanzar la etapa

El código es el siguiente:

```rust
pub fn commit(origen: OriginFor<T>, hash: HashDe<T>) -> DispatchResult {
	let mut etapa = EtapaDelJuego::<T>::get();
	ensure!(matches!(etapa, Etapa::Commit(_)), Error::<T>::EtapaIncorrecta);

	let quien = ensure_signed(origen)?;
	let mut jugadores = Jugadores::<T>::get();
	let mut encontrado = false;
  // Hay que tener cuidado con las iteraciones
  // En este caso no hay problema porque acotamos el arreglo a dos elementos
	for jugador in jugadores.iter_mut() {
		if jugador.0 == quien {
			// Asegurarnos que el jugador no cambie su jugada.
			ensure!(jugador.1 == None, Error::<T>::YaComprometido);
			jugador.1 = Some(hash);
			encontrado = true;
		}
	}
	ensure!(encontrado, Error::<T>::NoEsJugador);
	Jugadores::<T>::set(jugadores);

	// Avanzar etapa
	etapa.next();
	EtapaDelJuego::<T>::set(etapa);

	Self::deposit_event(Event::Comprometido { quien, hash });

	Ok(())
}
```

## Revelación

Para la revelación, debemos:
- Comprobar que la etapa sea la adecuada
- Comprobar si el jugador está en el arreglo de jugadores
- Comprobar que el jugador no haya revelado antes
- Comprobar si el hash es correcto
- Asignar la jugada revelada si todo está bien
- Avanzar de etapa

```rust
pub fn reveal(origen: OriginFor<T>, jugada: Jugada, nonce: u128) -> DispatchResult {
	let mut etapa = EtapaDelJuego::<T>::get();
	ensure!(matches!(etapa, Etapa::Reveal(_)), Error::<T>::EtapaIncorrecta);

	let quien = ensure_signed(origen)?;
	let mut jugadores = Jugadores::<T>::get();
	let mut encontrado = false;
	for jugador in jugadores.iter_mut() {
		if jugador.0 == quien {
			// Asegurarnos que el jugador no haya revelado antes.
			ensure!(jugador.2 == None, Error::<T>::YaRevelado);
			let concatenacion = jugada.using_encoded(|slice_1| {
				nonce.using_encoded(|slice_2| [slice_1, slice_2].concat())
			});
			let hash = <T as frame_system::Config>::Hashing::hash_of(&concatenacion);
			ensure!(
				hash == jugador.1.expect("Debe haber un hash en esta etapa"),
				Error::<T>::HashIncorrecto
			);
			jugador.2 = Some(jugada);
			encontrado = true;
		}
	}
	ensure!(encontrado, Error::<T>::NoEsJugador);
	Jugadores::<T>::set(jugadores);

	// Avanzar etapa
	etapa.next();
	EtapaDelJuego::<T>::set(etapa);

	Self::deposit_event(Event::Revelado { quien, jugada });

	Ok(())
}
```

## Fin

Para finalizar el juego, creamos un nuevo extrinsic que se puede llamar solo cuando ambos jugadores ya revelaron sus jugadas, y que anuncia al ganador.

```rust
pub fn finalizar_juego(_origen: OriginFor<T>) -> DispatchResult {
	let etapa = EtapaDelJuego::<T>::get();
	ensure!(etapa == Etapa::Fin, Error::<T>::EtapaIncorrecta);

	let jugadores = Jugadores::<T>::get();
	let jugador_1 = jugadores.first().expect("En esta etapa existen los dos jugadores");
	let jugada_1 = jugador_1.2.expect("En esta etapa existen las jugadas");
	let jugador_2 = jugadores.last().expect("En esta etapa existen los dos jugadores");
	let jugada_2 = jugador_2.2.expect("En esta etapa existen las jugadas");

	// Lógica para decidir el ganador
	use Jugada::*;
	let ganador = match (jugada_1, jugada_2) {
		(Papel, Piedra) | (Piedra, Tijera) | (Tijera, Papel) => Some(jugador_1.0.clone()),
		(Piedra, Papel) | (Tijera, Piedra) | (Papel, Tijera) => Some(jugador_2.0.clone()),
		_ => None, // Empate
	};

	Self::deposit_event(Event::Fin { ganador });

	Ok(())
}
```

## Tests

A continuación, mostramos un test que prueba todo un flujo de jugar una partida:

```rust
#[test]
fn commit_y_reveal_funcionan() {
	new_test_ext().execute_with(|| {
		System::set_block_number(1);

		assert_ok!(PiedraPapelTijera::registrar(Origin::signed(1)));
		assert_ok!(PiedraPapelTijera::registrar(Origin::signed(2)));

		let jugada_1 = Jugada::Papel;
		let nonce_1: u128 = 719836158792659817324695;
		let concatenacion_1 = jugada_1
			.using_encoded(|slice_1| nonce_1.using_encoded(|slice_2| [slice_1, slice_2].concat()));
		let hash_1 = <Test as frame_system::Config>::Hashing::hash_of(&concatenacion_1);

		assert_noop!(
			PiedraPapelTijera::commit(Origin::signed(3), hash_1),
			Error::<Test>::NoEsJugador
		);
		assert_ok!(PiedraPapelTijera::commit(Origin::signed(1), hash_1));

		assert_eq!(PiedraPapelTijera::etapa(), Etapa::Commit(CantidadDeJugadores::Uno));

		let jugada_2 = Jugada::Piedra;
		let nonce_2: u128 = 4501394651647051645007136;
		let concatenacion_2 = jugada_2
			.using_encoded(|slice_1| nonce_2.using_encoded(|slice_2| [slice_1, slice_2].concat()));
		let hash_2 = <Test as frame_system::Config>::Hashing::hash_of(&concatenacion_2);
		assert_ok!(PiedraPapelTijera::commit(Origin::signed(2), hash_2));

		let jugadores = PiedraPapelTijera::jugadores();
		assert_eq!(jugadores.first().unwrap(), &(1, Some(hash_1), None));
		assert_eq!(jugadores.last().unwrap(), &(2, Some(hash_2), None));

		assert_eq!(PiedraPapelTijera::etapa(), Etapa::Reveal(CantidadDeJugadores::Cero));

		assert_noop!(
			PiedraPapelTijera::reveal(Origin::signed(3), Jugada::Papel, 0),
			Error::<Test>::NoEsJugador
		);

		assert_ok!(PiedraPapelTijera::reveal(Origin::signed(1), jugada_1, nonce_1));
		assert_noop!(
			PiedraPapelTijera::reveal(Origin::signed(2), jugada_1, nonce_1),
			Error::<Test>::HashIncorrecto
		);
		assert_ok!(PiedraPapelTijera::reveal(Origin::signed(2), jugada_2, nonce_2));
		assert_eq!(PiedraPapelTijera::etapa(), Etapa::Fin);

		assert_ok!(PiedraPapelTijera::finalizar_juego(Origin::signed(1)));
		System::assert_last_event(Event::Fin { ganador: Some(1) }.into());
	});
}
```
