package com.proyecto.restaurantekonrad.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Usuarios")
public class Usuarios {

    //variables
    @Id
    private String id;
    private String usuario;
    private String password;
    private String rol;

    //constructor vacio
    public Usuarios() {
    }

    //constructor
    public Usuarios(String id, String usuario, String password, String rol) {
        this.id = id;
        this.usuario = usuario;
        this.password = password;
        this.rol = rol;
    }


    //getter y setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
