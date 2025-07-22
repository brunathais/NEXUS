package com.mycompany.nexus_certo.apirest.service;

import com.mycompany.nexus_certo.apirest.model.MetasModel;
import com.mycompany.nexus_certo.apirest.repository.MetasRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MetasService {

    @Autowired
    private MetasRepository repo;
            
    public MetasModel salvar(MetasModel metas){
        return repo.save(metas);
    }
    public List<MetasModel> listar(){
     return repo.findAll();
    }
    public Optional<MetasModel> buscarPorId(int id){
        return repo.findById(id);
    }
    
    public void deletar(int id){
        repo.deleteById(id);
    }
}

