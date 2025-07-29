package com.mycompany.nexus_certo.apirest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycompany.nexus_certo.apirest.model.MetasModel;
import com.mycompany.nexus_certo.apirest.repository.MetasRepository;

@Service
public class MetasService {

    @Autowired

    private MetasRepository repo;

    public MetasModel salvar(MetasModel metas) {
        return repo.save(metas);
    }

    public List<MetasModel> listar() {
        return repo.findAll();
    }

    public void deletar(int id) {
        return repo.deleteById(id);
    }

    public Optional<MetasModel> buscarPorId(int id) {
        return repo.findById(id);
    }
}
