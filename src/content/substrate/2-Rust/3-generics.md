---
title: Generics
module: 2
draft: false
---

# Generics

Los **Generics** son una característica indispensable que permite diseñar funciones y tipos que se adaptan a diversos tipos de datos. En lugar de repetir el mismo código para diferentes tipos de datos, podés utilizar los generics para maximizar la reutilización del código y minimizar la redundancia.

Por ejemplo, pensemos que necesitás una función para comparar dos elementos de un tipo específico y devolver el mayor. Sin generics, tendrías que escribir funciones separadas para cada tipo de datos posible (i32, f64, etc.). Sin embargo, con los generics, solo precisás una única función que puede trabajar con diferentes tipos de datos.

```rust
struct Bloque<T> {
    hash: Hash,
    datos: T,
}

let bloque = Bloque { hash: calcular_hash(), datos: datos_bloque };
```

En este caso, `T` es un placeholder para cualquier tipo. Así, podés tener bloques con diferentes tipos de datos sin necesidad de repetir la definición de la estructura para cada tipo.

# Funciones Genéricas

Cuando definís una función que utiliza generics, pones los generics en la firma de la función donde usualmente especificarías los tipos de datos de los parámetros y el valor de retorno. De esta manera, haces que tu código sea más flexible, brindando más funcionalidad a quienes usen tu función y previniendo la duplicación de código.

```rust
fn procesar_transacciones<T: Procesable>(transacciones: Vec<T>) -> Vec<Result<T, Error>> {
    transacciones.into_iter().map(|t| t.procesar()).collect()
}

let resultados = procesar_transacciones(lista_de_transacciones);
```

Acá, `T` representa cualquier tipo que implemente el trait `Procesable`. La función `procesar_transacciones` toma un vector de estos tipos `T` y devuelve un vector de resultados después de procesar cada transacción.

# Estructuras Genéricas

Para usar generics en las definiciones de estructuras, se sigue un procedimiento parecido al de las definiciones de funciones. Primero, declarás el nombre del parámetro de tipo dentro de los ángulos justo después del nombre de la estructura. Luego usás el tipo genérico en la definición de la estructura donde normalmente especificarías tipos de datos concretos.

Las estructuras genéricas son especialmente útiles cuando se combinan con traits para limitar qué tipos pueden ser utilizados con la estructura.

```rust
struct ParDeBloques<T> {
    bloque_anterior: T,
    bloque_siguiente: T,
}

impl<T: Display + PartialOrd> ParDeBloques<T> {
    fn comparar_alturas(&self) {
        if self.bloque_anterior >= self.bloque_siguiente {
            println!("El bloque anterior tiene una altura mayor o igual al bloque siguiente");
        } else {
            println!("El bloque siguiente tiene una mayor altura que el bloque anterior");
        }
    }
}

let par_de_bloques = ParDeBloques { bloque_anterior: obtener_bloque_anterior(), bloque_siguiente: obtener_bloque_siguiente() };

par_de_bloques.comparar_alturas();
```

Aquí, `T` es cualquier tipo que implemente los traits `Display` y `PartialOrd`. Esto nos permite comparar las alturas de dos bloques, sin importar el tipo de datos que estos contengan.

# Enums Genéricos

También podés definir enums para contener tipos de datos genéricos en sus variantes. Esto es útil cuando querés que tu enum pueda contener diferentes tipos de datos.

```rust
enum ResultadoTransaccion<T> {
    Exitosa(T),
    Fallida(String),
}

let resultado: ResultadoTransaccion<i32> = ResultadoTransaccion::Exitosa(1);
```

En este ejemplo, `ResultadoTransaccion` es un enum genérico que puede contener un valor de éxito con un tipo genérico `T`, o un mensaje de error en caso de fallo.

# Métodos Genéricos

Podés implementar métodos en estructuras y enums utilizando tipos genéricos en sus definiciones. Esta característica permite que los métodos operen con diferentes tipos de datos.

```rust
struct Transaccion<T> {
    valor: T,
}

impl<T> Transaccion<T> {
    fn valor_transaccion(&self) -> &T {
        &self.valor
    }
}

let transaccion = Transaccion { valor: 100 };
println!("El valor de la transacción es: {}", transaccion.valor_transaccion());
```

En este caso, `Transaccion` es una estructura genérica que almacena un valor de cualquier tipo. Y `valor_transaccion` es un método genérico que devuelve este valor, sin importar de qué tipo es.
