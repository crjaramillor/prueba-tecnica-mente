import React, { useState, useEffect } from 'react';
import './ProductoFormulario.css';

/**
 * Componente de formulario para crear/editar productos
 */
const ProductoFormulario = ({ producto, onSubmit, onCancelar, cargando }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [errores, setErrores] = useState({});

  // Cargar datos del producto si se está editando
  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre || '');
      setPrecio(producto.precio?.toString() || '');
    } else {
      setNombre('');
      setPrecio('');
    }
    setErrores({});
  }, [producto]);

  const validar = () => {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!precio.trim()) {
      nuevosErrores.precio = 'El precio es obligatorio';
    } else {
      const precioNum = parseFloat(precio);
      if (isNaN(precioNum) || precioNum <= 0) {
        nuevosErrores.precio = 'El precio debe ser mayor a 0';
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validar()) {
      return;
    }

    const productoData = {
      nombre: nombre.trim(),
      precio: parseFloat(precio),
    };

    onSubmit(productoData);
  };

  return (
    <div className="producto-formulario-container">
      <div className="producto-formulario">
        <h2>{producto ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">
              Nombre <span className="requerido">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={errores.nombre ? 'error' : ''}
              disabled={cargando}
            />
            {errores.nombre && (
              <span className="error-mensaje">{errores.nombre}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="precio">
              Precio <span className="requerido">*</span>
            </label>
            <input
              type="number"
              id="precio"
              step="0.01"
              min="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className={errores.precio ? 'error' : ''}
              disabled={cargando}
            />
            {errores.precio && (
              <span className="error-mensaje">{errores.precio}</span>
            )}
          </div>

          <div className="form-acciones">
            <button
              type="button"
              onClick={onCancelar}
              className="btn btn-secondary"
              disabled={cargando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-success"
              disabled={cargando}
            >
              {cargando ? 'Guardando...' : (producto ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoFormulario;

