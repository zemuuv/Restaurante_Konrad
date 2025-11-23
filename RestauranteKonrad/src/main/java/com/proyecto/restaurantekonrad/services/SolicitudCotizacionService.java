package com.proyecto.restaurantekonrad.services;

import com.proyecto.restaurantekonrad.model.SolicitudCotizacion;
import com.proyecto.restaurantekonrad.repository.SolicitudCotizacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitudCotizacionService {

    @Autowired
    private SolicitudCotizacionRepository repository;

    // Crear solicitud
    public SolicitudCotizacion crearSolicitud(String titulo, String descripcion) {
        SolicitudCotizacion solicitud = new SolicitudCotizacion(titulo, descripcion);
        return repository.save(solicitud);
    }

    // Listar solicitudes
    public List<SolicitudCotizacion> listarSolicitudes() {
        return repository.findAll();
    }

    // Obtener por id
    public SolicitudCotizacion obtenerPorId(String id) {
        return repository.findById(id).orElse(null);
    }

    // Actualizar solicitud
    public SolicitudCotizacion actualizarSolicitud(String id, String titulo, String descripcion) {

        SolicitudCotizacion existente = repository.findById(id).orElse(null);

        if (existente != null) {
            existente.setTitulo(titulo);
            existente.setDescripcion(descripcion);
            return repository.save(existente);
        }

        return null;
    }

    // Eliminar solicitud
    public String eliminarSolicitud(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Solicitud eliminada correctamente";
        }
        return "Solicitud no encontrada";
    }
}
