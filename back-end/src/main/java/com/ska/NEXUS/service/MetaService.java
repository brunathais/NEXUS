package com.seuprojeto.nexus.service;

import com.seuprojeto.nexus.model.MetaFinanceira;
import com.seuprojeto.nexus.repository.MetaFinanceiraRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MetaFinanceiraService {

    private final MetaFinanceiraRepository repository;

    public MetaFinanceiraService(MetaFinanceiraRepository repository) {
        this.repository = repository;
    }

    public MetaFinanceira salvar(MetaFinanceira meta) {
        return repository.save(meta);
    }

    public List<MetaFinanceira> listar() {
        return repository.findAll();
    }

    public Optional<MetaFinanceira> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
