package com.proyecto.restaurantekonrad.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "combos")
public class Combo implements ItemOrden {
    @Id
    private String id;
    private String nombre;
    private List<Plato> items = new ArrayList<>();

    public Combo() {
    }

    public Combo(String nombre, String id, List<Plato> items) {
        this.nombre = nombre;
        this.id = id;
        this.items = items;
    }

    @Override
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public Double getPrecio() {
        return items.stream().mapToDouble(Plato::getPrecio).sum();
    }

    public List<Plato> getItems() {
        return items;
    }

    public void setItems(List<Plato> items) {
        this.items = items;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}

