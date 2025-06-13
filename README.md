# Todo App - Aplicación de Gestión de Tareas

Esta es una aplicación web para gestionar tareas, desarrollada con Angular y .NET Core.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14.x o superior)
- [Angular CLI](https://angular.io/cli) (versión 14.x o superior)
- [.NET Core SDK](https://dotnet.microsoft.com/download) (versión 9.0 o superior)
- Un editor de código (recomendado: Visual Studio Code)

## Pasos para Ejecutar el Proyecto

### 1. Clonar el Repositorio

```bash
git clone https://github.com/iejimenez/todoappclient.git
cd todoapp
```

### 2. Configurar el Backend (.NET Core)

1. Clonar el Repositorio
```bash
git clone https://github.com/iejimenez/TodoAppApi.git
```
2. Seguir las intrucciones del repositorio del API

El backend se ejecutará en `http://localhost:7067`

### 3. Configurar el Frontend (Angular)

1. Abre una nueva terminal y navega a la carpeta del frontend:
```bash
cd todoappclient
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el proyecto:
```bash
ng serve
```

El frontend se ejecutará en `http://localhost:4200`

## Estructura del Proyecto

```
todoapp/
├── TodoApp.API/          # Backend (.NET Core)
└── todoappclient/        # Frontend (Angular)
```

## Características

- Crear, editar y eliminar tareas
- Marcar tareas como completadas
- Validación de formularios
- Interfaz responsiva
- Animaciones suaves

## Tecnologías Utilizadas

- **Frontend**:
  - Angular 14
  - TypeScript
  - SCSS
  - Font Awesome (iconos)

- **Backend**:
  - .NET Core 9
  - Entity Framework Core
  - SQL Server

## Solución de Problemas

Si encuentras algún error:

1. Asegúrate de que todas las dependencias estén instaladas correctamente
2. Verifica que los puertos 4200 (frontend) y 7067 (backend) estén disponibles
3. Comprueba que la cadena de conexión a la base de datos sea correcta
4. Revisa los logs del servidor para más detalles

## Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.
