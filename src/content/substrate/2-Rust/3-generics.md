---
title: Generics
module: 2
---

# 3. Generics

Los **generics**, o tipos genéricos, son una herramienta de Rust que permite la creación de funciones y tipos que pueden adaptarse a varios tipos de datos.
Permiten la reutilización del código y reducen la redundancia.

Por ejemplo, imaginen que necesitamos una función que compare dos elementos de un tipo específico y devuelva el más grande.
Sin generics, tendríamos que escribir funciones separadas para cada tipo posible (i32, f64, etc.).
Con generics, podemos escribir una sola función que trabaje con varios tipos.

```rust
fn max<T: Ord>(x: T, y: T) -> T {
    if x > y { x } else { y }
}

let num_max = max(6, 9); // para i32
let char_max = max('a', 'z'); // para char
```

La sintaxis `T: Ord` se usa para restringir los posibles tipos que va a tomar el generico `T` a solo aquellos que implementen el trait `Ord`.

## Tipos de Datos Genéricos

Los **tipos de datos genéricos** permiten desarrollar definiciones que trabajen con varios posibles tipos.
Al escribir código, podemos especificar que ciertos tipos serán genéricos, es decir, que pueden tomar varios posibles tipos **concretos**.
Los tipos genericos se suelen llamar con solo una letra mayúscula, como `T`, `U`, o `V`, pero pueden tomar cualquier nombre.
Es buena idea usar nombres lo más descriptivos posibles en el caso de que no sea obvio el uso del generico.

Un uso común de los tipos de datos genéricos es en las estructuras de datos.
Por ejemplo, podríamos querer una estructura `Point` que pueda contener coordenadas de diferentes tipos (enteros, flotantes, etc.).

```rust
struct Point<T> {
    x: T,
    y: T,
}

let point_i32 = Point { x: 5, y: 10 }; // Point de i32
let point_f64 = Point { x: 1.0, y: 2.0 }; // Point de f64
```

## Funciones Genéricas

Las **funciones genéricas** son aquellas funciones escritas para trabajar con múltiples tipos de datos. Al igual que con los tipos de datos genéricos, se logra esto a través del uso de parámetros genéricos. En el ejemplo anterior de la función `max`, `T` es un parámetro genérico.

```rust
fn reverse<T>(arr: &[T]) -> Vec<T> where T: Clone {
    let mut rev_arr = Vec::new();
    for i in arr.iter().rev() {
        rev_arr.push(i.clone());
    }
    rev_arr
}

let arr = [1, 2, 3, 4, 5];
let rev = reverse(&arr);
```

La clausula `where` es otra manera de restringir genericos a tipos concretos que implementen un trait particular.

## Estructuras Genéricas

Las **estructuras genéricas** permiten la creación de estructuras de datos que pueden adaptarse a diferentes tipos de datos. Al igual que en el ejemplo de la estructura `Point`, `T` es un parámetro genérico.

Las estructuras genéricas resultan especialmente útiles cuando se combinan con traits para restringir qué tipos pueden ser utilizados con la estructura.

```rust
struct Pair<T> {
    x: T,
    y: T,
}

impl<T: Display + PartialOrd> Pair<T> {
    fn display_largest(&self) {
        if self.x >= self.y {
            println!("The largest is x = {}", self.x);
        } else {
            println!("The largest is y = {}", self.y);
        }
    }
}

let pair = Pair { x: 10, y: 20 };
pair.display_largest();
```

Los generics son una herramienta poderosa y esencial en Rust. Te permiten escribir código que es flexible y reutilizable, al tiempo que conserva la seguridad de tipos. La correcta comprensión y manejo de los generics será fundamental para nuestro trabajo con Substrate.
