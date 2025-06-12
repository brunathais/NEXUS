package com.ska.NEXUS.controllers;

import com.ska.NEXUS.dto.DespesaDTO;
import com.ska.NEXUS.service.DespesaService;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController //define pasta como requisição  define que a classe AulaLista seja uma requisicao
@RequestMapping("/aulaLista")//define que a requisicao tenha o nome do servico
@CrossOrigin(origins = "*") //https, nunca mudar... define a seguranca da aplicacao

public class DespesasController {
    //despsa, CRUD JS

    @GetMapping("/metodo")

    //criacao de metodo dados que retorna a referencia da AulaDTO
    public ArrayList<DespesaDTO> visualizarHistorico() { //metodo retorna referencia de aulaDTO 
        return new DespesaService().visualizarHistorico();
    }

    @PostMapping("/salvar")
    public ArrayList<DespesaDTO> salvar(@RequestBody DespesaDTO dto) { //metodo retorna referencia de aulaDTO 
        return new DespesaService().salvar(dto);
    }

     
}
