Aquí tienes un README detallado para el backend de tu aplicación de captura de PET:

---

# Administrador de Tareas - Captura de PET (Backend)

Este proyecto de backend es la API RESTful para la aplicación de **Administración de Tareas y Captura de PET**. Está desarrollada para gestionar el registro de usuarios, autenticación, captura semanal de PET, y generación de reportes. Utiliza Node.js con Express y Sequelize para la gestión de bases de datos.

## Índice

- [Características](#características)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Rutas Principales](#rutas-principales)
- [Documentación de API](#documentación-de-api)
- [Contribuciones](#contribuciones)

## Características

- **Registro y autenticación de usuarios**: Utiliza JWT para autenticación segura.
- **Roles de usuario**: Admin y Operador, cada uno con permisos específicos.
- **Registro semanal de capturas de PET**: Incluye el cálculo del valor de PET en USD y MXN.
- **Generación de reportes**: Muestra capturas anteriores de PET.
- **Conexión a base de datos**: PostgreSQL, configurada mediante Sequelize.

## Tecnologías Usadas

- **Backend**: Node.js con Express
- **Base de Datos**: PostgreSQL
- **ORM**: Sequelize
- **Autenticación**: JWT (JSON Web Token)
- **Documentación**: API RESTful estructurada

## Requisitos

- **Node.js** y **npm** instalados.
- **PostgreSQL** en ejecución.
- Cliente de API (como Postman o Insomnia) para probar las rutas de la API.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/GabrielGM16/back_global_aw.git
   cd back_global_aw
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno necesarias en el archivo `.env` siguiendo el ejemplo de configuración de abajo.

4. Ejecuta el proyecto:

   ```bash
   npm start
   ```

5. La API estará disponible en `http://localhost:5000`.

## Estructura del Proyecto

```plaintext
├── config
│   └── sequelize.js      # Configuración de Sequelize
├── models
│   ├── User.js           # Modelo de Usuario
│   ├── PETCapture.js     # Modelo de Captura de PET
├── routes
│   ├── authRoutes.js     # Rutas de autenticación
│   ├── petRoutes.js      # Rutas de captura y reporte de PET
├── server.js             # Configuración del servidor
├── app.js                # Configuración principal de la aplicación
└── .env                  # Variables de entorno
└── README.md             # Documentación del proyecto
```

- **config/**: Configuración de Sequelize para la conexión a PostgreSQL.
- **models/**: Contiene los modelos de datos para la base de datos.
- **routes/**: Contiene las rutas de la API.
- **server.js**: Configura el servidor de Express.
- **app.js**: Configuración y rutas principales de la aplicación.

## Variables de Entorno

Configura las siguientes variables en un archivo `.env` en la raíz del proyecto:

```plaintext
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=mydatabase
DB_PORT=5432
DB_DIALECT=postgres
JWT_SECRET=clave_secreta_jwt
PORT=5000
```

## Rutas Principales

La API tiene las siguientes rutas:

- **Autenticación**
  - **POST `/api/auth/register`**: Registra un nuevo usuario.
  - **POST `/api/auth/login`**: Autentica un usuario y devuelve un token JWT.

- **Captura de PET**
  - **POST `/api/pet/pet-capture`**: Registra una nueva captura de PET.
  - **GET `/api/pet/pet-report`**: Obtiene el reporte de capturas de PET.

## Documentación de API

### Autenticación

1. **POST** `/api/auth/register`
   - Registra un usuario nuevo.
   - Parámetros en el cuerpo:
     - `username` (string, requerido)
     - `email` (string, requerido)
     - `password` (string, requerido)

2. **POST** `/api/auth/login`
   - Autentica al usuario y devuelve un token JWT.
   - Parámetros en el cuerpo:
     - `email` (string, requerido)
     - `password` (string, requerido)

### Captura de PET

1. **POST** `/api/pet/pet-capture`
   - Crea una captura semanal de PET.
   - Parámetros en el cuerpo:
     - `capture_date` (string en formato de fecha, requerido)
     - `weight_kg` (decimal, requerido)

2. **GET** `/api/pet/pet-report`
   - Devuelve el reporte de capturas de PET.

> Nota: Todas las rutas de **captura de PET** requieren autenticación mediante JWT. Envía el token en los headers como `Authorization: Bearer <token>`.

## Contribuciones

Para contribuir, sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y realiza commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

## Licencia

Este proyecto es de código abierto y se distribuye bajo la licencia MIT.
