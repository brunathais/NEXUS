package com.mycompany.nexus_certo.apirest.controllers;

import com.mycompany.nexus_certo.apirest.model.CadastroModel;
import com.mycompany.nexus_certo.apirest.service.CadastroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class CadastroController {
    /*

    @Autowired
    private CadastroService service;

    @PostMapping("/cadastros")
    public ResponseEntity<?> cadastrar(@Valid @RequestBody CadastroModel cadastro) {
        if (service.existePorUsuario(cadastro.getUsuario())) {
            return ResponseEntity.badRequest().body(Map.of("usuario", "Usuário já cadastrado."));
        }
        CadastroModel salvo = service.salvar(cadastro);
        salvo.setSenha(null);
        return ResponseEntity.ok(Map.of("mensagem", "Cadastro realizado com sucesso!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CadastroModel cadastro) {
        if (service.autenticar(cadastro.getUsuario(), cadastro.getSenha())) {
            return ResponseEntity.ok(Map.of("mensagem", "Login realizado com sucesso!"));
        } else {
            return ResponseEntity.status(401).body(Map.of("erro", "Usuário ou senha inválidos"));
        }
    }
*/
}


