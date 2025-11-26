package com.proyecto.restaurantekonrad.services;

import com.proyecto.restaurantekonrad.model.Inventario;
import com.proyecto.restaurantekonrad.model.Menu;
import com.proyecto.restaurantekonrad.model.Plato;
import com.proyecto.restaurantekonrad.repository.InventarioRepository;
import com.proyecto.restaurantekonrad.repository.MenuRepository;
import com.proyecto.restaurantekonrad.repository.PlatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Service
public class InventarioService {

    @Autowired
    private InventarioRepository inventarioRepository;
    @Autowired
    private PlatoRepository platoRepository;

    public Inventario InventarioExistente;

    public String nuevoInventario(Plato plato){
        InventarioExistente = inventarioRepository.findAll().stream().findFirst().orElse(null);

        if (InventarioExistente == null) {
            // Si no existe menú, crear uno nuevo
            Inventario nuevoInventario = new Inventario();
            nuevoInventario.setId_Inventario("Inventario_unico");
            List<Plato> listaPlatos = new ArrayList<>();
            listaPlatos.add(plato);
            nuevoInventario.setPlatos(listaPlatos);
            inventarioRepository.save(nuevoInventario);
            return "Plato agregado al inventario";
        } else {
            // Si ya existe, agregar el nuevo plato
            List<Plato> listaPlatos = InventarioExistente.getPlatos();
            if (listaPlatos == null) {
                listaPlatos = new ArrayList<>();
            }
            for (int indice = 0;indice<listaPlatos.size();indice++){
                if (listaPlatos.get(indice).getNombre().equals(plato.getNombre())) {
                    listaPlatos.get(indice).setCantidad(listaPlatos.get(indice).getCantidad()+plato.getCantidad());
                }else {
                    if(indice==listaPlatos.size()-1){
                        listaPlatos.add(plato);
                    }
                }
            }
            InventarioExistente.setPlatos(listaPlatos);
            inventarioRepository.save(InventarioExistente);
            return "Plato agregado al inventario";
        }
    }

    public List<Plato> obtenerplatos() {
        return platoRepository.findAll();
    }

    public String eliminarPlato(String id) {
        InventarioExistente = inventarioRepository.findAll()
                .stream()
                .findFirst()
                .orElse(null);

        List<Plato> listaPlatos = InventarioExistente.getPlatos();

        if (!platoRepository.existsById(id)) {
            return "El plato no existe.";
        }

        listaPlatos.remove(platoRepository.findById(id).get());

        InventarioExistente.setPlatos(listaPlatos);
        inventarioRepository.save(InventarioExistente);
        platoRepository.deleteById(id);
        return "Plato eliminado.";
    }
}
