---
title: Manejo de Errores
module: 2
---

# 3. Manejo de Errores

Este módulo profundiza en un concepto fundamental en Rust: el manejo de errores.
Los errores ocurren por diversas razones, así que hay que saber cómo manejarlos de la mejor manera posible.

## Option y Result

Los enums **`Option<T>`** y **`Result<T, E>`** en Rust ofrecen formas seguras y eficientes de manejar situaciones donde un valor puede estar ausente y el manejo de errores, respectivamente.

- **`Option<T>`:** Este tipo se utiliza cuando un valor puede o no estar presente. Tiene dos variantes: `Some(T)`, que se usa cuando el valor está presente, y `None`, que se usa cuando el valor está ausente.

```rust
let some_string = Some("Hello, world!");
let absent_string: Option<&str> = None;

match some_string {
    Some(s) => println!("{}", s),
    None => println!("No string"),
} // "Hello, world!"

match absent_string {
    Some(s) => println!("{}", s),
    None => println!("No string"),
} // "No string"
```

- **`Result<T, E>`:** Este tipo se utiliza para funciones que pueden resultar en un error. Tiene dos variantes: `Ok(T)`, que se usa cuando la función ha tenido éxito, y `Err(E)`, que se usa cuando la función ha fallado.

```rust
fn dividir(numerador: f64, denominador: f64) -> Result<f64, &'static str> {
    if denominador == 0.0 {
        Err("No se puede dividir entre cero")
    } else {
        Ok(numerador / denominador)
    }
}

let resultado = dividir(5.0, 0.0);

match resultado {
    Ok(v) => println!("El resultado es {}", v),
    Err(e) => println!("Error: {}", e),
} // "Error: No se puede dividir entre cero"
```

## Manejo Avanzado de Errores

Manejar errores de forma adecuada es crucial para asegurar la robustez y fiabilidad de tu código.

### Tipos de Errores Personalizados

Crear tus propios tipos de errores puede ayudar a proporcionar más detalles sobre los problemas cuando surjan.
Esta práctica puede facilitar la depuración y mejorar la legibilidad de tu código.

```rust
#[derive(Debug)]
enum MiError {
    DivisionEntreCero,
    NumeradorNegativo,
    DenominadorNegativo,
}

fn division_positiva(numerador: i32, denominador: i32) -> Result<i32, MiError> {
    if numerador < 0 {
        Err(MiError::NumeradorNegativo)
    } else if denominador < 0 {
        Err(MiError::DenominadorNegativo)
    } else if denominador == 0 {
        Err(MiError::DivisionEntreCero)
    } else {
        Ok(numerador / denominador)
    }
}

let resultado = division_positiva(6, -2);
match resultado {
    Ok(v) => println!("El resultado es {}", v),
    Err(e) => println!("Error: {:?}", e),
} // "Error: DenominadorNegativo"
```

### Operador "?"

En Rust, el operador "?" se puede usar para propagar errores hacia arriba en la pila de llamadas.

```rust
fn genera_error() -> Result<(), &'static str> {
    Err("¡Ups! Algo salió mal.")
}

fn propaga_error() -> Result<(), &'static str> {
    genera_error()?;
    Ok(())
}

let resultado = propaga_error();
match resultado {
    Ok(_) => println!("Todo funcionó bien."),
    Err(e) => println!("Error: {}", e),
} // "Error: ¡Ups! Algo salió mal."
```

### Trait `From`

A veces, es necesario convertir errores en otros, para esto, el trait `From` es muy útil.
El operador `?` intenta convertir el error sobre el que es llamado al error necesario basandose en la firma de la función.
Para hacer esto, usa la implementación del trait `From`.

```rust
enum UnError {
    DivisionEntreCero,
    NumeroDemasiadoGrande,
}

enum OtroError {
    ErrorAritmetico
}

impl From<UnError> for OtroError {
    fn from(valor: UnError) -> OtroError {
        match valor {
            UnError::DivisionEntreCero | UnError::NumeroDemasiadoGrande =>
                OtroError::ErrorAritmetico
        }
    }
}

fn genera_error() -> Result<(), UnError> {
    Err(UnError::DivisionEntreCero)
}

fn transforma_error() -> Result<(), OtroError> {
    genera_error()?;
    Ok(())
}
```

En el próximo capítulo, veremos un tema muy importante para asegurar el correcto funcionamiento de nuestros programas, las pruebas.
