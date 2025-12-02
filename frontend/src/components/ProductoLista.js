import React from 'react';
import './ProductoLista.css';
import ProductoItem from './ProductoItem';

/**
 * Componente que muestra la lista de productos
 */
const ProductoLista = ({ productos, cargando, onEditar, onEliminar }) => {
  if (cargando && productos.length === 0) {
    return null; // El mensaje de carga se muestra en App
  }

  if (productos.length === 0) {
    return (
      <div className="sin-productos">
        <p>No hay productos registrados.</p>
        <p className="sin-productos-subtitulo">Crea tu primer producto usando el botón "Nuevo Producto".</p>
      </div>
    );
  }

  return (
    <div className="producto-lista">
      <table className="producto-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <ProductoItem
              key={producto.id}
              producto={producto}
              onEditar={onEditar}
              onEliminar={onEliminar}
              cargando={cargando}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductoLista;

