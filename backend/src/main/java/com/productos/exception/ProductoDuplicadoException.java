package com.productos.exception;

/**
 * Excepción personalizada cuando se intenta crear un producto con nombre duplicado
 */
public class ProductoDuplicadoException extends RuntimeException {
    
    public ProductoDuplicadoException(String mensaje) {
        super(mensaje);
    }
}

