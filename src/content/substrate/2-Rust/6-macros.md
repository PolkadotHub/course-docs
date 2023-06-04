---
title: Macros
module: 2
draft: false
---

# Macros

Las macros son una forma de escribir código que genera otro código, un concepto conocido como metaprogramación. La metaprogramación es útil para reducir la cantidad de código que tenés que escribir y mantener.

Las macros pueden aceptar un número variable de parámetros: podés llamar a `println!("hola")` con un argumento o `println!("hola {}", nombre)` con dos argumentos. Se expanden antes de que el compilador interprete el significado del código, por lo que una macro puede, por ejemplo, implementar un trait en un tipo dado.

No obstante, las definiciones de macros son más complejas que las definiciones de funciones porque estás escribiendo código que genera código. Debido a esto, las definiciones de macros suelen ser difíciles de leer, entender y mantener.

# Macros Declarativas

Las macros declarativas te permiten escribir algo similar a una expresión match. Las macros también comparan un valor con patrones que están asociados con un código particular: en esta situación, el valor es el código fuente literal de Rust pasado a la macro; los patrones se comparan con la estructura de ese código fuente; y el código asociado con cada patrón, cuando se corresponde, reemplaza el código pasado a la macro. Todo esto sucede durante la compilación.

Para definir una macro, usás `macro_rules!`. Por ejemplo, la siguiente macro:

```rust
macro_rules! agregar_transaccion {
    ($bloque:expr, $transaccion:expr) => {{
        $bloque.transacciones.push($transaccion);
    }};
}

agregar_transaccion!(bloque, transaccion);
```

Esta macro `agregar_transaccion!` toma un bloque y una transacción, y agrega la transacción al bloque. La idea es simplificar el código y evitar errores al interactuar con los bloques de la cadena.

# Macros Procedurales

Las macros procedurales funcionan más como funciones. Aceptan código como entrada, lo operan y generan código como salida, es decir, modifican o generan código durante la fase de compilación. Hay tres tipos de macros procedurales:

- Custom `derive`
- De tipo Atributo
- De tipo Función

La creación de macros procedurales requiere que sus definiciones residan en su propio crate con un tipo de crate especial.

```rust
use proc_macro;

#[proc_macro]
pub fn crear_bloque(input: TokenStream) -> TokenStream {
    // En este punto se realizaría el procesamiento de input y se generaría el código necesario para crear un nuevo bloque.
}
```

La función que define una macro procedural recibe un `TokenStream` como entrada y produce un `TokenStream` como salida. El tipo TokenStream está definido por el crate `proc_macro` que viene incluido con Rust y representa una secuencia de tokens. Esta es la esencia de la macro: el código fuente sobre el que opera la macro compone el `TokenStream` de entrada y el código que produce la macro es el `TokenStream` de salida.

# Custom `derive`

```rust
#[derive(Debug)]
struct Bloque {
    hash: Hash,
    transacciones: Vec<Transaccion>,
}
```

Acá, `Debug` es una macro procedural personalizada que automáticamente añade la implementación requerida para poder imprimir la estructura `Bloque` con fines de depuración. Esto nos permite utilizar `{:?}` o `{:#?}` en nuestra macro `println!` para imprimir los detalles del bloque.

# Macros de Tipo Atributo

Las macros de tipo atributo son similares a las anotaciones en otros lenguajes. Estas macros se sitúan antes de un struct, enum o función para agregar o modificar comportamientos. Las macros de tipo atributo son parecidas a las macros personalizadas `derive`, pero en lugar de generar código para el atributo `derive`, permiten la creación de nuevos atributos.

Por ejemplo, podés usar la macro `#[test]` para marcar una función como una función de prueba.

```rust
#[test]
fn test_hash_bloque() {
    let bloque = Bloque { hash: Hash::nuevo(), transacciones: Vec::nuevo() };
    // Realizar afirmaciones sobre el bloque
}
```

Acá, `#[test]` es una macro de tipo atributo que le indica al compilador que la siguiente función es una prueba unitaria. Esto permite a Rust ejecutar la función como una prueba y reportar si la prueba fue exitosa o falló.

# Macros de Tipo Función

Consideremos el ejemplo de una macro de tipo función `crear_bloque!`. Esta macro podría ser utilizada de la siguiente forma:

```rust
let bloque = crear_bloque! {
    hash: calcular_hash(),
    transacciones: vec![
        Transaccion { remitente: "Alice".into(), destinatario: "Bob".into(), cantidad: 50 },
        Transaccion { remitente: "Bob".into(), destinatario: "Alice".into(), cantidad: 25 },
    ]
};
```

En este ejemplo, la macro `crear_bloque!` genera un bloque con un hash y un vector de transacciones. La implementación de la macro podría verse de la siguiente manera:

```rust
#[proc_macro]
pub fn crear_bloque(input: TokenStream) -> TokenStream {
    // Acá se realizaría el procesamiento del input y se generaría el código necesario para crear un nuevo bloque.
}
```

En este caso, la macro recibe los tokens que están dentro de los paréntesis (el hash y las transacciones) y produce el código necesario para crear un nuevo bloque.
