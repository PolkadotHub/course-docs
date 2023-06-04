---
title: Fundamentos
module: 2
draft: false
---

# Fundamentos de Rust

Este módulo tiene como objetivo reforzar conceptos clave de Rust que serán de vital importancia al trabajar con Substrate. Aunque se proporciona una revisión rápida, cada tema debe ser comprendido a fondo.

## Tipos de Datos

Rust incluye varios tipos de datos primitivos y compuestos, como enteros (`i32`, `u32`), punto flotante (`f32`, `f64`), booleanos (`bool`), caracteres (`char`), tuplas y arrays. Recuerda que Rust es fuertemente tipado, y cada variable tiene un tipo específico.

```rust
let entero: i32 = 10;

let flotante: f64 = 10.5;

let booleano: bool = true;

let caracter: char = 'a';

let tupla: (i32, f64, u8) = (500, 6.4, 1);

let array: [i32; 5] = [1, 2, 3, 4, 5];
```

## Control de Flujo

Rust proporciona varias estructuras de control de flujo, como `if`, `loop`, `while`, y `for`, que te permiten dirigir el flujo de ejecución del código de manera condicional o repetitiva.

```rust
let numero = 6;

if numero % 2 == 0 {
    println!("El número es par.");
} else {
    println!("El número es impar.");
}

let mut contador = 0;

while contador < 5 {
    println!("contador = {}", contador);
    contador += 1;
}

for numero in [1, 2, 3, 4, 5].iter() {
    println!("el número es: {}", numero);
}
```

## Funciones

Las funciones en Rust aceptan parámetros y pueden devolver valores. En el siguiente ejemplo, la función `calcular_hash` toma como entrada una cadena de caracteres y retorna un valor de hash.

```rust
use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

fn calcular_hash<T: Hash>(t: &T) -> u64 {
    let mut hasher = DefaultHasher::new();
    t.hash(&mut hasher);
    hasher.finish()
}

let data = "datos de la transacción";
let hash_resultado = calcular_hash(&data);

println!("El hash es {}", hash_resultado);
```

## Structs

Los `structs` en Rust permiten agrupar datos relacionados en un solo tipo compuesto. Por ejemplo, un struct `Transaccion` que agrupa datos como el remitente, el destinatario y la cantidad de la transacción.

```rust
struct Transaccion {
    remitente: String,
    destinatario: String,
    cantidad: u64,
    data: Vec<u8>,
}

let transaccion = Transaccion { remitente: String::from("Satoshi"), destinatario: String::from("Hal"), cantidad: 50, data: Vec::new()};

println!("La transacción es de {} a {} por {} satoshis", transaccion.remitente, transaccion.destinatario, transaccion.cantidad);
```

## Enums

Los `enums` en Rust te permiten definir un tipo que puede ser uno de varios posibles variantes. Por ejemplo un enum `TransaccionEstado` que representa si una transacción ha sido confirmada o está pendiente.

```rust
enum TransaccionEstado {
    Confirmada,
    Pendiente,
}

let estado_transaccion = TransaccionEstado::Pendiente;

match estado_transaccion {
    TransaccionEstado::Confirmada => println!("La transacción ha sido confirmada!"),
    TransaccionEstado::Pendiente => println!("La transacción está pendiente..."),
}
```

## Módulos

Los `módulos` en Rust ayudan a organizar y reutilizar código, dividiendo el código en bloques lógicos y controlando la visibilidad de los elementos del código. Por ejemplo un módulo `crypto` que proporciona funciones para trabajar con criptografía.

```rust
mod crypto {
    pub fn generar_clave_privada() {
        println!("Clave privada generada!");
    }
}

fn main() {
    crypto::generar_clave_privada();
}
```

# Gestión de Memoria

## Stack vs Heap

En Rust, los datos se almacenan en el stack o en el heap, dependiendo de su tamaño y contexto. `Transaccion` podría almacenarse en el heap.

```rust
struct Transaccion {
    remitente: [u8; 32],
    destinatario: [u8;32],
    cantidad: u64,
}

let transaccion = Box::new(Transaccion { remitente: [0xab;32], destinatario: [0xcd;32], cantidad: 50 });
```

## Ownership

El sistema de ownership de Rust controla cuándo y cómo se liberan los recursos de memoria. Cada bloque podría ser propiedad de un objeto `Blockchain`.

```rust
let bloque = Bloque::new();  // bloque es el propietario del recurso
let blockchain = bloque;  // blockchain ahora es el propietario del recurso, bloque ya no es válido
```

## Borrowing y Lifetimes

El `borrowing` permite acceder a los datos sin tomar ownership, lo que ayuda a compartir y utilizar los datos de forma segura. Por ejemplo podes realizar el borrow de datos de una transacción para su procesamiento.

```rust
fn main() {
    let transaccion = Transaccion::default();
    let longitud = calcular_longitud(&transaccion);
    println!("La longitud de '{}' es {}.", transaccion, longitud);
}

fn calcular_longitud(t: &Transaccion) -> usize {
    Transaccion.data.len()
}
```

## Move vs Copy

Algunas transacciones pueden requerir una semántica de movimiento, mientras que otras pueden requerir una semántica de copia. Cuando se copia una transacción, se crea una duplicación independiente de la transacción original.

```rust
let transaccion1 = Transaccion::default(); // Transaccion no implementa el trait Copy
let transaccion2 = transaccion1; // transaccion2 es un movimiento de transaccion1, transaccion1 ya no es válido

let nonce = 5; // nonce implementa el trait Copy
let nonce_copia = nonce; // nonce_copia es una copia de nonce, nonce aún es válido
```

# Recursos

Si sos nuevo en rust o necesitas repasar cualquiera de estos conceptos, te pueden ser útiles los siguientes recursos:

- [Curso de Rust de Polkadot Hub](https://polkadothub.io/rust/0-presentaci%C3%B3n/0-presentation)
- [The Rust Programming Language](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings](https://github.com/rust-lang/rustlings)
- [Rust Cheat Sheet](https://cheats.rs/)
