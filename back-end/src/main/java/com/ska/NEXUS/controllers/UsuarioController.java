
package com.ska.NEXUS.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UsuarioController{

@GetMapping("mensagem")
public String mensagem(@RequestParam String texto){
    return "mensagem recebida: " + texto;
}


@GetMapping("mensagem2")
public String mensagem2(){
return "OLA SOU UMA MENSAGEM!";
}


}