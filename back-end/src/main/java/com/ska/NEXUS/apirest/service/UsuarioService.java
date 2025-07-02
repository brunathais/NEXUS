

package com.ska.NEXUS.apirest.service;

import com.ska.NEXUS.apirest.model.UsuarioModel;
import com.ska.NEXUS.apirest.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

    @Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repo;

    public UsuarioModel salvar(UsuarioModel user) {
        return repo.save(user);
    }

    public boolean autenticar(String email, String senha) {
        return repo.findByEmailAndSenha(email, senha).isPresent();
    }
}


