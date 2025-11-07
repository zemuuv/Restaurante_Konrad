package com.proyecto.restaurantekonrad.services;

import com.proyecto.restaurantekonrad.model.Menu;
import com.proyecto.restaurantekonrad.model.Plato;
import com.proyecto.restaurantekonrad.repository.MenuRepository;
import com.proyecto.restaurantekonrad.repository.PlatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuService {

    @Autowired
    private  PlatoRepository platoRepository;

    @Autowired
    private  MenuRepository menuRepository;

    public String ingresarPlato(Plato plato) {
        // Guardar el plato en su colección
        platoRepository.save(plato);

        // 2Verificar si ya existe un menú
        Menu menuExistente = menuRepository.findAll().stream().findFirst().orElse(null);

        if (menuExistente == null) {
            // Si no existe menú, crear uno nuevo
            Menu nuevoMenu = new Menu();
            nuevoMenu.setId_Menu("menu_unico"); // puedes dejarlo fijo o generar un UUID
            List<Plato> listaPlatos = new ArrayList<>();
            listaPlatos.add(plato);
            nuevoMenu.setPlatos(listaPlatos);
            menuRepository.save(nuevoMenu);
            return "Primer menú creado y plato agregado";
        } else {
            // Si ya existe, agregar el nuevo plato
            List<Plato> listaPlatos = menuExistente.getPlatos();
            if (listaPlatos == null) {
                listaPlatos = new ArrayList<>();
            }
            listaPlatos.add(plato);
            menuExistente.setPlatos(listaPlatos);
            menuRepository.save(menuExistente);
            return "Plato agregado al menú existente";
        }
    }

    public Menu obtenerMenu() {
        return menuRepository.findAll().stream().findFirst().orElse(null);
    }
}
