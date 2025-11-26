package com.proyecto.restaurantekonrad.services;

import com.proyecto.restaurantekonrad.model.Inventario;
import com.proyecto.restaurantekonrad.model.Plato;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SistemaRestaurante {

    @Autowired
    private InventarioService inventarioservice;
    @Autowired
    private MenuService menuService;

    public String agregarProducto (Plato plato) {
        String mensaje1 = inventarioservice.nuevoInventario(plato);
        String mensaje2 = menuService.ingresarPlato(plato);
        return mensaje1 +"\n"+ mensaje2;
    }

    public List<Plato> obtenerMenu() {
        return menuService.obtenerplatos();
    }

    public List<Plato> obtenerInventario() {
        return inventarioservice.obtenerplatos();
    }

    public String eliminarPlato(String id) {
        String mensaje1 = inventarioservice.eliminarPlato(id);
        menuService.eliminarPlato(id);
        return mensaje1;
    }


}
