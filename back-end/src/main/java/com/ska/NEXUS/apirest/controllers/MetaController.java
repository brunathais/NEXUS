package com.seuprojeto.nexus.controller;

import com.seuprojeto.nexus.model.Meta;
import com.seuprojeto.nexus.service.MetaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "*") // libera o acesso do front-end
public class MetaController {

    private final MetaService service;

    public MetaController(MetaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Meta> salvar(@RequestBody Meta meta) {
        return ResponseEntity.ok(service.salvar(meta));
    }

    @GetMapping
    public ResponseEntity<List<Meta>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meta> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }

@PutMapping("/{id}")
public ResponseEntity<Meta> editarMeta(@PathVariable Long id, @RequestBody Meta novaMeta) {
    return service.buscarPorId(id)
        .map(meta -> {
            meta.setNome(novaMeta.getNome());
            meta.setValorTotal(novaMeta.getValorTotal());
            meta.setValorPoupado(novaMeta.getValorPoupado());
            meta.setPrazo(novaMeta.getPrazo());
            meta.setCategoria(novaMeta.getCategoria());
            return ResponseEntity.ok(service.salvar(meta));
        })
        .orElse(ResponseEntity.notFound().build());
}

}
