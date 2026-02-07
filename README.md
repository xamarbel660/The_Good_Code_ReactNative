# Bienvenido a tu la aplicación The Good Code 👋

Este es un proyecto de [Expo](https://expo.dev) creado con [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Configuración del Proyecto

### Repositorio

[Repositorio en GitHub](https://github.com/xamarbel660/The_Good_Code_ReactNative.git)

### Conexión a la Base de Datos

- **Nombre de la base de datos**: `the_good_code`
- **Usuario**: `root`
- **Contraseña**: `test`

### Configuración de la API

Para asegurar que la aplicación en el movil pueda conectarse con el backend, debes actualizar la dirección IP en `src/services/api.js`.

1. Encuentra la dirección IP local de tu ordenador (ej. ejecuta `ipconfig` en Windows o `ifconfig` en Linux/Mac).
2. Abre el archivo `src/services/api.js`.
3. Actualiza la `baseURL` para que coincida con tu dirección IP:

   ```javascript
   baseURL: "http://<TU_DIRECCION_IP>:3000/api",
   ```

## Comenzar

1. Instalar dependencias

   ```bash
   npm install
   ```

2. Iniciar la aplicación

   ```bash
   npx expo start
   ```
