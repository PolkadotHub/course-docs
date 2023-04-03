---
title: Mapas, Colleciones y Manejo de Errores
module: 5
---
# Mapas, Colecciones y Manejo de Errores

En Rust, los mapas son implementados como tipos genéricos. Existen dos tipos de mapas en Rust: HashMap y BTreeMap. Ambos permiten la asignación de valores a claves, pero difieren en la forma en que almacenan los elementos. HashMap utiliza una tabla hash para almacenar los elementos, lo que permite acceso rápido a los elementos por clave, mientras que BTreeMap almacena los elementos en un árbol de búsqueda binario, lo que garantiza que los elementos estén ordenados por clave.

Rust tiene varias colecciones genéricas que pueden almacenar y gestionar diferentes tipos de datos. Estas son algunas de las colecciones más utilizadas en Rust:

- Vector (Vec): una secuencia de elementos del mismo tipo almacenados en un bloque de memoria contiguo.
- Array ([T; N]): una colección de elementos del mismo tipo con una longitud fija y conocida en tiempo de compilación.
- Slice (&[T]): una referencia a una sección contigua de elementos en un vector o en un array.
- Tuple ((T1, T2, ..., Tn)): una secuencia de valores de diferentes tipos.

En Rust, el manejo de errores se realiza mediante el tipo de datos Result<T, E>. Este tipo representa una operación que puede tener éxito y devolver un valor de tipo T, o fallar y devolver un error de tipo E. Los errores se propagan hacia arriba en la pila de llamadas hasta que se manejan o se alcanza la función main.

Para manejar los errores, Rust utiliza el mecanismo de "propagación de errores". Esto significa que en lugar de manejar los errores en el lugar donde ocurren, los errores se propagan hacia arriba en la pila de llamadas hasta que se alcanza un punto donde se puede manejar el error. El manejo de errores se realiza mediante el uso de la expresión match o la palabra clave ?, que se utiliza para propagar los errores hacia arriba en la pila de llamadas.

Para más información y detalles:
[![IMAGE_ALT](https://img.youtube.com/vi/3nfjm5YKPMA/0.jpg)](https://www.youtube.com/watch?v=3nfjm5YKPMA&list=PLnf2S4I9w85P-zimbgpCWJlTJZnY_4TmX&index=4)