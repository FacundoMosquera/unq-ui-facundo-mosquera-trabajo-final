# Preguntados
El presente proyecto simula un juego de preguntados (trivia quiz), donde el usuario podrá elegir en el menú una dificultad para las preguntas y proceder a contestar las mismas.

## Pre-requerimientos
-Tener instalado git bash
-Tener instalado node.js

## Instalación
El primer paso para poder jugar es instalar el proyecto localmente. Para esto deberemos clonar el repositorio en una carpeta de nuestro sistema.
La forma más sencilla de clonarlo es copiando la URL que nos proporciona el botón verde "Code<>", darle click derecho al lugar del directorio que en donde querramos tener el repositorio y ejecutar git bash. Una vez abierta la terminal, basta con ejecutar el commando [git clone "url"], donde en el lugar de "url" irá la dirección que copiamos.

![Imagen de code<> de github](https://docs.github.com/assets/cb-60499/images/help/repository/https-url-clone-cli.png)

El último paso de nuestra instalación consiste en entrar a la carpeta del repositorio creado recientemente, abrir git bash dentro y ejecutar la linea [npm install]. Esto descargará las dependencias necesarias para poder levantar el proyecto.

Hecho esto tendremos el proyecto instalado en nuestra computadora, para ejecutarlo, deberemos introducir la linea [npm run dev] en nuestra terminal de git.

## ¿Cómo jugar?
Levantado el proyecto, iremos a la dirección que nos indicará la consola (generalmente el localhost:5173) y nos recibirá el menú principal de Preguntados. En este podremos elegir la dificultad de las preguntas que deberemos contestar.
Elegida la dificultad, la aplicación nos traerá preguntas aleatorias acorde a esta y nosotros deberemos responderlas de a una. 
Veremos en pantalla la pregunta actual y sus cuatro opciones abajo de esta, arriba a la izquierda tendremos un contador del número de pregunta actual; a la derecha del contador un botón que nos devolverá a la selección de dificultad en caso de que nos hayamos arrepentido, y ,por último, el botón para pasar a la siguiente pregunta, el cual sólo estará disponible luego de haber contestado.
Al elegir una de las opciones, la aplicación nos mostrará si hemos elegido correctamente la respuesta mediante el rellenado de un color (verde si fue correcta y rojo en si no lo fue).
Habiendo contestado todas las preguntas, se nos mostrará en pantalla un mensaje final indicando cuantos preguntas hemos acertado del total y un botón para volver al menú de selección de dificultad.
