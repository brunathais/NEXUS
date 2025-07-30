package com.mycompany.nexus_certo.apirest.controllers;

import com.mycompany.nexus_certo.apirest.model.OrcamentoModel;
import com.mycompany.nexus_certo.apirest.service.OrcamentoService;
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

@CrossOrigin(origins = "*") // permite chamadas de qualquer origem

@RestController
@RequestMapping("/orcamentos")

public class OrcamentoController {
    @Autowired
    
    private OrcamentoService service;
    
    @PostMapping
    
    public ResponseEntity<?> criar(@Valid @RequestBody OrcamentoModel orcamento){
        OrcamentoModel salva = service.criar(orcamento);
        return ResponseEntity.ok(salva);
    }
      
    @GetMapping
    public List<OrcamentoModel> listar(){
        return service.listar();
    }
    
    @GetMapping("/{id}")
            public ResponseEntity<?> buscar(@PathVariable int id) {//PathVariable?
        return service.buscarPorId(id)
            .map(ResponseEntity::ok) //map? ::
            .orElse(ResponseEntity.notFound().build()); //oq faz?
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @Valid @RequestBody OrcamentoModel orcamento) {
        if (!service.buscarPorId(id).isPresent()) { //isPresent
            return ResponseEntity.notFound().build();
        }
        orcamento.setId(id);
        return ResponseEntity.ok(service.criar(orcamento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable int id) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deletar(id);
        return ResponseEntity.noContent().build(); //noContent
    }
    
}
