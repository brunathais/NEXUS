package com.ska.NEXUS.controllers;

import com.ska.NEXUS.dto.MetasDTO;
import com.ska.NEXUS.repository.MetasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/metas")
public class MetaController {

    @Autowired
    private MetasRepository metasRepository;

    @PostMapping
    public ResponseEntity<?> salvarMeta(@RequestBody MetasDTO meta) {
        try {
            metasRepository.salvar(meta);
            return ResponseEntity.ok("Meta salva com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao salvar meta: " + e.getMessage());
        }
    }
}
