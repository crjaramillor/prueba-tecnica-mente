# Frontend - Gestión de Productos

Aplicación React para la gestión de productos que consume la API REST del backend.

## Tecnologías

- React 18.2.0
- CSS Modules (estilos en archivos separados)

## Estructura del Proyecto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ProductoLista.js
│   │   ├── ProductoItem.js
│   │   └── ProductoFormulario.js
│   ├── services/            # Servicios para llamadas a la API
│   │   └── productoService.js
│   ├── App.js              # Componente principal
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Funcionalidades

### 1. Listar Productos
- Muestra todos los productos en una tabla
- Muestra mensaje amigable cuando no hay productos
- Formatea el precio como moneda colombiana

### 2. Crear Producto
- Formulario con validaciones:
  - Nombre: obligatorio
  - Precio: obligatorio y mayor a 0
- Muestra errores de validación en tiempo real

### 3. Editar Producto
- Carga los valores existentes del producto
- Permite editar nombre y precio
- Mismas validaciones que crear

### 4. Eliminar Producto
- Botón para eliminar con confirmación
- Muestra mensaje de confirmación antes de eliminar

### 5. Estados Visuales
- Muestra "Cargando..." durante las peticiones
- Muestra errores de forma clara y visible
- Botones deshabilitados durante operaciones

## Instalación y Ejecución

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Ejecutar en modo desarrollo
npm start
```

La aplicación se abrirá en: `http://localhost:3000`

## Configuración

La URL de la API está configurada en `src/services/productoService.js`:
```javascript
const API_URL = 'http://localhost:8080/productos';
```

Asegúrate de que el backend esté ejecutándose en el puerto 8080.

## Características Adicionales

- ✅ Componentes reutilizables (ProductoLista, ProductoItem, ProductoFormulario)
- ✅ Estilos limpios y modernos con CSS
- ✅ Buen uso de useState y useEffect
- ✅ Estructura clara por carpetas
- ✅ Manejo de errores y estados de carga
- ✅ Validaciones en el frontend
- ✅ Formato de moneda para precios

