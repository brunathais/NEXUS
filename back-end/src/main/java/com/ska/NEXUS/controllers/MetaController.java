package com.seuprojeto.nexus.controller;

import com.seuprojeto.nexus.model.MetaFinanceira;
import com.seuprojeto.nexus.service.MetaFinanceiraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "*") // libera o acesso do front-end
public class MetaFinanceiraController {

    private final MetaFinanceiraService service;

    public MetaFinanceiraController(MetaFinanceiraService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<MetaFinanceira> salvar(@RequestBody MetaFinanceira meta) {
        return ResponseEntity.ok(service.salvar(meta));
    }

    @GetMapping
    public ResponseEntity<List<MetaFinanceira>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MetaFinanceira> buscarPorId(@PathVariable Long id) {
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
public ResponseEntity<MetaFinanceira> editarMeta(@PathVariable Long id, @RequestBody MetaFinanceira novaMeta) {
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
