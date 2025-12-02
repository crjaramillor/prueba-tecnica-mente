# Prueba Técnica - Desarrollador Junior

Este proyecto contiene una aplicación completa de gestión de productos con backend y frontend.

## Estructura del Proyecto

```
.
├── backend/          # API REST con Spring Boot
└── frontend/         # Aplicación React
```

## Requisitos Previos

- **Java 17 o superior** (JDK) - [Descargar aquí](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 16+ y npm** - [Descargar aquí](https://nodejs.org/)

**Nota importante**: 
-  **NO necesitas instalar Maven** - El proyecto incluye Maven Wrapper que se descarga automáticamente
-  Solo necesitas Java instalado en tu sistema

## Inicio Rápido

### Backend

**Windows (recomendado):**
1. Abre la carpeta `backend`
2. Doble clic en `start.bat`
3. El script buscará Java automáticamente y ejecutará el backend

**O desde terminal:**
```bash
cd backend
.\mvnw.cmd spring-boot:run    # Windows
```

El backend estará disponible en: `http://localhost:8080`

**Nota:** El script `start.bat` busca Java automáticamente

### Frontend

En una nueva terminal:

```bash
cd frontend
npm install    # Solo la primera vez
npm start
```

El frontend estará disponible en: `http://localhost:3000`

## Endpoints de la API

- `GET /productos` - Lista todos los productos
- `GET /productos/{id}` - Obtiene un producto por ID
- `POST /productos` - Crea un nuevo producto
- `PUT /productos/{id}` - Actualiza un producto
- `DELETE /productos/{id}` - Elimina un producto

## Características Implementadas

### Backend
- Separación clara por capas (controller, service, model, dto, exception handler)
- Validaciones 
- Prevención de nombres duplicados
- Manejo centralizado de errores
- DTOs para validaciones
- Comentarios
- CORS habilitado para el frontend

### Frontend
- CRUD completo de productos
- Listar productos con tabla
- Crear producto con formulario y validaciones
- Editar producto
- Eliminar producto con confirmación
- Estados de carga y errores

## Notas

- Los datos se almacenan en memoria unicamente
- El frontend está configurado para conectarse a `http://localhost:8080`


