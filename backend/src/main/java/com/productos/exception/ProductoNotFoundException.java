package com.productos.exception;

/**
 * Excepción personalizada cuando no se encuentra un producto
 */
public class ProductoNotFoundException extends RuntimeException {
    
    public ProductoNotFoundException(String mensaje) {
        super(mensaje);
    }
}

