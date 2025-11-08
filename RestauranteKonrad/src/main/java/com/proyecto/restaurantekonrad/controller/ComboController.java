package com.proyecto.restaurantekonrad.controller;

import com.proyecto.restaurantekonrad.model.Combo;
import com.proyecto.restaurantekonrad.services.ComboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/combos")
public class ComboController {

    @Autowired
    private ComboService comboService;

    // Crear combo
    @PostMapping("/crear")
    public Combo crearCombo(@RequestParam String nombre) {
        return comboService.crearCombo(nombre);
    }

    // Agregar plato a combo por nombre
    @PostMapping("/{nombreCombo}/agregarPlato/{nombrePlato}")
    public String agregarPlatoACombo(
            @PathVariable String nombreCombo,
            @PathVariable String nombrePlato) {
        return comboService.agregarPlatoAComboPorNombre(nombreCombo, nombrePlato);
    }

    //mostrar lista de combos
    @GetMapping("/listar")
    public List<Combo> listarCombos() {
        return comboService.obtenerCombos();
    }

    //buscar combo por nombre
    @GetMapping("/{nombreCombo}")
    public Combo obtenerCombo(@PathVariable String nombreCombo) {
        return comboService.obtenerComboPorNombre(nombreCombo);
    }

    //eliminar combo por nombre
    @DeleteMapping("/{nombreCombo}")
    public String eliminarCombo(@PathVariable String nombreCombo) {
        return comboService.eliminarComboPorNombre(nombreCombo);
    }
}
