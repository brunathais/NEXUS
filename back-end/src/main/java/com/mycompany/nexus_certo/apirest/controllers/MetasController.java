package com.mycompany.nexus_certo.apirest.controllers;

import com.mycompany.nexus_certo.apirest.model.MetasModel;
import com.mycompany.nexus_certo.apirest.service.MetasService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "*")
public class MetasController {

    @Autowired
    private MetasService service;

    @PostMapping
    public ResponseEntity<?> criar(@Valid @RequestBody MetasModel meta) {
        try {
            MetasModel salva = service.salvar(meta);
            return ResponseEntity.created(URI.create("/api/metas/" + salva.getId())).body(salva);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping
    public List<MetasModel> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MetasModel> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Integer id, @Valid @RequestBody MetasModel meta) {
        return service.buscarPorId(id).map(existente -> {
            existente.setNomeMeta(meta.getNomeMeta());
            existente.setValorTotal(meta.getValorTotal());
            existente.setValorInicial(meta.getValorInicial());
            existente.setValorPoupado(meta.getValorPoupado());
            MetasModel salvo = service.salvar(existente);
            return ResponseEntity.ok(salvo);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (service.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
