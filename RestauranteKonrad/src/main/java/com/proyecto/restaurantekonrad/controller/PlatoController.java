package com.proyecto.restaurantekonrad.controller;


import com.proyecto.restaurantekonrad.model.Plato;
import com.proyecto.restaurantekonrad.services.MenuService;
import com.proyecto.restaurantekonrad.services.SistemaRestaurante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping
@RestController
public class PlatoController {

    @Autowired
    private SistemaRestaurante sistemaRestaurante;

    @PostMapping("/agregarPlato")
    public String agregarPlatoAlMenu(@RequestBody Plato plato) {
        return sistemaRestaurante.agregarProducto(plato);
    }



}
