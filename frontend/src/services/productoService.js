const API_URL = 'http://localhost:8080/productos';

/**
 * Obtiene todos los productos
 */
export const obtenerProductos = async () => {
  const respuesta = await fetch(API_URL);
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
  }
  return await respuesta.json();
};

/**
 * Obtiene un producto por ID
 */
export const obtenerProductoPorId = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`);
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
  }
  return await respuesta.json();
};

/**
 * Crea un nuevo producto
 */
export const crearProducto = async (producto) => {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
  });

  if (!respuesta.ok) {
    const error = await respuesta.json();
    throw new Error(error.mensaje || `Error ${respuesta.status}: ${respuesta.statusText}`);
  }

  return await respuesta.json();
};

/**
 * Actualiza un producto existente
 */
export const actualizarProducto = async (id, producto) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
  });

  if (!respuesta.ok) {
    const error = await respuesta.json();
    throw new Error(error.mensaje || `Error ${respuesta.status}: ${respuesta.statusText}`);
  }

  return await respuesta.json();
};

/**
 * Elimina un producto
 */
export const eliminarProducto = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!respuesta.ok) {
    const error = await respuesta.json();
    throw new Error(error.mensaje || `Error ${respuesta.status}: ${respuesta.statusText}`);
  }
};

