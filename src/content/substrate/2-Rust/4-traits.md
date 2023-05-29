---
title: Traits
module: 2
---

# Traits Avanzados

En este módulo, vamos a profundizar en el sistema de **traits** de Rust. Los traits son una forma de definir comportamientos que pueden ser compartidos por diferentes tipos.

## Profundizando en Traits

- **Definición e Implementación de Traits:** Los traits pueden ser vistos como interfaces que definen un conjunto de métodos que describen cierto comportamiento. Para definir un trait, usamos la palabra clave `trait`, seguida del nombre del trait y un bloque de código que contiene los métodos.

```rust
trait Animal {
    fn hacer_sonido(&self);
}

struct Perro;
struct Gato;

impl Animal for Perro {
    fn hacer_sonido(&self) {
        println!("¡Guau!");
    }
}

impl Animal for Gato {
    fn hacer_sonido(&self) {
        println!("¡Miau!");
    }
}
```

- **Límites de Traits y Cláusulas Where:** Los límites de traits y las cláusulas `where` se utilizan para definir restricciones en los tipos que se pueden usar con ciertas funciones o implementaciones de traits.

```rust
trait Printable {
    fn format(&self) -> String;
}

fn print<T: Printable>(item: T) {
    println!("{}", item.format());
}

// con clausula where
fn print<T>(item: T) where T: Printable {
    println!("{}", item.format());
}
```

## Tipos Asociados y Objetos Trait

- **Tipos Asociados:** Los tipos asociados nos permiten conectar un tipo con un trait de manera que no tengamos que especificar el tipo cada vez que utilizamos el trait.

```rust
trait Animal {
    type Sonido;
    
    fn hacer_sonido(&self) -> Self::Sonido;
}
```

- **Objetos Trait:** Los objetos trait nos permiten tratar los traits como si fueran tipos concretos. 

```rust
trait Animal {
    fn hacer_sonido(&self);
}

fn hacer_sonido(animal: &dyn Animal) {
    animal.hacer_sonido();
}
```

## Traits Avanzados

- **Traits de Marcadores:** Los traits de marcadores son traits sin métodos que se utilizan para marcar tipos que cumplen con ciertas propiedades. El ejemplo más común de esto en la biblioteca estándar de Rust es el trait `Copy`.

```rust
trait Marcador {}

struct MiTipo;

impl Marcador for MiTipo {}
```

- **Sobrecarga de Operadores:** La sobrecarga de operadores se realiza mediante la implementación de ciertos traits que corresponden a los operadores. 

```rust
use std::ops::Add;

struct Punto {
    x: i32,
    y: i32,
}

impl Add for Punto {
    type Output = Self;

    fn add(self, other: Self) -> Self {
        Self {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}
```

- **Coerción y Traits Deref:** El trait `Deref` permite personalizar el comportamiento de la desreferenciación de los punteros.

```rust
use std::ops::Deref;

struct MiBox<T>(T);

impl<T> Deref for MiBox<T> {
    type Target = T;

    fn deref(&self) -> &T {
        &self.0
    }
}
```
