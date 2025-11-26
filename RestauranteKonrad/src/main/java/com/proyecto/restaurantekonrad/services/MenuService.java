package com.proyecto.restaurantekonrad.services;

import com.proyecto.restaurantekonrad.model.Menu;
import com.proyecto.restaurantekonrad.model.Plato;
import com.proyecto.restaurantekonrad.repository.MenuRepository;
import com.proyecto.restaurantekonrad.repository.PlatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ansi.Ansi8BitColor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuService {

    @Autowired
    private  PlatoRepository platoRepository;

    @Autowired
    private  MenuRepository menuRepository;

    public Menu menuExistente;

    public String ingresarPlato(Plato plato) {

        // Verificar si ya existe un menú
        menuExistente = menuRepository.findAll()
                .stream()
                .findFirst()
                .orElse(null);

        if (menuExistente == null) {

            // Si no existe menú, crear uno nuevo
            Menu nuevoMenu = new Menu();
            nuevoMenu.setId_Menu("menu_unico"); // puedes dejarlo fijo o generar un UUID

            List<Plato> listaPlatos = new ArrayList<>();
            listaPlatos.add(plato);
            nuevoMenu.setPlatos(listaPlatos);

            menuRepository.save(nuevoMenu);

            // Guardar el plato en su colección
            platoRepository.save(plato);

            return "Primer menú creado y plato agregado";

        } else {

            // Si ya existe, agregar el nuevo plato
            List<Plato> listaPlatos = menuExistente.getPlatos();

            if (listaPlatos == null) {
                listaPlatos = new ArrayList<>();
            }

            for (int indice = 0; indice < listaPlatos.size(); indice++) {

                // Si el plato ya existe, aumentar cantidad
                if (listaPlatos.get(indice).getNombre().equals(plato.getNombre())) {

                    listaPlatos.get(indice).setCantidad(
                            listaPlatos.get(indice).getCantidad() + plato.getCantidad()
                    );

                } else {

                    // Si llegó al final sin encontrarlo, es un plato nuevo
                    if (indice == listaPlatos.size() - 1) {

                        // Guardar el plato en su colección
                        platoRepository.insert(plato);

                        listaPlatos.add(plato);
                    }
                }
            }

            menuExistente.setPlatos(listaPlatos);
            menuRepository.save(menuExistente);

            return "Plato agregado al menú existente";
        }
    }


    public List<Plato> obtenerplatos() {
        return platoRepository.findAll();
    }

    public String eliminarPlato(String id) {

        menuExistente = menuRepository.findAll()
                .stream()
                .findFirst()
                .orElse(null);

        List<Plato> listaPlatos = menuExistente.getPlatos();

        if (!platoRepository.existsById(id)) {
            return "El plato no existe.";
        }

        listaPlatos.remove(platoRepository.findById(id).get());

        menuExistente.setPlatos(listaPlatos);
        menuRepository.save(menuExistente);
        platoRepository.deleteById(id);
        return "Plato eliminado.";
    }
}
