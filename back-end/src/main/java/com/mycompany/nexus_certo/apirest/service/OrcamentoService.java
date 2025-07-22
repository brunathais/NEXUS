package com.mycompany.nexus_certo.apirest.service;

import com.mycompany.nexus_certo.apirest.model.OrcamentoModel;
import com.mycompany.nexus_certo.apirest.repository.OrcamentoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrcamentoService {
    
    @Autowired
    private OrcamentoRepository repo;
    
    public OrcamentoModel salvar(OrcamentoModel orcamento){
        return repo.save(orcamento);
    }
    public List<OrcamentoModel> listar(){
        return repo.findAll();
    }
    public Optional<OrcamentoModel> buscarPorId(int id){
        return repo.findById(id);
    }
    public void deletar(int id){
        repo.deleteById(id);
    }
}
