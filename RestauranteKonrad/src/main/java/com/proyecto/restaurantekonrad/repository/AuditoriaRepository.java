package com.proyecto.restaurantekonrad.repository;

import com.proyecto.restaurantekonrad.model.Auditoria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditoriaRepository extends MongoRepository<Auditoria, String> {
}
