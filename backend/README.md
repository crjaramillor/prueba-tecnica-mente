# API REST de Productos - Backend

API REST desarrollada con Spring Boot para la gestión de productos.

## Tecnologías

- Java 17
- Spring Boot 3.2.0
- Maven

## Estructura del Proyecto

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/productos/
│   │   │   ├── controller/     # Controladores REST
│   │   │   ├── service/         # Lógica de negocio
│   │   │   ├── model/           # Modelos de dominio
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   └── exception/       # Manejo de excepciones
│   │   └── resources/
│   └── test/
└── pom.xml
```

## Endpoints

### GET /productos
Retorna la lista de todos los productos.

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Producto A",
    "precio": 12000
  }
]
```

### GET /productos/{id}
Retorna un producto por ID.

**Respuesta 200:**
```json
{
  "id": 1,
  "nombre": "Producto A",
  "precio": 12000
}
```

**Respuesta 404:**
```json
{
  "mensaje": "Producto con ID 1 no encontrado"
}
```

### POST /productos
Crea un nuevo producto.

**Request:**
```json
{
  "nombre": "Producto A",
  "precio": 12000
}
```

**Validaciones:**
- `nombre`: obligatorio
- `precio`: obligatorio y mayor a 0
- No se permiten nombres duplicados

### PUT /productos/{id}
Actualiza un producto existente.

**Request:**
```json
{
  "nombre": "Producto Actualizado",
  "precio": 15000
}
```

### DELETE /productos/{id}
Elimina un producto por ID.

**Respuesta:** 204 No Content

## Ejecutar la Aplicación

```bash
.\mvnw.cmd spring-boot:run
```

La API estará disponible en: `http://localhost:8080`