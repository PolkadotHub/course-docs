---
title: Manejo de Paquetes
module: 4
---
# Manejo de Paquetes

Los paquetes se utilizan para agrupar uno o más crates relacionados entre sí. Un crate es la unidad básica de compilación en Rust, que puede contener módulos y definiciones de tipos.

El nivel de visibilidad de los paquetes y crates en Rust se controla mediante el uso de la palabra clave pub. Si una función, tipo o módulo se declara como público (pub), entonces se puede acceder desde fuera del paquete o crate. Si no se declara como público, entonces solo puede ser utilizado internamente dentro del paquete o crate.

El sistema de gestión de paquetes de Rust se llama "Cargo". Cargo se utiliza para administrar los paquetes y las dependencias, compilar el código y construir los ejecutables y las bibliotecas.

Para crear un nuevo proyecto Rust, se puede usar el comando "cargo new", que creará una nueva carpeta con el nombre del proyecto y la estructura de archivos básica. Dentro de esta carpeta se encuentra el archivo "Cargo.toml", que contiene información sobre el proyecto, sus dependencias y la versión de Rust que se utilizará.

Para agregar dependencias externas a un proyecto, se puede agregar la información en el archivo "Cargo.toml". Al ejecutar el comando "cargo build", Cargo descargará y compilará automáticamente las dependencias. Además, también se pueden especificar versiones específicas de las dependencias y se pueden agregar otras opciones de configuración.

Los paquetes y las dependencias se pueden publicar en el registro público de Rust, "crates.io". De esta manera, otros desarrolladores pueden utilizar las bibliotecas y los paquetes creados y publicados por otros en sus propios proyectos.


Para más información y detalles:
[![IMAGE_ALT](https://img.youtube.com/vi/9YR7Z5UAdKA/0.jpg)](https://www.youtube.com/watch?v=9YR7Z5UAdKA&list=PLnf2S4I9w85P-zimbgpCWJlTJZnY_4TmX&index=5)