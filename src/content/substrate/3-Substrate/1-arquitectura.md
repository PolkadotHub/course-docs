---
title: Arquitectura
module: 3
---

# Arquitectura

Substrate está construído para ser, por encima de todo, modular y flexible.
Crear una blockchain es dificil, hay que tener en cuenta muchos aspectos, como bases de datos, redes, colas de transacciones y mucho más.
Todo esto antes de pensar en la lógica de negocio, que es lo que diferencia a una blockchain de las demás.
La forma más sencilla de crear una blockchain es hacer un fork de una ya existente, como Bitcoin o Ethereum.

Substrate provee todos los componentes que una blockchain necesita, como las ya mencionadas, y permite al desarrollador concentrarse en la lógica de negocio, lo que llama el **runtime** de la chain.
La arquitectura de Substrate tiene 2 componentes principales, que interactúan entre sí:


<div class="flex flex-col">
  <div class="mb-8 grid grid-cols-3 gap-6 bg-violet-400 rounded-lg p-3">
    <!-- DIAGRAM -->
    <div class="relative flex justify-center items-center p-6 h-full">
      <div class="flex flex-col items-center">
        <p class="text-3xl font-bold text-violet-800">WASM Runtime</p>
        <img class="!m-0" src="./assets/wasm-icon.png" width="100">
      </div>
      <!-- ARROWS -->
      <div class="runtime-arrow left-[55px]">
        <div class="arrow-head -left-[50%]" style="clip-path: polygon(0px 0px, 100% 0px, 50% 100%);"></div>
      </div>
      <div class="runtime-arrow left-[110px]">
        <div class="arrow-head -left-[50%]" style="clip-path: polygon(0px 0px, 100% 0px, 50% 100%);"></div>
      </div>
      <div class="runtime-arrow left-[165px]">
        <div class="arrow-head -left-[50%]" style="clip-path: polygon(0px 0px, 100% 0px, 50% 100%);"></div>
      </div>
      <div class="runtime-arrow left-[220px]">
        <div class="arrow-head -left-[50%]" style="clip-path: polygon(0px 0px, 100% 0px, 50% 100%);"></div>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center p-6 rounded-lg shadow-md bg-violet-800 shadow-violet-600 h-full">
      <p class="text-2xl font-semibold m-auto text-violet-400">Pallets</p>
      <ul class="!list-none space-y-1 !m-0 text-xl">
        <li>Balances</li>
        <li>Uniques</li>
        <li>Custom</li>
        <li>Etc...</li>
      </ul>
    </div>
    <div class="flex flex-col items-center p-6 rounded-lg shadow-md bg-violet-800 shadow-violet-600 h-full">
      <p class="text-2xl font-semibold m-auto text-violet-400">Runtime API</p>
      <ul class="!list-none space-y-1 !m-0 text-xl">
        <li>Procesamiento de bloques</li>
        <li>Finalidad</li>
        <li>Transacciones</li>
        <li>Etc...</li>
      </ul>
    </div>
  </div>

  <div class="grid grid-cols-3 gap-6 bg-orange-400 rounded-lg p-3">
    <!-- DIAGRAM -->
    <div class="flex flex-col items-center p-6 rounded-lg shadow-md bg-orange-800 shadow-orange-600 h-full">
      <p class="text-2xl font-semibold w-full m-auto text-orange-400">Host functions</p>
      <ul class="!list-none !m-0 text-xl">
        <li>Criptografía</li>
        <li>Logging</li>
        <li>Almacenamiento</li>
        <li>Etc...</li>
      </ul>
    </div>
    <div class="flex flex-col items-center p-6 rounded-lg shadow-md bg-orange-800 shadow-orange-600 h-full">
      <p class="text-2xl font-semibold m-auto text-orange-400">Componentes</p>
      <ul class="!list-none space-y-1 !m-0 text-xl">
        <li>Libp2p</li>
        <li>Creador de bloques</li>
        <li>Base de datos</li>
        <li>Etc...</li>
      </ul>
    </div>
    <div class="relative flex justify-center items-center p-6 h-full">
      <div class="flex flex-col items-center">
        <p class="text-3xl font-bold text-orange-800">HOST</p>
        <img class="!m-0" src="./assets/ferris-hand.svg" width="150">
      </div>
      <!-- ARROWS -->
      <div class="host-arrow right-[60px]">
        <div class="arrow-head -left-[50%] rotate-180" style="clip-path: polygon(0px 0px, 100% 0px, 50% 100%);"></div>
      </div>
      <div class="host-arrow right-[120px]">
        <div class="arrow-head -left-[50%] rotate-180" style="clip-path: polygon(0px 0px, 100% 0px, 50% 100%);"></div>
      </div>
      <div class="host-arrow right-[180px]">
        <div class="arrow-head -left-[50%] rotate-180" style="clip-path: polygon(0px 0px, 100% 0px, 50% 100%);"></div>
      </div>
      <div class="host-arrow right-[240px]">
        <div class="arrow-head -left-[50%] rotate-180" style="clip-path: polygon(0px 0px, 100% 0px, 50% 100%);"></div>
      </div>
    </div>
  </div>
</div>

Aún
