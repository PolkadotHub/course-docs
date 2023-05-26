---
title: Fundamentos
module: 2
---

# Fundamentos de Rust

Este módulo tiene como objetivo reforzar conceptos clave de Rust que serán de vital importancia al trabajar con Substrate. Aunque se proporciona una revisión rápida, cada tema debe ser comprendido a fondo.

## Rust Básico

**Tipos de Datos:** Rust incluye varios tipos de datos primitivos y compuestos, como enteros (`i32`, `u32`), punto flotante (`f32`, `f64`), booleanos (`bool`), caracteres (`char`), tuplas y arrays. Recuerda que Rust es fuertemente tipado, y cada variable tiene un tipo específico.

```rust
let entero: i32 = 10;
let flotante: f64 = 10.5;
let booleano: bool = true;
let caracter: char = 'a';
let tupla: (i32, f64, u8) = (500, 6.4, 1);
let array: [i32; 5] = [1, 2, 3, 4, 5];
```

**Flujo de Control:** Rust proporciona varias estructuras de control de flujo, como `if`, `loop`, `while`, y `for`, que te permiten dirigir el flujo de ejecución del código de manera condicional o repetitiva.

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

**Funciones:** Las funciones en Rust aceptan parámetros y pueden devolver valores. Las funciones son definidas con la palabra clave `fn`, seguida por el nombre de la función, los parámetros entre paréntesis, un tipo de retorno, y un bloque de código.

```rust
fn suma(a: i32, b: i32) -> i32 {
    a + b
}

let resultado = suma(5, 10);
println!("El resultado es {}", resultado);
```

**Structs:** Los `structs` en Rust permiten agrupar datos relacionados en un solo tipo compuesto. Puedes crear instancias de estos structs y acceder a sus campos utilizando la notación de punto.

```rust
struct Punto {
    x: i32,
    y: i32,
}

let p = Punto { x: 0, y: 7 };
println!("Punto se encuentra en ({}, {})", p.x, p.y);
```

**Enums:** Los `enums` en Rust te permiten definir un tipo que puede ser uno de varios posibles variantes. Esto es especialmente útil en la manipulación de errores, donde un valor puede representar un resultado exitoso o un tipo específico de error.

```rust
enum Resultado {
    Exito,
    Error(String),
}

let mut resultado = Resultado::Exito;

match resultado {
    Resultado::Exito => println!("Operación completada con éxito!"),
    Resultado::Error(razon) => println!("Error: {}", razon),
}
```

**Módulos:** Los `módulos` en Rust ayudan a organizar y reutilizar código, dividiendo el código en bloques lógicos y control

ando la visibilidad de los elementos del código.

```rust
mod saludo {
    pub fn hola() {
        println!("¡Hola mundo!");
    }
}

fn main() {
    saludo::hola();
}
```

## Comprendiendo la Gestión de Memoria de Rust

**Stack vs Heap:** En Rust, los datos son almacenados en el stack o en el heap, dependiendo de su tamaño y contexto. Los datos en el stack son de tamaño conocido y se almacenan y recuperan rápidamente. Los datos en el heap son de tamaño desconocido en el momento de la compilación o de tamaño potencialmente grande, y requieren una gestión de memoria más compleja.

```rust
let x = 5;  // x se almacena en el stack
let y = Box::new(5); // y se almacena en el heap
```

**Ownership (Propiedad):** El sistema de ownership de Rust controla cuándo y cómo se liberan los recursos de memoria. Recuerda la regla principal de ownership: "Cada valor en Rust tiene una variable propietaria."

```rust
let s1 = String::from("hola");  // s1 es el propietario del recurso
let s2 = s1;  // s2 ahora es el propietario del recurso, s1 ya no es válido
```

**Borrowing y Lifetimes:** El `borrowing` permite acceder a los datos sin tomar ownership, lo que ayuda a compartir y utilizar los datos de forma segura. Los `lifetimes` en Rust aseguran que las referencias sean siempre válidas, evitando problemas como las referencias colgantes.

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calcular_longitud(&s1);
    println!("La longitud de '{}' es {}.", s1, len);
}

fn calcular_longitud(s: &String) -> usize {
    s.len()
}
```

**Movimientos vs Copias:** En Rust, algunos tipos tienen una semántica de copia, mientras que otros tienen una semántica de movimiento. Cuando un valor se mueve, su ownership se transfiere y ya no se puede utilizar desde el lugar original. Cuando un valor se copia, se crea una duplicación independiente del valor original, y ambos pueden usarse de forma independiente.

```rust
let x = 5; // x implementa la trait Copy
let y = x; // y es una copia de x, x aún es válido

let s1 = String::from("hello"); // String no implementa la trait Copy
let s2 = s1; // s2 es un movimiento de s1, s1 ya no es válido
```

# Recursos

Para repasar cualquiera de estos conceptos, te pueden ser útiles los siguientes recursos:

- [Curso de Rust de Polkadot Hub](https://polkadothub.io/rust/0-presentaci%C3%B3n/0-presentation)
- [The Rust Programming Language](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings](https://github.com/rust-lang/rustlings)
- [Rust Cheat Sheet](https://cheats.rs/)
