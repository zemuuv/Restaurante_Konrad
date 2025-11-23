package com.proyecto.restaurantekonrad.controller;

import com.proyecto.restaurantekonrad.model.SolicitudCotizacion;
import com.proyecto.restaurantekonrad.services.SolicitudCotizacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/solicitud")
public class SolicitudCotizacionController {

    @Autowired
    private SolicitudCotizacionService service;

    // Crear solicitud
    @PostMapping("/crear")
    public SolicitudCotizacion crearSolicitud(@RequestBody SolicitudCotizacion solicitud) {
        return service.crearSolicitud(solicitud.getTitulo(), solicitud.getDescripcion());
    }

    // Listar todas
    @GetMapping("/listar")
    public List<SolicitudCotizacion> listar() {
        return service.listarSolicitudes();
    }

    // Obtener por id
    @GetMapping("/{id}")
    public SolicitudCotizacion obtener(@PathVariable String id) {
        return service.obtenerPorId(id);
    }

    // Actualizar
    @PutMapping("/actualizar/{id}")
    public SolicitudCotizacion actualizar(
            @PathVariable String id,
            @RequestBody SolicitudCotizacion solicitud
    ) {
        return service.actualizarSolicitud(id, solicitud.getTitulo(), solicitud.getDescripcion());
    }

    // Eliminar
    @DeleteMapping("/eliminar/{id}")
    public String eliminar(@PathVariable String id) {
        return service.eliminarSolicitud(id);
    }
}
