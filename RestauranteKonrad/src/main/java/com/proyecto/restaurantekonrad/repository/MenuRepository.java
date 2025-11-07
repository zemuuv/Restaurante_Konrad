package com.proyecto.restaurantekonrad.repository;


import com.proyecto.restaurantekonrad.model.Menu;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends MongoRepository<Menu,String> {
}
