package com.seuprojeto.nexus.service;

import com.seuprojeto.nexus.model.MetaModel;
import com.seuprojeto.nexus.repository.MetaRepository;
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
