package com.mycompany.nexus_certo.apirest.controllers;

import com.mycompany.nexus_certo.apirest.dto.UsuarioDTO;
import com.mycompany.nexus_certo.apirest.model.UsuarioModel;
import com.mycompany.nexus_certo.apirest.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {
    
    @Autowired
    private UsuarioService service;

    @GetMapping("/usuarios")
    public String info() {
        return "Endpoint de usuários online! Use POST para cadastrar.";
    }

    @PostMapping("/usuarios")
    public ResponseEntity<UsuarioModel> cadastrar(@RequestBody UsuarioDTO dto) {
        UsuarioModel user = new UsuarioModel();
        user.setUsuario(dto.getUsuario());
        user.setEmail(dto.getEmail());
        user.setSenha(dto.getSenha());
        return ResponseEntity.ok(service.salvar(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioModel user) {
        if (service.autenticar(user.getUsuario(), user.getSenha())) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).build();
        }
    }
    
}


