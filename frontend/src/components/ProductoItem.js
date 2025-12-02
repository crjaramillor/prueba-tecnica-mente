import React from 'react';
import './ProductoItem.css';

/**
 * Componente que representa un item de producto en la lista
 */
const ProductoItem = ({ producto, onEditar, onEliminar, cargando }) => {
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(precio);
  };

  return (
    <tr>
      <td>{producto.id}</td>
      <td className="producto-nombre">{producto.nombre}</td>
      <td className="producto-precio">{formatearPrecio(producto.precio)}</td>
      <td>
        <div className="acciones-item">
          <button
            onClick={() => onEditar(producto)}
            className="btn btn-secondary btn-sm"
            disabled={cargando}
          >
            Editar
          </button>
          <button
            onClick={() => onEliminar(producto.id)}
            className="btn btn-danger btn-sm"
            disabled={cargando}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductoItem;

