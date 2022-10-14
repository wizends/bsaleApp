# Bsale App

Este proyecto esta enfocado para mostrar la implementación de una tienda online utilizando Javascript Vanilla, HTML5 y CSS3. La aplicación utiliza el método fetch() para poder hacer peticiones mediante https, con esto los datos provenientes de la API: https://github.com/wizends/Bsale 

![image](https://user-images.githubusercontent.com/89259697/195759540-24689f47-d622-4624-9f6d-8d4bb8c961a6.png)


# Instalación

## **Pasos para correr la aplicación:**

1. Abre la terminal de git bash o terminal en mac y Linux, luego ejecuta ``git clone https://github.com/wizends/bsaleApp``
2. ``cd bsaleApp`` para navegar al directorio 
3. y ejecuta ``npm install`` 
4. Ve al link de API https://github.com/wizends/Bsale y sigue los pasos de instalación.
5. Por ultimo ejecuta ``npm start`` para inicia o ``npm run dev`` para levantar el modo desarrollador.

# Dependencias
Para que este proyecto funcione correctamente debes seguir los pasos anteriores y además tener la API: https://github.com/wizends/Bsale correctamente instalada

# ScreenShoots

### - Respuesta esperada del comando npm start

<img width="280" alt="image" src="https://user-images.githubusercontent.com/89259697/164064000-46822919-dca9-4644-bdb3-ddc9b16b7b1e.png">

### - Cambiar puerto ``app.js variable port`` puedes setear el puerto que desees utilizar 
![code](https://user-images.githubusercontent.com/89259697/164066888-3d464157-4d91-4530-9631-340b08627739.png)
 
### - Cambiar paginas a mostrar y URI de la API
![2](https://user-images.githubusercontent.com/89259697/164067587-126a4ed9-edec-4cd4-9ba0-8a60caa5d7fe.png) 
## Ten en cuenta que si utilizas el puerto 3000 para correr la app y la API esta corriendo en el puerto 3000 la aplicación no funcionara

# Estructura de archivos
1. index.html: Este archivo contiene todo el codigo html de nuestra aplicacion
2. app.js: Este archivo se encarga de enviar la pagina local a un servidor local
3. Directorio Scripts:
   - index.js : Se encuentran las peticiones hacia la API
   - render.js : Renderiza codigo html y lo genera para que este sea dinamico
4. Directorio Styles: 
   - index.css : Estilos basicos para la app

# Cualquier aporte duda o critica constructiva puedes escribirme por github!
