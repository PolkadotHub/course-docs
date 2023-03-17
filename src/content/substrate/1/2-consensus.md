---
title: Consenso
module: 1
---

# Blockchain Como Un Sistemas Distribuido

Un sistema distribuido está formado por una red de computadoras que trabajan juntas para lograr un objetivo común. En una blockchain, se opera en una red descentralizada donde cada nodo tiene una copia de la misma y comparte información con los demás nodos.

Una gran ventaja de esta arquitectura es la descentralización. En lugar de una sola autoridad, todos los nodos tienen la misma voz y trabajan juntos para tomar decisiones y validar transacciones. Esto nos permite prescindir de un tercero en el que confiar para realizar esta tarea.

Pero al mismo tiempo, un gran desafío es lograr consenso en una red sin jerarquías ni necesidad de permisos para operar.

# Consenso

En una red distribuida, el consenso se refiere al acuerdo que existe entre los distintos participantes sobre cuál es la **verdad**. En una blockchain, que es una red distribuida, abierta y sin autoridades, llegar al consenso presenta un gran desafío.

Un problema que ilustra lo difícil que es para las partes dispersas llegar a un consenso sin la ayuda de una parte central de confianza es el problema de los generales bizantinos. En este problema, la teoría de juegos comienza a desempeñar un papel importante. 

La teoría de juegos es un marco para pensar en eventos sociales con actores competidores. En un entorno estratégico, la teoría de juegos concibe circunstancias sociales entre participantes competidores y produce una toma de decisiones óptima de agentes autónomos y competidores.

# Problema De Los Generales Bizantinos

Varios generales sitian Bizancio, una importante ciudad colonial griega de Tracia. Han rodeado la ciudad, pero aún no han decidido cuándo atacar como grupo. Serán victoriosos si todos los generales asaltan simultáneamente, pero fracasarán si atacan en momentos diferentes.

Dado que cualquier carta que transmitan o reciban podría haber sido interceptada o enviada de manera engañosa por los defensores de Bizancio, los generales no tienen canales de comunicación seguros entre ellos. Por lo tanto, se ven obligados a comunicarse en canales no seguros o con participantes maliciosos.

Al igual que los generales que deben decidir cuándo atacar, en la blockchain se debe identificar la lista de transacciones acordadas en un bloque y establecer el orden correcto de las transacciones para llegar a un consenso. En resumen, es necesario establecer un consenso sobre cuál será el próximo bloque.

Esto nos lleva a la necesidad de tener un algoritmo para lograr el consenso. En el siguiente módulo veremos algunos de los algoritmos que nos permiten alcanzar un acuerdo entre los participantes.
