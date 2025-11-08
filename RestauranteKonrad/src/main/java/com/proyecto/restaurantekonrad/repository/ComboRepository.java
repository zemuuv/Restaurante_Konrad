package com.proyecto.restaurantekonrad.repository;

import com.proyecto.restaurantekonrad.model.Combo;
import com.proyecto.restaurantekonrad.model.Inventario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ComboRepository extends MongoRepository<Combo,String> {
    Optional<Combo> findByNombre(String nombre);
}
