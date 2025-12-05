# Preguntados
El presente proyecto simula un juego de preguntados (trivia quiz), donde el usuario podrá elegir en el menú una dificultad para las preguntas y proceder a contestar las mismas.

## Pre-requerimientos
- Tener instalado git bash
- Tener instalado node.js

## Instalación

Para instalar el proyecto deberemos abrir git bash en el directorio que deseemos y ejecutar los siguientes comandos:

```bash
git clone https://github.com/FacundoMosquera/unq-ui-facundo-mosquera-trabajo-final.git
```

Entraremos a la carpeta instalada y a continuación instalaremos las depencias que necesita el proyecto:

```bash
npm install
```

Por último levantaremos el proyecto con:

```bash
npm run dev
```

## ¿Cómo jugar?
Levantado el proyecto, iremos a la dirección que nos indicará la consola (generalmente el localhost:5173) y nos recibirá el menú principal de Preguntados. En este podremos elegir la dificultad de las preguntas que deberemos contestar.
Elegida la dificultad, la aplicación nos traerá preguntas aleatorias acorde a esta y nosotros deberemos responderlas de a una. 

Veremos en pantalla la pregunta actual y sus cuatro opciones abajo de esta, arriba a la izquierda tendremos un contador del número de pregunta actual; a la derecha del contador un botón que nos devolverá a la selección de dificultad en caso de que nos hayamos arrepentido, y, por último, el botón para pasar a la siguiente pregunta, el cual sólo estará disponible luego de haber contestado.

Al elegir una de las opciones, la aplicación nos mostrará si hemos elegido correctamente la respuesta mediante el rellenado de un color (verde si fue correcta y rojo en si no lo fue).

Habiendo contestado todas las preguntas, se nos mostrará en pantalla un mensaje final indicando cuantos preguntas hemos acertado del total y un botón para volver al menú de selección de dificultad.

