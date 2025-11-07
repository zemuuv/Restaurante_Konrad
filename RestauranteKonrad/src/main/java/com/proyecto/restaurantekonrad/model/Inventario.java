package com.proyecto.restaurantekonrad.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document (collection = "inventario")
public class Inventario {

    @Id
    private String id_Inventario;
    private List<Plato> platos;

    public Inventario() {
    }

    public Inventario(List<Plato> platos, String id_Inventario) {
        this.platos = platos;
        this.id_Inventario = id_Inventario;
    }

    public String getId_Inventario() {
        return id_Inventario;
    }

    public void setId_Inventario(String id_Inventario) {
        this.id_Inventario = id_Inventario;
    }

    public List<Plato> getPlatos() {
        return platos;
    }

    public void setPlatos(List<Plato> platos) {
        this.platos = platos;
    }


}
