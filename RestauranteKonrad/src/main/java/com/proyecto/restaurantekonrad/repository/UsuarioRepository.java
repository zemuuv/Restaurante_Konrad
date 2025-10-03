package com.proyecto.restaurantekonrad.repository;

import com.proyecto.restaurantekonrad.model.Usuarios;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

 /**
 * conexion a la base de datos
 * No las credenciales es la clase que se comunica directamente con la base de mongo
 * pormedio de la clase MongoRepository
 */
@Repository
public interface UsuarioRepository extends MongoRepository<Usuarios, String> {
    Usuarios findByUsuario(String usuario);//metodo para encontrar usuario
}
