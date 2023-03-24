---
title: ¿Por Qué Rust?
module: 2
---

# ¿Por Qué Rust?

Rust comenzó en 2006 como un proyecto personal de Graydon Hoare, un empleado de [Mozilla](https://www.mozilla.org/). Es un lenguaje de programación de sistemas destinado a reemplazar lenguajes como C++. El enfoque principal de Rust fue la seguridad de memoria, pero luego comenzó a apuntar al rendimiento, adoptando el enfoque de abstracción de costo cero de C++. 

Teniendo esto en cuenta, parece ser un lenguaje ideal para el desarrollo de blockchains. En este módulo exploraremos cuáles son los aspectos clave de Rust que llevaron a crear Substrate utilizando este lenguaje.

# Seguridad De Memoria

La seguridad de la memoria se refiere a la propiedad de un programa en la que los punteros de memoria utilizados apuntan siempre a una memoria válida, es decir, asignada (alocada) y del tipo y tamaño correcto. Un programa inseguro de memoria puede fallar o producir una salida no determinista dependiendo del error.

En lenguajes con Garbage Collector (por ejemplo, JavaScript), se garantiza la seguridad de la memoria para todos los datos asignados dentro del tiempo de ejecución del lenguaje, siempre y cuando la implementación del GC sea correcta. Estos lenguajes abstraen la memoria como un detalle de la implementación.

En lenguajes sin GC como Rust, estas propiedades de memoria deben ser garantizadas por el compilador mediante análisis estático (Borrow Checker) o deben ser cuidadosamente administradas por el programador en tiempo de ejecución.

Gracias al modelo de ownership de Rust y a las reglas de references y borrowing, está garantizado el correcto manejo de memoria por el compilador en todos los programas de Rust que no usen código inseguro.

# Rendimiento

Como se mencionó anteriormente, Rust utiliza el concepto de **abstracción de costo cero**. Este concepto apunta a simplificar el lenguaje sin afectar el rendimiento. Un ejemplo simple de esta idea es la **monomorfización**, que permite crear funciones genéricas que se convierten en funciones de tipo concreto necesarias en tiempo de compilación, por lo que no se incurre en costos de tiempo de ejecución. Además, este concepto se aplica a la biblioteca estándar para garantizar que no sea necesario recrear tipos comunes como colecciones, lo que proporciona un mayor rendimiento y una mejor interoperabilidad de bibliotecas.

Otro importante aspecto de Rust es su falta de un Garbage Collector, que trae muchos beneficios para el rendimiento. El GC agrega sobrecarga en tiempo de ejecución ya que debe rastrear la memoria de alguna manera (generalmente mediante el recuento de referencias) para determinar cuándo se puede liberar la memoria. Esto aumenta tanto el uso de memoria (muy importante para sistemas embebidos) como el uso de CPU (importante para software de alto rendimiento). Además, un GC es más complejo de controlar, lo que lleva a pausas inesperadas en la ejecución cuando se está ejecutando o liberando recursos no utilizados.

# Otros Aspectos

Rust provee varias herramientas que permiten que el desarrollo sea mas amigable:

- Cargo: es el package manager para Rust. Es responsable de descargar las dependencias de su paquete Rust, compilar sus paquetes, crear paquetes distribuibles y cargarlos en [crates.io](http://crates.io/), el package registry de la comunidad Rust.
- Docs: El generador de documentación de Cargo asegura que nunca falte documentación en ninguna API. Está disponible localmente a través de `cargo doc`, y en línea para paquetes públicos a través de [docs.rs](https://docs.rs/).
- Rustfmt: formatea automáticamente el código, haciéndolo más fácil de leer, escribir y mantener. — [GitHub](https://github.com/rust-lang/rustfmt)
- Clippy:  ayuda a desarrolladores de todos los niveles de experiencia a escribir código idiomático y aplicar estándares. — [GitHub](https://github.com/rust-lang/rust-clippy)

Rust combina los aspectos de seguridad y rendimiento de lenguajes de programación ya establecidos con las herramientas y la comunidad de un lenguaje joven. Esto lo convierte en una opción ideal para trabajar en tecnologías de vanguardia que precisan altos niveles de confiabilidad.
