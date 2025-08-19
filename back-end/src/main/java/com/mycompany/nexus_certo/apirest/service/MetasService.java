package com.mycompany.nexus_certo.apirest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycompany.nexus_certo.apirest.model.MetasModel;
import com.mycompany.nexus_certo.apirest.repository.MetasRepository;

@Service
public class MetasService {

    @Autowired
    private MetasRepository repo;

    public MetasModel salvar(MetasModel meta) {
        // Regra simples: valorPoupado não pode ser maior que valorTotal
        if (meta.getValorPoupado().compareTo(meta.getValorTotal()) > 0) {
            throw new IllegalArgumentException("Valor poupado não pode ser maior que o valor total da meta.");
        }
        return repo.save(meta);
    }

    public List<MetasModel> listar() {
        return repo.findAll();
    }

    public Optional<MetasModel> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public void deletar(Integer id) {
        repo.deleteById(id);
    }
}
