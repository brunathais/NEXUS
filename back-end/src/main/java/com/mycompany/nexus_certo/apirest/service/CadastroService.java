package com.mycompany.nexus_certo.apirest.service;

import com.mycompany.nexus_certo.apirest.model.CadastroModel;
import com.mycompany.nexus_certo.apirest.repository.CadastroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CadastroService {

    @Autowired
    private CadastroRepository repo;

    public CadastroModel salvar(CadastroModel cadastro) {
        return repo.save(cadastro);
    }

    public boolean autenticar(String usuario, String senha) {
        return repo.findByUsuarioAndSenha(usuario, senha).isPresent();
    }

    public boolean existePorUsuario(String usuario) {
        return repo.findByUsuario(usuario).isPresent();
    }
}
