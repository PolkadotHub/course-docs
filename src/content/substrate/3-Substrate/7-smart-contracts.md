---
title: Smart Contracts
module: 3
draft: false
---

# 7. Smart Contracts

La mayoría de las blockchains programables, como Ethereum, permiten al usuario programar contratos inteligentes, o smart contracts.
Ethereum permite a los desarrolladores crear sus propios smart contracts usando el lenguaje solidity.
Este lenguaje se compila a instrucciones, o bytecode, de una máquina virtual conocida como la Ethereum Virtual Machine, o EVM.
Escribiendo smart contracts, los desarrolladores en Ethereum tienen la libertad de crear distintos tokens, fungibles o no, crear aplicaciones como cambios descentralizados, entre otros.

En substrate, como aprendimos, podemos iterar sobre el runtime de nuestra blockchain rápidamente debido a que podemos actualizarlo on-chain.
Teniendo esto, ¿sigue habiendo lugar para los smart contracts?
La respuesta es si, hay varias razones por las cuales uno querría usar smart contracts en blockchains basadas en substrate:
- Pueden ser construídos y liberados en poco tiempo, con lo cual se puede iterar más rápidamente para encontrar el fit de mercado.
- Cualquier desarrollador puede subir su propio smart contract, permitiendo mayor diversidad e innovación.
- Proveen un ambiente aislado perfecto para prototipar.
- Permiten enfocarte en tu aplicación, sin tener que preocuparte por otras decisiones, como consenso.

Por esto, FRAME ya viene con dos pallets que permiten la ejecución de smart contracts en un runtime de substrate:
- pallet-evm: permite ejecutar contratos en EVM, escritos en solidity
- pallet-contracts: permite ejecutar contratos en WASM, escritos en ink!

Para aprender solidity o ink!, hay varios recursos en linea.
Particularmente para ink!, hay un curso [aquí mismo en PolkadotHub](/). <!-- TODO: Cambiar cuando salga el curso de ink! -->

Los smart contracts sufren de tener que adherirse a las reglas de la cadena en la que corren, pero son una buena solución en algunos casos.
