package com.mycompany.nexus_certo.apirest.controllers;

import com.mycompany.nexus_certo.apirest.model.UsuarioModel;
import com.mycompany.nexus_certo.apirest.service.UsuarioService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {
/*
    @Autowired
    private UsuarioService service;

    @PostMapping("/usuarios")
    public ResponseEntity<UsuarioModel> cadastrar(@RequestBody UsuarioModel user) {
        return ResponseEntity.ok(service.salvar(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioModel user) {
        if (service.autenticar(user.getUsuario(), user.getSenha())) {
            Map<String, String> response = new HashMap<>();
            response.put("mensagem", "Login realizado com sucesso!");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("erro", "Usuário ou senha inválidos.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
*/
}
