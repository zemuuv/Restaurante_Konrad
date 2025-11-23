package com.proyecto.restaurantekonrad.services;

import com.proyecto.restaurantekonrad.model.Auditoria;
import com.proyecto.restaurantekonrad.repository.AuditoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditoriaService {

    @Autowired
    private AuditoriaRepository repository;

    // Crear auditoría
    public Auditoria crearAuditoria(String fecha, String titulo, String descripcion) {
        Auditoria auditoria = new Auditoria(fecha, titulo, descripcion);
        return repository.save(auditoria);
    }

    // Listar auditorías
    public List<Auditoria> listarAuditorias() {
        return repository.findAll();
    }

    // Obtener auditoría por id
    public Auditoria obtenerPorId(String id) {
        return repository.findById(id).orElse(null);
    }

    // Actualizar auditoría
    public Auditoria actualizarAuditoria(String id, String fecha, String titulo, String descripcion) {

        Auditoria existente = repository.findById(id).orElse(null);

        if (existente != null) {
            existente.setFecha(fecha);
            existente.setTitulo(titulo);
            existente.setDescripcion(descripcion);
            return repository.save(existente);
        }

        return null;
    }

    // Eliminar auditoría
    public String eliminarAuditoria(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Auditoría eliminada correctamente";
        }
        return "Auditoría no encontrada";
    }
}
