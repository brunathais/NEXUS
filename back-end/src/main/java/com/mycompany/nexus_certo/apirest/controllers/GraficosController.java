package com.mycompany.nexus_certo.apirest.controllers;

import com.mycompany.nexus_certo.apirest.service.GraficosService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/graficos")
@CrossOrigin(origins = "*")
public class GraficosController {

    @Autowired
    private GraficosService service;

    @GetMapping("/mensal")
    public ResponseEntity<Map<String, Object>> mensal(@RequestParam int ano) {
        List<Map<String, Object>> meses = service.resumoMensal(ano);
        Map<String, Object> body = new HashMap<>();
        body.put("ano", ano);
        body.put("meses", meses);
        return ResponseEntity.ok(body);
    }
}
