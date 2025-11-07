package com.proyecto.restaurantekonrad.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document (collection = "menu")
public class Menu {

    @Id
    private String id_Menu;
    private List<Plato> platos;

    public Menu() {
    }

    public Menu(String id_Menu, List<Plato> platos) {
        this.id_Menu = id_Menu;
        this.platos = platos;
    }

    public String getId_Menu() {
        return id_Menu;
    }

    public void setId_Menu(String id_Menu) {
        this.id_Menu = id_Menu;
    }

    public List<Plato> getPlatos() {
        return platos;
    }

    public void setPlatos(List<Plato> platos) {
        this.platos = platos;
    }
}
