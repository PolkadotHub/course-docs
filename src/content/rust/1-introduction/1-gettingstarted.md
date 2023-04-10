---
title: Introducción
module: 1
---
# Primeros Pasos con RUST

Comenzar con Rust puede ser intimidante al principio, pero con un poco de práctica, te darás cuenta de que es un lenguaje de programación muy poderoso y seguro. Queremos dejar algunos tips para que puedas iniciarte en él, así mismo, hemos agregado un video que permitirá tener un poco más de detalles al respecto.

## Instalación del ambiente 

Lo primero que necesitas hacer es instalar Rust en tu computadora. Puedes hacerlo descargando el instalador oficial desde el sitio web de Rust [Instalación](https://www.rust-lang.org/es/tools/install). Este instalador también incluye Cargo, el gestor de paquetes para Rust, que te permitirá descargar e instalar bibliotecas y herramientas adicionales.

Una vez instalado, puedes verificar si Rust está instalado correctamente escribiendo `rustc --version` en la línea de comandos. Si se muestra la versión del compilador de Rust, todo está listo para comenzar a programar.

## Tipos de datos

Una vez que tengas Rust instalado, puedes empezar a programar. Rust es un lenguaje de programación estáticamente tipado, lo que significa que el tipo de una variable debe ser declarado antes de su uso. Los tipos básicos de Rust incluyen:

- i32 y u32: enteros con y sin signo de 32 bits, respectivamente.
- i64 y u64: enteros con y sin signo de 64 bits, respectivamente.
- f32 y f64: números de punto flotante de 32 y 64 bits, respectivamente.
- bool: valor booleano, puede ser verdadero (true) o falso (false).
- char: un solo carácter Unicode.

## Estructuras de selección

En Rust, puedes utilizar la estructura > if para tomar decisiones en tu código. La sintaxis es similar a otros lenguajes de programación:

```rust
let x = 5;

if x < 10 {
    println!("x es menor que 10");
} else {
    println!("x es mayor o igual a 10");
}
```

## Estructuras de repetición
Para repetir un bloque de código en Rust, puedes utilizar la estructura loop. Por ejemplo:

```rust

let mut x = 0;

loop {
    println!("El valor de x es {}", x);
    x += 1;
    
    if x > 10 {
        break;
    }
}

```

También puedes utilizar las estructuras while y for para repetir un bloque de código. Por ejemplo:

```rust
let mut x = 0;

while x < 10 {
    println!("El valor de x es {}", x);
    x += 1;
}

for i in 0..10 {
    println!("El valor de i es {}", i);
}
```

Para más información y detalles:
[![IMAGE_ALT](https://img.youtube.com/vi/MXQsZMi6hxs/0.jpg)](https://www.youtube.com/watch?v=MXQsZMi6hxs&list=PLnf2S4I9w85P-zimbgpCWJlTJZnY_4TmX)