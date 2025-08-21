package com.mycompany.nexus_certo.apirest.controllers;

import com.mycompany.nexus_certo.apirest.model.CadastroModel;
import com.mycompany.nexus_certo.apirest.service.CadastroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mycompany.nexus_certo.apirest.model.CadastroModel;
import com.mycompany.nexus_certo.apirest.service.CadastroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/cadastros")
public class CadastroController {

    @Autowired
    private CadastroService service;

    @PostMapping
    public ResponseEntity<?> cadastrar(@Valid @RequestBody CadastroModel cadastro) {
        if (service.existePorUsuario(cadastro.getUsuario())) {
            return ResponseEntity.badRequest().body(Map.of("usuario", "Usuário já cadastrado."));
        }

        CadastroModel salvo = service.salvar(cadastro);
        salvo.setSenha(null); // não retornar senha
        return ResponseEntity.ok(Map.of("mensagem", "Cadastro realizado com sucesso!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciais) {
        String usuario = credenciais.get("usuario");
        String senha = credenciais.get("senha");

        if (usuario == null || senha == null) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Usuário e senha são obrigatórios."));
        }

        boolean autenticado = service.autenticar(usuario, senha);
        if (!autenticado) {
            return ResponseEntity.status(401).body(Map.of("erro", "Credenciais inválidas."));
        }

        return ResponseEntity.ok(Map.of("mensagem", "Login realizado com sucesso!"));
    }

}
