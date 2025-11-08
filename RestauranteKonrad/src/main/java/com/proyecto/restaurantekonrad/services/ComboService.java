package com.proyecto.restaurantekonrad.services;

import com.proyecto.restaurantekonrad.model.Combo;
import com.proyecto.restaurantekonrad.model.Plato;
import com.proyecto.restaurantekonrad.repository.ComboRepository;
import com.proyecto.restaurantekonrad.repository.PlatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ComboService {

    @Autowired
    private ComboRepository comboRepository;

    @Autowired
    private PlatoRepository platoRepository;

    //crear un nuevo combo
    public Combo crearCombo(String nombre) {
        Combo combo = new Combo();
        combo.setNombre(nombre);
        combo.setItems(new ArrayList<>());
        return comboRepository.save(combo);
    }

    // ✅ Buscar combo y plato por nombre
    public String agregarPlatoAComboPorNombre(String nombreCombo, String nombrePlato) {
        Optional<Combo> comboOpt = comboRepository.findByNombre(nombreCombo);
        Optional<Plato> platoOpt = platoRepository.findByNombre(nombrePlato);

        if (comboOpt.isEmpty()) {
            return "Combo con nombre '" + nombreCombo + "' no encontrado.";
        }

        if (platoOpt.isEmpty()) {
            return "Plato con nombre '" + nombrePlato + "' no encontrado. Solo se pueden agregar platos existentes.";
        }

        Combo combo = comboOpt.get();
        List<Plato> items = combo.getItems();
        if (items == null) items = new ArrayList<>();

        items.add(platoOpt.get());
        combo.setItems(items);
        comboRepository.save(combo);

        return "✅ Plato '" + nombrePlato + "' agregado al combo '" + nombreCombo + "'.";
    }

    //obtener lista de combos
    public List<Combo> obtenerCombos() {
        return comboRepository.findAll();
    }

    //obtener combo por sus nombre
    public Combo obtenerComboPorNombre(String nombreCombo) {
        return comboRepository.findByNombre(nombreCombo).orElse(null);
    }

    //elimina combo
    public String eliminarComboPorNombre(String nombreCombo) {
        Optional<Combo> comboOpt = comboRepository.findByNombre(nombreCombo);
        if (comboOpt.isPresent()) {
            comboRepository.delete(comboOpt.get());
            return "Combo" + nombreCombo + "' eliminado correctamente.";
        } else {
            return " No existe el combo con nombre: " + nombreCombo;
        }
    }
}


