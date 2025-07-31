
package com.mycompany.nexus_certo.apirest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycompany.nexus_certo.apirest.model.GraficosModel;
import com.mycompany.nexus_certo.apirest.repository.GraficosRepository;

@Service

public class GraficosService {
    
    @Autowired

    private GraficosRepository repo;

    public GraficosModel salvar(GraficosModel graficos) {
        return repo.save(graficos);
    }

    public List<GraficosModel> listar() {
        return repo.findAll();
    }

    public void deletar(int id) {
        repo.deleteById(id);
    }

    public Optional<GraficosModel> buscarPorId(int id) {
        return repo.findById(id);
    }
}
