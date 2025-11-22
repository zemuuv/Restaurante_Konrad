package com.proyecto.restaurantekonrad.services;

import com.proyecto.restaurantekonrad.model.Inventario;
import com.proyecto.restaurantekonrad.model.Menu;
import com.proyecto.restaurantekonrad.model.Plato;
import com.proyecto.restaurantekonrad.repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InventarioService {

    @Autowired
    private InventarioRepository inventarioRepository;

    public String nuevoInventario(Plato plato){
        Inventario InventarioExistente = inventarioRepository.findAll().stream().findFirst().orElse(null);

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
}
