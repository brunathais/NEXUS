package com.ska.NEXUS.controllers;

import com.ska.NEXUS.dto.AulaDTO;
import com.ska.NEXUS.service.AulaService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController //define pasta como requisição  define que a classe AulaLista seja uma requisicao
@RequestMapping("/aulaLista")//define que a requisicao tenha o nome do servico
@CrossOrigin(origins = "*") //https, nunca mudar... define a seguranca da aplicacao

public class AulaLista {

    // define que o tipo da requisicao seja um GET 
    //define o nome do servico
    @GetMapping("/dados") 
    
    //criacao de metodo dados que retorna a referencia da AulaDTO
    public List<AulaDTO> dados(){ //metodo retorna referencia de aulaDTO 
        return new AulaService().getDados();
    }
}
