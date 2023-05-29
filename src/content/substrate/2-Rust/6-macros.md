---
title: Macros
module: 2
---

# Macros

En esta sección, exploraremos las **Macros**, una característica avanzada de Rust que permite la generación de código en tiempo de compilación, lo que facilita la creación de un código más conciso y manejable.

## Comprendiendo las Macros

Las **macros** en Rust permiten la definición de código reutilizable. A diferencia de las funciones, las macros se expanden en el lugar donde se invocan, como si el código de la macro estuviese directamente allí.

Rust ofrece dos tipos de macros: **Macros Declarativas** y **Macros Procedurales**. Las macros declarativas, definidas con `macro_rules!`, son más comunes y permiten la reescritura de patrones de código. Las macros procedurales, por otro lado, son más complejas y ofrecen la posibilidad de manipular código en tiempo de compilación a través de funciones.

Por ejemplo, una macro declarativa puede generar código para crear una estructura con métodos de acceso a campos:

```rust
macro_rules! struct_with_methods {
    ($name:ident, $($field:ident),*) => {
        struct $name {
            $(
                $field: i32,
            )*
        }

        impl $name {
            $(
                fn $field(&self) -> i32 {
                    self.$field
                }
            )*
        }
    }
}

struct_with_methods!(MyStruct, field1, field2, field3);

let s = MyStruct { field1: 1, field2: 2, field3: 3 };
println!("{}", s.field1());
```

Además, podrías tener una macro que calcula el área de diferentes formas geométricas:

```rust
macro_rules! area {
    (square, $side:expr) => {
        $side * $side
    };
    (rectangle, $width:expr, $height:expr) => {
        $width * $height
    };
}

println!("Area of the square: {}", area!(square, 5));
println!("Area of the rectangle: {}", area!(rectangle, 5, 10));
```

## Macros Avanzadas

El concepto de **higiene en macros** se refiere a cómo Rust maneja los nombres de las variables en las macros para evitar conflictos y confusiones.

`macro_rules!` es una macro que define otras macros declarativas. Este es el método más común para definir macros.

Es posible **importar y exportar macros** de la misma manera que las funciones y estructuras, utilizando las declaraciones `use` y `pub`.

Aquí hay un ejemplo de una macro que se exporta para su uso en otros módulos:

```rust
#[macro_export]
macro_rules! say_hello {
    () => {
        println!("Hello, World!");
    };
}

say_hello!();
```

También podrías tener una macro para generar tests:

```rust
#[macro_export]
macro_rules! generate_tests {
    ($($name:ident: $value:expr,)*) => {
    $(
        #[test]
        fn $name() {
            assert!($value);
        }
    )*
    }
}

generate_tests! {
    test1: 1 + 1 == 2,
    test2: 2 * 2 == 4,
}
```

Las macros pueden parecer desafiantes al principio, pero son una herramienta muy útil que puede hacer tu código más conciso y flexible. Al trabajar con Substrate, nos encontraremos con muchas macros, por lo que es importante familiarizarse con ellas.
