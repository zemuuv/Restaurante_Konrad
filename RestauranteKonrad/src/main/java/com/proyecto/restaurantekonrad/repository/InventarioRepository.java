package com.proyecto.restaurantekonrad.repository;

import com.proyecto.restaurantekonrad.model.Inventario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventarioRepository extends MongoRepository<Inventario,String> {
}
