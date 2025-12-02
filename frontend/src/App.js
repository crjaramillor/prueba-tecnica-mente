import React, { useState, useEffect } from 'react';
import './App.css';
import ProductoLista from './components/ProductoLista';
import ProductoFormulario from './components/ProductoFormulario';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from './services/productoService';

function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch (err) {
      setError('Error al cargar los productos: ' + (err.message || 'Error desconocido'));
    } finally {
      setCargando(false);
    }
  };

  const handleCrear = async (productoData) => {
    setCargando(true);
    setError(null);
    try {
      const nuevoProducto = await crearProducto(productoData);
      setProductos([...productos, nuevoProducto]);
      setMostrarFormulario(false);
      setProductoEditando(null);
    } catch (err) {
      setError('Error al crear el producto: ' + (err.message || 'Error desconocido'));
    } finally {
      setCargando(false);
    }
  };

  const handleActualizar = async (id, productoData) => {
    setCargando(true);
    setError(null);
    try {
      const productoActualizado = await actualizarProducto(id, productoData);
      setProductos(productos.map(p => p.id === id ? productoActualizado : p));
      setMostrarFormulario(false);
      setProductoEditando(null);
    } catch (err) {
      setError('Error al actualizar el producto: ' + (err.message || 'Error desconocido'));
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    setCargando(true);
    setError(null);
    try {
      await eliminarProducto(id);
      setProductos(productos.filter(p => p.id !== id));
    } catch (err) {
      setError('Error al eliminar el producto: ' + (err.message || 'Error desconocido'));
    } finally {
      setCargando(false);
    }
  };

  const handleEditar = (producto) => {
    setProductoEditando(producto);
    setMostrarFormulario(true);
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestión de Productos</h1>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-mensaje">
            {error}
            <button onClick={() => setError(null)} className="cerrar-error">×</button>
          </div>
        )}

        {cargando && !productos.length && (
          <div className="cargando">Cargando productos...</div>
        )}

        {!mostrarFormulario ? (
          <div>
            <div className="acciones-header">
              <button 
                onClick={() => setMostrarFormulario(true)}
                className="btn btn-primary"
              >
                + Nuevo Producto
              </button>
            </div>
            <ProductoLista
              productos={productos}
              cargando={cargando}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
            />
          </div>
        ) : (
          <ProductoFormulario
            producto={productoEditando}
            onSubmit={productoEditando 
              ? (data) => handleActualizar(productoEditando.id, data)
              : handleCrear
            }
            onCancelar={handleCancelar}
            cargando={cargando}
          />
        )}
      </main>
    </div>
  );
}

export default App;

