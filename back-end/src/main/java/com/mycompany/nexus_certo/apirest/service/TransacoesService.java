package com.mycompany.nexus_certo.apirest.service;

import com.mycompany.nexus_certo.apirest.model.TransacoesModel;
import com.mycompany.nexus_certo.apirest.repository.TransacoesRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransacoesService {
    @Autowired
    private TransacoesRepository repo;
            
    public TransacoesModel salvar(TransacoesModel transacao){
        return repo.save(transacao);
    }
    public List<TransacoesModel> listar(){
     return repo.findAll();
    }
    public Optional<TransacoesModel> buscarPorId(int id){
        return repo.findById(id);
    }
    
    public void deletar(int id){
        repo.deleteById(id);
    }
}
