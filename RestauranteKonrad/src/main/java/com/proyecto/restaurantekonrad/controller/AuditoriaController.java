package com.proyecto.restaurantekonrad.controller;

import com.proyecto.restaurantekonrad.model.Auditoria;
import com.proyecto.restaurantekonrad.services.AuditoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auditorias")
public class AuditoriaController {

    @Autowired
    private AuditoriaService service;

    // Crear auditoría
    @PostMapping("/crear")
    public Auditoria crearAuditoria(@RequestBody Auditoria auditoria) {
        return service.crearAuditoria(
                auditoria.getFecha(),
                auditoria.getTitulo(),
                auditoria.getDescripcion()
        );
    }

    // Listar todas
    @GetMapping("/listar")
    public List<Auditoria> listar() {
        return service.listarAuditorias();
    }

    // Obtener por id
    @GetMapping("/{id}")
    public Auditoria obtener(@PathVariable String id) {
        return service.obtenerPorId(id);
    }

    // Actualizar
    @PutMapping("/actualizar/{id}")
    public Auditoria actualizar(
            @PathVariable String id,
            @RequestBody Auditoria auditoria
    ) {
        return service.actualizarAuditoria(
                id,
                auditoria.getFecha(),
                auditoria.getTitulo(),
                auditoria.getDescripcion()
        );
    }

    // Eliminar
    @DeleteMapping("/eliminar/{id}")
    public String eliminar(@PathVariable String id) {
        return service.eliminarAuditoria(id);
    }
}
