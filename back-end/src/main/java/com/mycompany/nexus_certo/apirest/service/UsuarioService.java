package com.mycompany.nexus_certo.apirest.service;

import com.mycompany.nexus_certo.apirest.model.UsuarioModel;
import com.mycompany.nexus_certo.apirest.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

    @Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repo;

    public UsuarioModel salvar(UsuarioModel user) {
        return repo.save(user);
    }

    public boolean autenticar(String usuario, String senha) {
        return repo.findByUsuarioAndSenha(usuario, senha).isPresent();
    }
}

