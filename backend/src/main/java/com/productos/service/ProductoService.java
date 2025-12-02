package com.productos.service;

import com.productos.dto.ProductoDTO;
import com.productos.exception.ProductoDuplicadoException;
import com.productos.exception.ProductoNotFoundException;
import com.productos.model.Producto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Servicio que maneja la lógica de negocio para productos
 */
@Service
public class ProductoService {

    // Lista en memoria para almacenar productos
    private final List<Producto> productos = new ArrayList<>();
    
    // Contador para generar IDs automáticamente
    private final AtomicLong contadorId = new AtomicLong(1);

    /**
     * Obtiene todos los productos
     */
    public List<Producto> obtenerTodos() {
        return new ArrayList<>(productos);
    }

    /**
     * Obtiene un producto por ID
     * @throws ProductoNotFoundException si no se encuentra el producto
     */
    public Producto obtenerPorId(Long id) {
        return productos.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ProductoNotFoundException(
                        "Producto con ID " + id + " no encontrado"));
    }

    /**
     * Crea un nuevo producto
     * @throws ProductoDuplicadoException si ya existe un producto con el mismo nombre
     */
    public Producto crear(ProductoDTO productoDTO) {
        // Validar que no exista un producto con el mismo nombre
        boolean existeNombre = productos.stream()
                .anyMatch(p -> p.getNombre().equalsIgnoreCase(productoDTO.getNombre()));
        
        if (existeNombre) {
            throw new ProductoDuplicadoException(
                    "Ya existe un producto con el nombre: " + productoDTO.getNombre());
        }

        // Crear nuevo producto con ID autogenerado
        Producto nuevoProducto = new Producto(
                contadorId.getAndIncrement(),
                productoDTO.getNombre(),
                productoDTO.getPrecio()
        );
        
        productos.add(nuevoProducto);
        return nuevoProducto;
    }

    /**
     * Actualiza un producto existente
     * @throws ProductoNotFoundException si no se encuentra el producto
     * @throws ProductoDuplicadoException si el nuevo nombre ya existe en otro producto
     */
    public Producto actualizar(Long id, ProductoDTO productoDTO) {
        Producto productoExistente = obtenerPorId(id);
        
        // Validar que si se cambia el nombre, no exista otro producto con ese nombre
        if (!productoExistente.getNombre().equalsIgnoreCase(productoDTO.getNombre())) {
            boolean existeNombre = productos.stream()
                    .anyMatch(p -> p.getNombre().equalsIgnoreCase(productoDTO.getNombre()) 
                            && !p.getId().equals(id));
            
            if (existeNombre) {
                throw new ProductoDuplicadoException(
                        "Ya existe un producto con el nombre: " + productoDTO.getNombre());
            }
        }

        // Actualizar los datos
        productoExistente.setNombre(productoDTO.getNombre());
        productoExistente.setPrecio(productoDTO.getPrecio());
        
        return productoExistente;
    }

    /**
     * Elimina un producto por ID
     * @throws ProductoNotFoundException si no se encuentra el producto
     */
    public void eliminar(Long id) {
        Producto producto = obtenerPorId(id);
        productos.remove(producto);
    }
}

