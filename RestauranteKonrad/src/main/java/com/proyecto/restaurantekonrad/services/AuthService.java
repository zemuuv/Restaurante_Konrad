package com.proyecto.restaurantekonrad.services;

import com.proyecto.restaurantekonrad.model.Usuarios;
import com.proyecto.restaurantekonrad.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//clase que aplica la logica de autorisacion de usuarios
@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    //instancia de la clase que se usa para encriptar la contraseña
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    //metodo que se usa para ingresar usuario y encriptar la contraseña
    public String RegistrarUsuario(Usuarios usuario){

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuarioRepository.save(usuario);

        return "usuario registrado";
    }

    //metodo para comprobar que las contraseñas coincidan
    public Boolean IniciarSesion(String passwordIngresada, String passwordGuardada){
        return passwordEncoder.matches(passwordIngresada, passwordGuardada);
    }

    //metodo para encontrar el ususario por su nombre de usuario
    public Usuarios EncontrarUsuario(Usuarios usuario){
        return usuarioRepository.findByUsuario(usuario.getUsuario());
    }
}
