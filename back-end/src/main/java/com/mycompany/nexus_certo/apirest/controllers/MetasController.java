package com.mycompany.nexus_certo.apirest.controllers;

import com.mycompany.nexus_certo.apirest.model.MetasModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mycompany.nexus_certo.apirest.service.MetasService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/metas")

public class MetasController {

    @Autowired

    private MetasService service;

    @PostMapping

    public ResponseEntity<?> salvarMeta(@Valid @RequestBody MetasModel metas) {
        MetasModel salva = service.salvar(metas);
        return ResponseEntity.ok(salva);
    }

    @GetMapping
    public List<MetasModel> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable int id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @Valid @RequestBody MetasModel metas) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        metas.setId(id);
        return ResponseEntity.ok(service.salvar(metas));
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
