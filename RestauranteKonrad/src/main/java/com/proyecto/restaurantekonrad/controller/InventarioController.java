package com.proyecto.restaurantekonrad.controller;

import com.proyecto.restaurantekonrad.model.Inventario;
import com.proyecto.restaurantekonrad.model.Plato;
import com.proyecto.restaurantekonrad.repository.InventarioRepository;
import com.proyecto.restaurantekonrad.services.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/inventario")
public class InventarioController {

    @Autowired
    private InventarioService inventarioService;

    @Autowired
    private InventarioRepository inventarioRepository;

    // ===============================
    // OBTENER INVENTARIO (GET)
    // ===============================
    @GetMapping
    public Inventario obtenerInventario() {
        return inventarioRepository.findAll()
                .stream()
                .findFirst()
                .orElse(null);
    }

    // ===============================
    // AGREGAR PLATO (POST)
    // ===============================
    @PostMapping
    public String agregarPlato(@RequestBody Plato plato) {
        return inventarioService.nuevoInventario(plato);
    }

    // ===============================
    // ACTUALIZAR INVENTARIO COMPLETO (PUT)
    // ===============================
    @PutMapping("/{id}")
    public Inventario actualizarInventario(@PathVariable String id, @RequestBody Inventario inventario) {
        inventario.setId_Inventario(id);
        return inventarioRepository.save(inventario);
    }

    // ===============================
    // ELIMINAR INVENTARIO (DELETE)
    // ===============================
    @DeleteMapping("/{id}")
    public String eliminarInventario(@PathVariable String id) {
        inventarioRepository.deleteById(id);
        return "Inventario eliminado";
    }
}
