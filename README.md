# RSI Trade Project - API Fake Login

Este repositorio contiene una API que simula un sistema de inicio de sesión falso como parte del proyecto **RSI Trade Project**.

## Características

- **Login Simulado**: La API permite realizar peticiones de inicio de sesión simuladas.
- **Validaciones Básicas**: Verifica entradas como usuario y contraseña.
- **Respuesta JSON**: Ofrece respuestas estándar en formato JSON para las solicitudes.
- **Diseño Modular**: Fácil de extender y modificar según las necesidades del proyecto.

## Tecnologías

- **Lenguaje**: TypeScript
- **Dependencias**:
  - Axios
  - TypeScript
  - Express
  - Node.js
  - JSON Web Token
  - bcrypt
  - dotenv
  - ts-node-dev

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js 16 o superior
- npm o yarn (gestores de paquetes de Node.js)

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/Yedpt/RSI_trade_project-API-fake-login.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd RSI_trade_project-API-fake-login
    ```

3. Modifica el archivo `.env_example`:

    - Renombra el archivo `.env_example` a `.env`.
    - Rellena las credenciales necesarias en las variables de entorno.

4. Instala las dependencias:

    ```bash
    npm install
    # o
    yarn install
    ```

## Uso

1. Inicia el servidor de la API:

    ```bash
    npm run dev
    ```

2. Accede a la API en tu navegador o usa herramientas como Postman en:

    ```
    http://localhost:3000/api/users/login
    ```

3. Realiza solicitudes POST al endpoint de inicio de sesión, por ejemplo:

    ```json
    POST
    {
      "username": "usuario",
      "password": "contraseña"
    }
    ```

4. Recibirás una respuesta similar a:

    ```json
    {
      "status": "success",
      "message": "Inicio de sesión exitoso."
    }
    ```

## Contribución

Si deseas contribuir:

1. Haz un fork del repositorio.
2. Crea una rama para tu función o corrección:

    ```bash
    git checkout -b feature/nueva-funcionalidad
    ```

3. Realiza tus cambios y haz un commit:

    ```bash
    git commit -m "Agregada nueva funcionalidad"
    ```

4. Envía un pull request.

## Autor

© 2024 RSI Trade Project.