---
title: Traits
module: 2
draft: false
---

# Traits

Los traits proporcionan un medio para definir comportamientos compartidos entre diferentes tipos de datos. Estos son similares a las interfaces en otros lenguajes, pero con algunas características únicas que hacen de los traits una herramienta poderosa.

Representan un conjunto de firmas de métodos. Cuando un tipo de dato implementa un trait, está garantizando un comportamiento específico. Un trait como `Bloque` podría definir un método para validar la integridad de un bloque.

```rust
pub trait Bloque {
    fn validar(&self) -> bool;
}
```

# Implementación

La implementación de un trait en Rust es similar a la definición de métodos ordinarios. Supongamos que tenemos dos tipos de bloques: `BloqueGenesis` y `BloqueRegular`.

```rust
pub struct BloqueGenesis {
    pub hash: H256,
}

pub struct BloqueRegular {
    pub hash: H256,
    pub parent_hash: H256,
}

impl Bloque for BloqueGenesis {
    fn validar(&self) -> bool {
        // Para el BloqueGenesis, siempre devolvemos verdadero
        true
    }
}

impl Bloque for BloqueRegular {
    fn validar(&self) -> bool {
        // Aquí validamos que el parent_hash no está vacío
        // Por simplicidad, asumimos que si el hash no está vacío, es válido
        !self.parent_hash.is_zero()
    }
}
```

Aquí, `BloqueGenesis` y `BloqueRegular` implementan el trait `Bloque`, cada uno proporcionando su propia versión del comportamiento `validar`.

# Uso de Traits

Una vez implementado un trait, puedes usar sus métodos en instancias de los tipos que implementan dicho trait.

```rust
let genesis = BloqueGenesis {
    hash: H256::random(),
};

let bloque = BloqueRegular {
    hash: H256::random(),
    parent_hash: genesis.hash,
};

println!("Validación de BloqueGenesis: {}", genesis.validar());
println!("Validación de BloqueRegular: {}", bloque.validar());
```

# Implementaciones por Defecto

Los traits permiten definir implementaciones por defecto para algunos o todos sus métodos. Al implementar el trait en un tipo específico, puedes decidir mantener o cambiar el comportamiento por defecto de los métodos.

Por ejemplo, podríamos tener un método para verificar si un bloque es de tipo genesis, que por defecto retorna falso.

```rust
pub trait Bloque {
    fn es_genesis(&self) -> bool {
        false
    }

    fn validar(&self) -> bool;
}
```

Luego, al implementar `Bloque` para `BloqueGenesis`, podemos redefinir `es_genesis` para retornar `true`.

```rust
impl Bloque for BloqueGenesis {
    fn es_genesis(&self) -> bool {
        true
    }

    fn validar(&self) -> bool {
        true
    }
}
```

De esta forma, cada tipo que implemente el trait tiene la capacidad de personalizar su comportamiento.

# Traits como Parámetros

Los traits también pueden ser utilizados para definir funciones que acepten múltiples tipos de datos. Por ejemplo, podríamos definir una función `notificar` que acepte cualquier tipo que implemente el trait `Resumen`, que podría estar implementado por varias estructuras.

```rust
pub trait Resumen {
    fn resumir(&self) -> String;

    fn notificar(item: &impl Resumen) {
        println!("¡Bloque procesado! {}", item.resumir());
    }
}
```

En lugar de un tipo concreto para el parámetro `item`, especificamos `impl` y el nombre del trait. Esto significa que `item` puede ser de cualquier tipo que implemente el trait `Resumen`.

# Trait Bounds

Los trait bounds son una sintaxis que permite más precisión y flexibilidad. Por ejemplo, si necesitás que ambos parámetros sean del mismo tipo, tendrías que usar un trait bound.

```rust
pub fn compara_bloques<T: Hashable>(bloque1: &T, bloque2: &T) {}
```

Aquí, el tipo genérico `T` es el tipo de los parámetros `bloque1` y `bloque2`, limitando la función a que el tipo concreto del valor pasado como argumento para `bloque1` y `bloque2` sea el mismo.

