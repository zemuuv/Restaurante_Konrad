package com.proyecto.restaurantekonrad.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "platos")
public class Plato implements ItemOrden {

    @Id
    private String id_plato;
    private String nombre;
    private Double precio;
    private Double cantidad;

    public Plato() {
    }

    public Plato(String id_plato, String nombre, Double precio, Double cantidad) {
        this.id_plato = id_plato;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    @Override
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getId_plato() {
        return id_plato;
    }

    public void setId_plato(String id_plato) {
        this.id_plato = id_plato;
    }

    public Double getCantidad() {
        return cantidad;
    }

    public void setCantidad(Double cantidad) {
        this.cantidad = cantidad;
    }

    @Override
    public Double getPrecio() { return precio; }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
}
