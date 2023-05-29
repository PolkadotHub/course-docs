---
title: Consenso
module: 1
draft: false
---

# Blockchain: Un Sistema Distribuido

Un **sistema distribuido** se compone de una red de computadoras que colaboran para lograr un objetivo común. En el contexto de una **blockchain**, esta funciona sobre una red **descentralizada** en la que cada **nodo** conserva una copia del estado de la red y comparte esta información con los otros nodos.

La **descentralización**, una de las ventajas fundamentales de esta arquitectura, implica que en lugar de una autoridad central única, todos los nodos tienen igual influencia y colaboran para tomar decisiones y validar transacciones. Esto elimina la necesidad de un tercero de confianza para llevar a cabo estas tareas.

Sin embargo, un reto significativo es alcanzar el **consenso** en una red que carece de jerarquías y no requiere permisos para operar.

# Consenso en la Blockchain

En un sistema distribuido, el consenso se refiere al acuerdo entre los diferentes participantes sobre cuál información es considerada **verídica**. En una blockchain, que es un tipo de sistema distribuido abierto y sin autoridades centrales, conseguir el consenso es un desafío considerable.

El **problema de los Generales Bizantinos** ilustra la dificultad de lograr consenso entre partes dispersas sin la ayuda de una entidad central de confianza. Aquí es donde la **teoría de juegos** juega un papel fundamental.

La teoría de juegos ofrece un marco para comprender situaciones sociales en las que interactúan actores con metas contrapuestas. En un entorno estratégico, describe situaciones sociales entre participantes competitivos y ayuda a determinar las decisiones óptimas de agentes autónomos y competitivos.

# El Problema de los Generales Bizantinos

El problema de los Generales Bizantinos se plantea en el escenario de un asedio a la ciudad de Bizancio por varios generales. Han rodeado la ciudad, pero aún no han decidido cuándo iniciar su ataque conjunto. Solo alcanzarán la victoria si todos los generales atacan simultáneamente, pero fracasarán si atacan en momentos distintos.

Dado que cualquier mensaje que envíen o reciban podría ser interceptado o falsificado por los defensores de Bizancio, los generales no cuentan con canales de comunicación seguros entre ellos. Por lo tanto, deben depender de canales de comunicación inseguros y potencialmente hostiles.

De manera similar, en una blockchain se debe determinar el conjunto de transacciones consensuadas en un bloque y establecer el orden correcto de las transacciones para lograr el consenso. En resumen, es necesario acordar cuál será el siguiente bloque en la cadena. 

Esta situación demanda la presencia de un **algoritmo de consenso**. En la próxima sección, exploraremos algunos de los algoritmos que permiten alcanzar un acuerdo entre los participantes de una red blockchain.
