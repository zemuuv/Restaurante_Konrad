package com.proyecto.restaurantekonrad.repository;

import com.proyecto.restaurantekonrad.model.Plato;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatoRepository extends MongoRepository<Plato,String> {
}
