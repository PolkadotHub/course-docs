---
title: ¿Por Qué Rust?
module: 2
---

# 1. ¿Por qué Rust?

Rust comenzó en 2006 como un proyecto personal de Graydon Hoare, un empleado de [Mozilla](https://www.mozilla.org/).
Este lenguaje de programación de sistemas se propuso como alternativa a lenguajes como C++.
Rust se centró inicialmente en la **seguridad de memoria**, pero posteriormente comenzó a enfocarse también en el rendimiento, adoptando el enfoque de abstracciones de costo cero de C++.
Dada esta premisa, Rust parece ser un lenguaje ideal para el desarrollo de blockchains.
En este módulo exploraremos los aspectos clave de Rust que han influido en la decisión de utilizarlo en la creación de Substrate.

## Seguridad de Memoria

La **seguridad de memoria** se refiere a la propiedad de un programa que garantiza que los punteros de memoria utilizados siempre apunten a una memoria válida, es decir, asignada y de tipo y tamaño correcto.
Un programa que no garantiza la seguridad de memoria puede fallar o producir resultados indefinidos.

En lenguajes con _Garbage Collector_ (GC) como JavaScript, se garantiza la seguridad de la memoria para todos los datos asignados dentro del tiempo de ejecución del lenguaje, siempre y cuando la implementación del GC sea correcta.
Estos lenguajes ven el manejo de la memoria como un detalle de implementación.

Otros lenguajes, como C y C++, eligen no tener GC, dado el impacto en rendimiento que este genera.
En estos lenguajes, usualmente es el programador el que debe explicitamente pedir y liberar la memoria, proceso que ha demostrado ser muy propenso a errores.

Por otro lado, lenguajes como Rust no tienen GC, pero estas propiedades de memoria se garantizan, en gran medida, por el compilador mediante análisis estático, mediante el _Borrow Checker_.

Gracias al modelo de _ownership_ de Rust y a las reglas de _references_ y _borrowing_, que veremos más adelante, se garantiza, en gran medida, el correcto manejo de memoria por parte del compilador en todos los programas de Rust que no utilicen código inseguro.

## Rendimiento

Como mencionamos anteriormente, Rust tiene **abstracciones de costo cero**.
Esto permite simplificar el desarrollo por parte de los programadores sin afectar el rendimiento del binario final.
Un ejemplo sencillo de una abstracción de costo cero es la **monomorfización**, que permite crear funciones genéricas que se convierten en funciones de tipo concreto necesarias en tiempo de compilación, por lo que no se incurre en ningún costo adicional en tiempo de ejecución.
Además, este concepto se aplica a la biblioteca estándar para garantizar que no sea necesario recrear tipos comunes como colecciones, proporcionando un mayor rendimiento y una mejor interoperabilidad de bibliotecas.
En Rust, muchos calculos se ejecutan en tiempo de compilación, lo cual hace que en tiempo de ejecución, el binario ejecute lo más rápido posible.

La ausencia de un GC en Rust también es un factor importante en su rendimiento.
El GC añade sobrecarga en tiempo de ejecución ya que debe analizar la memoria, generalmente mediante conteo de referencias, para determinar cuándo se puede liberar la memoria.
Esto aumenta tanto el uso de memoria, algo crucial para sistemas embebidos, como el uso de CPU, que es importante para software de alto rendimiento.
Además, un GC es más difícil de predecir, lo que puede llevar a pausas inesperadas en la ejecución cuando se está liberando recursos no utilizados.

## Otros Aspectos

Rust provee varias herramientas que hacen que el desarrollo sea más amigable:

- **Cargo:** es el gestor de paquetes de Rust. Permite descargar las dependencias de los paquetes, compilar cada paquete y sus dependencias, crear paquetes distribuibles y publicarlos a [crates.io](http://crates.io/), el registro de paquetes de la comunidad, entre otros. Todo con una interfaz de comandos muy amigable y sencilla de usar. - [Libro oficial](https://doc.rust-lang.org/cargo/)
- **Docs:** El generador de documentación de Cargo facilia la creación de documentación para APIs, una tarea usualmente tediosa y con tendencia a quedar desactualizada. Está disponible localmente a través de `cargo doc`, y en línea para paquetes públicos a través de [docs.rs](https://docs.rs/).
- **Rustfmt:** formatea automáticamente el código, haciéndolo más fácil de leer, escribir y mantener. — [GitHub](https://github.com/rust-lang/rustfmt)
- **Clippy:** ayuda a desarrolladores de todos los niveles de experiencia a escribir código idiomático y aplicar estándares. — [GitHub](https://github.com/rust-lang/rust-clippy)

Rust combina los aspectos de seguridad y rendimiento de lenguajes de programación establecidos con las herramientas y la comunidad de un lenguaje moderno. Esto lo convierte en una opción ideal para trabajar en tecnologías de vanguardia que exigen altos niveles de confiabilidad.
