# Ecommerce
## Node.js
Este proyecto utiliza Node.js para gestionar las dependencias y ejecutar el backend, facilitando la construcción de aplicaciones rápidas y escalables.

## Instalación

### Ejecutar el archivo `database.sql`
Este archivo normalmente contiene instrucciones para crear y poblar la base de datos. Para ejecutarlo:

Usando MySQL Workbench:
1. Abre MySQL Workbench e inicia sesión con tus credenciales.
2. Selecciona la base de datos (o crea una nueva con CREATE DATABASE nombre_de_base_de_datos;).
3. Abre el archivo database.sql desde el menú File > Open SQL Script....
4. Ejecuta el script presionando el botón "Run" (ícono del rayo).


### Instalar `Node.js`
`Node.js` es necesario para ejecutar el backend y gestionar las dependencias.

Instalación:
1. Ve a la página oficial de `Node.js` y descarga la versión recomendada para tu sistema operativo.
2. Instala el archivo descargado siguiendo las instrucciones del instalador.
3. Verifica la instalación ejecutando en la terminal:

```
node -v
npm -v
```

Esto debería mostrar las versiones instaladas de `Node.js` y npm.

## Paquetes
En el proyecto, hemos instalado varias dependencias para que el backend funcione correctamente. No es necesario subir la carpeta node_modules al repositorio, ya que contiene los paquetes descargados, los cuales pueden ocupar mucho espacio. Además, al agregar más paquetes, esta carpeta puede crecer significativamente.

Por ello, utilizamos un archivo .gitignore para evitar subir la carpeta node_modules al repositorio. Solo se mantiene el archivo package.json, que es donde se definen todas las dependencias necesarias para ejecutar el proyecto.

### Pasos para instalar las dependencias
Si has clonado el proyecto o descargado una nueva copia del repositorio, necesitarás instalar todas las dependencias del proyecto antes de ejecutarlo. Para hacer esto, sigue estos pasos:

1. Clona el repositorio o descarga los archivos del proyecto.
Si aún no tienes el proyecto, puedes clonarlo con Git:

```
git clone ....
```
2. Navega a la carpeta del proyecto.

```
cd backend
```
3. Instala las dependencias.
Ejecuta el siguiente comando en la terminal para descargar e instalar todos los paquetes necesarios, listados en el archivo package.json:

```
npm install
```
Este comando descargará todas las dependencias especificadas y las colocará en la carpeta node_modules.
Nota: Esta carpeta no debe ser subida al repositorio, ya que su contenido puede variar según el entorno o el sistema operativo.

## node_modules
La carpeta node_modules contiene todas las dependencias necesarias para que el backend funcione correctamente. Esta carpeta es generada automáticamente cuando ejecutas npm install. No necesitas subirla al repositorio, ya que todo lo que contiene está especificado en package.json y puede ser recuperado ejecutando npm install.

# Explicación sobre JSON
`json` (JavaScript Object Notation) es un formato de intercambio de datos ampliamente utilizado. Es un formato basado en texto que es fácil de leer y escribir para los humanos, y fácil de analizar y generar para las máquinas.

En este proyecto, utilizamos `json` para intercambiar datos entre el backend y el frontend. Los objetos y arrays de JavaScript se convierten en cadenas `json` usando JSON.stringify() para enviarlos en solicitudes HTTP, y el servidor responde con objetos `json` que pueden ser interpretados por el frontend.

Ejemplo de `json`
Supongamos que tenemos un objeto de usuario en JavaScript:

```
const user = {
  username: 'usuario123',
  password: 'secreto',
  role: 'admin'
};
```
Cuando enviamos este objeto al servidor, usamos JSON.stringify(user) para convertirlo en una cadena `json`, de modo que pueda ser transmitida a través de la red:

```
{
  "username": "usuario123",
  "password": "secreto",
  "role": "admin"
}
```

¿Por qué usar `json`?
Interoperabilidad: `json` es un formato estándar utilizado por la mayoría de las APIs web, lo que facilita la integración con diferentes servicios.
Simplicidad: El formato es fácil de leer y escribir, tanto para máquinas como para humanos.
Compatibilidad: Los lenguajes modernos como JavaScript, Python, y muchos otros tienen soporte nativo para `json`, lo que lo hace accesible en una amplia variedad de plataformas.