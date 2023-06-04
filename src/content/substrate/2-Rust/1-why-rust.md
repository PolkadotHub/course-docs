---
title: ¿Por Qué Rust?
module: 2
draft: false
---

# ¿Por qué Rust?

**Rust** comenzó en 2006 como un proyecto personal de Graydon Hoare, un empleado de [Mozilla](https://www.mozilla.org/). Este lenguaje de programación de sistemas se propuso como alternativa a lenguajes como C++. Rust se centró inicialmente en la **seguridad de memoria**, pero posteriormente comenzó a enfocarse también en el rendimiento, adoptando el enfoque de abstracción de costo cero de C++. Dada esta premisa, Rust parece ser un lenguaje ideal para el desarrollo de blockchains. En este módulo exploraremos los aspectos clave de Rust que han influido en la decisión de utilizarlo en la creación de Substrate.

# Seguridad de Memoria

La **seguridad de memoria** se refiere a la propiedad de un programa que garantiza que los punteros de memoria utilizados siempre apunten a una memoria válida, es decir, asignada (alocada) y de tipo y tamaño correcto. Un programa que no garantiza la seguridad de memoria puede fallar o producir resultados indeterminados.

En lenguajes con **Garbage Collector** (GC) como JavaScript, se garantiza la seguridad de la memoria para todos los datos asignados dentro del tiempo de ejecución del lenguaje, siempre y cuando la implementación del GC sea correcta. Estos lenguajes ven la memoria como un detalle de la implementación.

Por otro lado, en lenguajes sin GC como Rust, estas propiedades de memoria deben ser garantizadas por el compilador mediante análisis estático (mediante el **Borrow Checker**) o deben ser cuidadosamente gestionadas por el programador en tiempo de ejecución.

Gracias al modelo de **ownership** de Rust y a las reglas de **references** y **borrowing**, se garantiza el correcto manejo de memoria por parte del compilador en todos los programas de Rust que no utilicen código inseguro.

# Rendimiento

Como mencionamos anteriormente, Rust utiliza el concepto de **abstracción de costo cero**. Este concepto tiene como objetivo simplificar el lenguaje sin afectar el rendimiento. Un ejemplo sencillo de esta idea es la **monomorfización**, que permite crear funciones genéricas que se convierten en funciones de tipo concreto necesarias en tiempo de compilación, por lo que no se incurre en costos de tiempo de ejecución. Además, este concepto se aplica a la biblioteca estándar para garantizar que no sea necesario recrear tipos comunes como colecciones, proporcionando un mayor rendimiento y una mejor interoperabilidad de bibliotecas.

La ausencia de un Garbage Collector en Rust también es un factor importante en su rendimiento. El GC añade sobrecarga en tiempo de ejecución ya que debe rastrear la memoria de alguna manera (generalmente mediante el recuento de referencias) para determinar cuándo se puede liberar la memoria. Esto aumenta tanto el uso de memoria (crucial para sistemas embebidos) como el uso de CPU (importante para software de alto rendimiento). Además, un GC es más difícil de controlar, lo que puede llevar a pausas inesperadas en la ejecución cuando se está liberando recursos no utilizados.

# Otros Aspectos

Rust provee varias herramientas que hacen que el desarrollo sea más amigable:

- **Cargo:** es el gestor de paquetes para Rust. Se encarga de descargar las dependencias de tu paquete Rust, compilar tus paquetes, crear paquetes distribuibles y cargarlos en [crates.io](http://crates.io/), el registro de paquetes de la comunidad Rust.
- **Docs:** El generador de documentación de Cargo asegura que nunca falte documentación en ninguna API. Está disponible localmente a través de `cargo doc`, y en línea para paquetes públicos a través de [docs.rs](https://docs.rs/).
- **Rustfmt:** formatea automáticamente el código, haciéndolo más fácil de leer, escribir y mantener. — [GitHub](https://github.com/rust-lang/rustfmt)
- **Clippy:** ayuda a desarrolladores de todos los niveles de experiencia a escribir código idiomático y aplicar estándares. — [GitHub](https://github.com/rust-lang/rust-clippy)

Rust combina los aspectos de seguridad y rendimiento de lenguajes de programación establecidos con las herramientas y la comunidad de un lenguaje moderno. Esto lo convierte en una opción ideal para trabajar en tecnologías de vanguardia que exigen altos niveles de confiabilidad.
