package com.proyecto.restaurantekonrad.controller;


import com.proyecto.restaurantekonrad.model.Usuarios;
import com.proyecto.restaurantekonrad.repository.UsuarioRepository;
import com.proyecto.restaurantekonrad.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping
@RestController
public class AuthController {

    //@Autowired funciona como el new en Spring boot
    @Autowired//objeto de la clase AuthService
    private AuthService authService;


    //EndPoint Post para hacer login
    @PostMapping("/LogIn")
    public String login(@RequestBody Usuarios usuario) {

        Usuarios rol = authService.EncontrarUsuario(usuario);
        Usuarios user = authService.EncontrarUsuario(usuario);

        if (user != null && authService.IniciarSesion(usuario.getPassword(), user.getPassword())) {
            return rol.getRol();//si la contraseña coincide devuelve el rol del usuario
        } else {
            return "Credenciales inválidas";//si la contraseña no coincide devuelve el texto
        }
    }

    //EndPoint Post para el SignUp
    @PostMapping("/SingUp")
    public String CrearCuenta(@RequestBody Usuarios usuarios) {
        authService.RegistrarUsuario(usuarios);
        return "usuario registrado";
    }
}
