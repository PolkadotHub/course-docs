---
title: "!A jugar!"
module: 4
---

# 7. ¡A jugar!

Los tests se aseguran que cada extrinsic funcione bien, de acuerdo a los casos de prueba que se nos ocurren.
Es buena idea interactuar con la pallet en un ambiente más cercano al de producción, al que usarán los usuarios.
Aquí entra Polkadot JS Apps.
Dado que no tenemos un UI específico para nuestra aplicación, usaremos Polkadot JS Apps para jugarlo.

## Cómo jugar

Para jugar, usamos Polkadot JS Apps para llamar los extrinsics con dos cuentas, por ejemplo ALICE y BOB.
El flujo es:
- Ambos jugadores se registran
- Ambos jugadores se comprometen
- Ambos jugadores revelan
- Cualquier usuario llama `finalizar_juego`

Lo más complicado es conseguir el hash para la etapa de compromiso.
El procedimiento es el mismo que hicimos en el test, así que podemos crear un test solo para generar dos hashes, imprimirlos y copiarlos de ahí.
Este es el aspecto con pero UX a la hora de jugar.

Hay una función en [el repo](https://github.com/franciscoaguirre/substrate-piedra-papel-tijera/blob/main/pallets/piedra-papel-tijera/src/utils.rs), `conseguir_compromiso`, que puede ser útil.

<div class="flex justify-center">
	<figure class="flex flex-col items-center max-w-5xl">
		<img src="/assets/rock-paper-scissors-extrinsic.png">
		<figcaption>Llamando extrinsic de commit</figcaption>
	</figure>
</div>

## Ejemplo de una partida

<div class="flex justify-center">
	<figure class="flex flex-col items-center max-w-5xl">
		<img src="/assets/rock-paper-scissors-match.png">
		<figcaption>Eventos de una partida</figcaption>
	</figure>
</div>

## Próximos pasos

¡Hemos armado nuestra propia pallet!
La pallet es suficiente para poder jugar partidas de piedra, papel o tijera on-chain, pero hay más features que podríamos agregarle:
- Agregar períodos máximos de tiempo para comprometerse y revelar.
  Permitir terminar la partida si uno de los jugadores se pasa del tiempo.
  Actualmente una partida puede durar indefinidamente.
  Ayuda: agregar constantes `PeriodoCompromiso` y `PeriodoRevelacion` a la configuración.
- Permitir más de una partida a la vez.
  Actualmente solo pueden jugar dos personas a la vez.
  Ayuda: cambiar el arreglo de jugadores por un `StorageMap` de partidas a jugadores.
- Crear una UI para jugar de manera más cómoda que con Polkadot JS Apps.
  Ayuda: leer la [documentación de Polkadot JS](https://polkadot.js.org/docs/).
- Benchmarking para preparar la pallet para producción.
  Ayuda: leer la [documentación de benchmarking](https://docs.substrate.io/test/benchmark/).

En el próximo módulo, hablaremos sobre Polkadot y veremos cómo convertir nuestra cadena en una parachain para liberarla en la testnet pública Rococo.
