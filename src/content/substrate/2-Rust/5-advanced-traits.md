---
title: Traits Avanzados
module: 2
draft: false
---

# Marcadores

Los marcadores son traits sin métodos que se usan para marcar que ciertos tipos satisfacen propiedades específicas. Sirven para categorizar o marcar un tipo.

```rust
trait Validada {}

struct Transaccion;

impl Validada for Transaccion {}
```

Por ejemplo, podríamos tener marcadores como `Validada` o `Pendiente`, que nos permitan identificar el estado de las transacciones de forma rápida y clara.

# Sobrecarga de Operadores

La sobrecarga de operadores en Rust se realiza mediante la implementación de traits específicos que se corresponden con los operadores. En otras palabras, cada operador en Rust tiene un trait asociado y podemos sobrecargar dicho operador para un tipo específico implementando el trait correspondiente.

```rust
use std::ops::Add;

struct Transaccion {
    valor: i32,
}

impl Add for Transaccion {
    type Output = Self;

    fn add(self, other: Self) -> Self {
        Self {
            valor: self.valor + other.valor,
        }
    }
}
```

Podríamos sobrecargar el operador de suma para agregar o acumular transacciones a un bloque. Esto nos permitiría calcular fácilmente el valor total de las transacciones de un bloque.

# Coerción y Traits Deref

El trait `Deref` nos permite personalizar el comportamiento de desreferenciación de los punteros. En otras palabras, podemos definir lo que sucede cuando usamos el operador `*` en un tipo.

```rust
use std::ops::Deref;

struct MiBloque<T>(T);

impl<T> Deref for MiBloque<T> {
    type Target = T;

    fn deref(&self) -> &T {
        &self.0
    }
}
```

Este trait podría ser útil cuando estamos manipulando punteros a bloques de datos o transacciones. Podríamos usarlo para acceder directamente a los datos o las transacciones de un bloque, por ejemplo.

# From e Into

Los traits `From` y `Into` se utilizan para la conversión entre tipos en Rust. Al implementar `From`, automáticamente obtenemos la implementación del trait `Into`.

```rust
// En el palet de transacciones regulares
pub struct TransaccionRegular {
    remitente: AccountId,
    destinatario: AccountId,
    cantidad: Balance,
}

// En el palet de transacciones premium
pub struct TransaccionConPermisos {
    remitente: AccountId,
    destinatario: AccountId,
    cantidad: Balance,
    privilegios: Vec<Permiso>,
}

impl From<TransaccionRegular> for TransaccionPremium {
    fn from(t: TransaccionRegular) -> Self {
        TransaccionPremium {
            remitente: t.remitente,
            destinatario: t.destinatario,
            cantidad: t.cantidad,
            privilegios: vec![Permiso::AcelerarTransaccion],
        }
    }
}
```

Podríamos necesitar convertir entre diferentes tipos de transacciones o bloques e implementar estos traits nos permitiría hacer estas conversiones de manera segura y clara.

# Trait Drop

El trait `Drop` nos permite personalizar lo que sucede cuando un valor sale del alcance. Es decir, nos permite definir qué acción se ejecuta cuando un valor de un tipo específico se descarta.

```rust
struct Bloque;

impl Drop for Bloque {
    fn drop(&mut self) {
        println!("El bloque fue removido");
    }
}
```

Podríamos usar el trait `Drop` para liberar recursos asociados a un bloque cuando este ya no es necesario, o para realizar ciertas acciones de limpieza, como eliminar las transacciones asociadas al bloque de una lista de transacciones pendientes, por ejemplo.

# AsRef y AsMut

Los traits `AsRef` y `AsMut` se usan para convertir de manera segura entre referencias de tipos. Son particularmente útiles cuando queremos una referencia a un tipo específico a partir de un tipo más general.

```rust
struct Transaccion<'a>(&'a str);

impl<'a> AsRef<str> for Transaccion<'a> {
    fn as_ref(&self) -> &str {
        self.0
    }
}
```

Podríamos utilizar estos traits para convertir nuestras transacciones a cadenas de texto para visualización, almacenamiento o logging.