Es posible especificar más de un trait bound. Por ejemplo, si queremos que `compara_bloques` utilice el formateo de visualización, así como `hash` en el `bloque`, podemos especificar en la definición de `compara_bloques` que `bloque` debe implementar tanto `Hashable` como `Display`:

```rust
pub fn compara_bloques(bloque: &(impl Hashable + Display)) {}
```

# Cláusulas Where

Existe otra forma de especificar los trait bounds, utilizando la cláusula `where` después de la firma de la función:

```rust
fn procesar_transacciones<T, U>(t: &T, u: &U) -> i32
where
    T: Encriptable + Clone,
    U: Clone + Debug,
{}
```

La firma de esta función es menos confusa, ya que el nombre de la función, la lista de parámetros y el tipo de retorno están juntos, parecido a una función sin límites de traits.

# Retornando Traits

Podés utilizar la sintaxis `impl Trait` para retornar un valor de un tipo que implemente un trait. Por ejemplo, si queremos devolver una transacción que implementa el trait `Encriptable`:

```rust
fn retorna_encriptable() -> impl Encriptable {
    Transaccion {
        emisor: String::from("Satoshi"),
        receptor: String::from("Hal"),
        monto: 5,
    }
}
```

> Tené en cuenta que solo podés usar `impl Trait` si estás devolviendo un único tipo.

Por ejemplo, si se está usando `impl Encriptable` como el tipo de retorno, podrías retornar una `Transaccion` como en el ejemplo dado, pero no podrías retornar, una `Transaccion` en una parte de tu función y un `Bloque` en otra, a menos que ambos sean del mismo tipo concreto.

La razón detrás de esto es que Rust necesita conocer en tiempo de compilación el tamaño y la disposición exacta de los tipos que está manejando. Como diferentes tipos pueden tener tamaños y disposiciones diferentes, `impl Trait` en el valor de retorno de una función solo puede referirse a un único tipo.

# Métodos Condicionales

Usando trait bounds con bloques `impl` que usan parámetros de tipos genéricos, podés implementar métodos de manera condicional para tipos que implementen los traits especificados:

```rust
use std::fmt::Display;

struct Bloque<T> {
    hash_previo: T,
    hash_actual: T,
}

impl<T> Bloque<T> {
    fn nuevo(hash_previo: T, hash_actual: T) -> Self {
        Self { hash_previo, hash_actual }
    }
}

impl<T: Display + PartialOrd> Bloque<T> {
    fn cmp_display(&self) {
        if self.hash_previo >= self.hash_actual {
            println!("El hash más reciente es hash_previo = {}", self.hash_previo);
        } else {
            println!("El hash más reciente es hash_actual = {}", self.hash_actual);
        }
    }
}
```

En este caso, `Bloque<T>` siempre tiene el método `nuevo`. Pero `Bloque<T>` tiene el método `cmp_display` solo si `T` implementa `Display` y `PartialOrd`.

# Métodos Solapados

Podés encontrarte con casos en los que diferentes traits tienen un método con el mismo nombre. Imaginate que tenemos dos traits `Validar` y `Verificar` que ambos tienen un método `chequear`:

```rust
trait Validar {
    fn chequear(&self);
}

trait Verificar {
    fn chequear(&self);
}
```

Y queremos implementar ambos traits para una misma estructura `Bloque`:

```rust
struct Bloque;

impl Validar for Bloque {
    fn chequear(&self) {
        println!("Validando el bloque");
    }
}

impl Verificar for Bloque {
    fn chequear(&self) {
        println!("Verificando el bloque");
    }
}
```

Si intentás llamar a `chequear` en un `Bloque`, Rust no sabrá a cuál de los dos métodos te estás refiriendo:

```rust
let bloque = Bloque;
bloque.chequear();  // ¿Validar o Verificar?
```

Para desambiguar estas situaciones, debemos usar una sintaxis de desambiguación de función completa, que incluye el nombre del trait del cual deseamos llamar ese método:

```rust
<Bloque as Validar>::chequear(&bloque);
<Bloque as Verificar>::chequear(&bloque);
```

En este código, llamamos explícitamente al método `chequear` que pertenece al trait `Validar` y luego al que pertenece al trait `Verificar`.
