package com.ska.NEXUS.apirest.service;

import com.ska.NEXUS.apirest.model.MetaModel;
import com.ska.NEXUS.apirest.repository.MetaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MetaService {

    private final MetaRepository repository;

    public MetaService(MetaRepository repository) {
        this.repository = repository;
    }

    public MetaModel salvar(MetaModel meta) {
        return repository.save(meta);
    }

    public List<MetaModel> listar() {
        return repository.findAll();
    }

    public Optional<MetaModel> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
