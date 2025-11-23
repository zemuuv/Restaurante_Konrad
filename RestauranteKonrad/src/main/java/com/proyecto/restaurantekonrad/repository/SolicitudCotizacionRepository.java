package com.proyecto.restaurantekonrad.repository;

import com.proyecto.restaurantekonrad.model.SolicitudCotizacion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudCotizacionRepository extends MongoRepository<SolicitudCotizacion, String> {
}
