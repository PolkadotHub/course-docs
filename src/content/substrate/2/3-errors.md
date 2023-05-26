---
title: Manejo de Errores
module: 2
---

# Manejo de Errores

Este módulo profundiza en dos conceptos fundamentales de Rust: el manejo avanzado de errores y las pruebas. Un buen entendimiento de estos temas es vital para desarrollar aplicaciones robustas y confiables con Substrate.

## Option y Result

Los tipos **`Option<T>`** y **`Result<T, E>`** en Rust ofrecen formas seguras y eficientes de manejar situaciones donde un valor puede estar ausente y el manejo de errores, respectivamente.

- **`Option<T>`:** Este tipo se utiliza cuando un valor puede o no estar presente. Tiene dos variantes: `Some(T)`, que se usa cuando el valor está presente, y `None`, que se usa cuando el valor está ausente.

```rust
let some_string = Some("Hello, world!");
let absent_string: Option<&str> = None;

match some_string {
    Some(s) => println!("{}", s),
    None => println!("No string"),
}

match absent_string {
    Some(s) => println!("{}", s),
    None => println!("No string"),
}
```

- **`Result<T, E>`:** Este tipo se utiliza para funciones que pueden resultar en un error. Tiene dos variantes: `Ok(T)`, que se usa cuando la función ha tenido éxito, y `Err(E)`, que se usa cuando la función ha fallado.

```rust
fn dividir(numerador: f64, denominador: f64) -> Result<f64, &'static str> {
    if denominador == 0.0 {
        Err("No se puede dividir por cero")
    } else {
        Ok(numerador / denominador)
    }
}

let resultado = dividir(5.0, 0.0);

match resultado {
    Ok(v) => println!("El resultado es {}", v),
    Err(e) => println!("Error: {}", e),
}
```

## Manejo Avanzado de Errores

Manejar errores de forma adecuada es crucial para asegurar la robustez y fiabilidad de tu código.

- **Tipos de Errores Personalizados:** Crear tus propios tipos de errores puede ayudar a proporcionar más detalles sobre los problemas en tu código. Esta práctica puede facilitar la depuración y mejorar la legibilidad de tu código.

```rust
#[derive(Debug)]
enum MiError {
    DivisionPorCero,
    NumeroNegativo,
}

fn chequear_numero(num: i32) -> Result<i32, MiError> {
    if num < 0 {
        Err(MiError::NumeroNegativo)
    } else if num == 0 {
        Err(MiError::DivisionPorCero)
    } else {
        Ok(num)
    }
}

let resultado = chequear_numero(-5);
match resultado {
    Ok(v) => println!("El número es {}", v),
    Err(e) => println!("Error: {:?}", e),
}
```

- **Usando el Operador "?":** En Rust, el operador "?" se puede usar para propagar errores hacia arriba en la pila de llamadas.

```rust
fn funcion_con_error() -> Result<(), &'static str> {
    otra_funcion_con_error()?;
    Ok(())
}

fn otra_funcion_con_error() -> Result<(), &'static str> {
    Err("¡Ups! Algo salió mal.")
}

let resultado = funcion_con_error();
match resultado {
    Ok(_) => println!("Todo funcionó bien."),
    Err(e) => println!("Error: {}", e),
}
```

En la próxima parte del curso, discutiremos sobre las pruebas en Rust, que es una herramienta fundamental para asegurar que tu código funcione como se espera.
