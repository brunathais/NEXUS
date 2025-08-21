package com.mycompany.nexus_certo.apirest.controllers;

import com.mycompany.nexus_certo.apirest.model.TransacoesModel;
import com.mycompany.nexus_certo.apirest.service.TransacoesService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transacoes")
@CrossOrigin(origins = "*") // permite chamadas de qualquer origem

public class TransacoesController {

    @Autowired
    private TransacoesService service;

    @PostMapping
    public ResponseEntity<?> criar(@Valid @RequestBody TransacoesModel transacao) {
        TransacoesModel salva = service.salvar(transacao);
        return ResponseEntity.ok(salva);
    }

    @GetMapping
    public List<TransacoesModel> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable int id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @Valid @RequestBody TransacoesModel transacao) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        transacao.setId(id);
        return ResponseEntity.ok(service.salvar(transacao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable int id) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
