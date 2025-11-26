package com.proyecto.restaurantekonrad.controller;


import com.proyecto.restaurantekonrad.model.Plato;
import com.proyecto.restaurantekonrad.services.MenuService;
import com.proyecto.restaurantekonrad.services.SistemaRestaurante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping
@RestController
public class PlatoController {

    @Autowired
    private SistemaRestaurante sistemaRestaurante;

    //agregar nuevo plato al menu e inventario
    @PostMapping("/agregarPlato")
    public String agregarPlatoAlMenu(@RequestBody Plato plato) {
        return sistemaRestaurante.agregarProducto(plato);
    }


    @GetMapping("menu/listar")
    public List<Plato> obtenerPlatosMenu() {
        return sistemaRestaurante.obtenerMenu();
    }

    @GetMapping("inventario/listar")
    public List<Plato> obtenerPlatosInventario() {
        return sistemaRestaurante.obtenerInventario();
    }


    @DeleteMapping("/platos/{id}")
    public String eliminarPlato(@PathVariable String id) {
        return sistemaRestaurante.eliminarPlato(id);
    }


}
