# Money Minder

Money Minder es un organizador de finanzas personales que te permite llevar un seguimiento detallado de tus ingresos y egresos mes a mes. Esta aplicación web está desarrollada con HTML, CSS y JavaScript básico para el frontend, y utiliza Express y Node.js en el backend.

## Características

- **Autenticación de Usuarios:** Inicio de sesión seguro y validación de datos a través de una API.
- **Visualización de Datos:** Acceso a gráficas y tablas que muestran los ingresos y egresos por mes.
- **Gestión de Límites Mensuales:** Establece un límite de gastos personal para cada mes.
- **Categorización de Movimientos:** Registra ingresos y egresos bajo diferentes categorías.

## Requisitos Previos

Antes de iniciar el proyecto, asegúrate de tener instalado lo siguiente:

- Node.js
- npm
- Git
- MySQL

## Instalación

Para instalar y ejecutar Money Minder, sigue estos pasos:

1. Clona el repositorio:
	```bash
	git clone https://github.com/PaolaPaz1/proyecto-final-main.git
	```
2. Navega al directorio del proyecto e instala las dependencias:
	```bash
	cd proyecto-final-main
	npm install
	```
3. Inicia un servidor MySQL y crea una base de datos que coincida con las especificaciones del proyecto.

4. Crea un archivo `.env` en el directorio raíz del proyecto con las siguientes variables:
	```
	DB_HOST=[tu-host]
	DB_USER=[tu-usuario]
	DB_PASSWORD=[tu-contraseña]
	DB_NAME=[nombre-de-tu-base-de-datos]
	```
Asegúrate de reemplazar los valores entre corchetes con tu información de configuración.

5. Inicia el proyecto con Vite:
	```bash
	npm run dev
	```

## Uso

Una vez que el servidor esté en funcionamiento, podrás iniciar sesión con tus credenciales y empezar a utilizar todas las funcionalidades de Money Minder.