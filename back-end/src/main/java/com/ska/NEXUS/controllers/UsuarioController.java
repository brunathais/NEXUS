package com.ska.NEXUS.controllers;

import com.ska.NEXUS.dto.UsuarioDTO;
import com.ska.NEXUS.dto.autenticacaoDTO;
import com.ska.NEXUS.service.AutenticacaoService;
import com.ska.NEXUS.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarioController")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;
        
   
    @PostMapping
    @RequestMapping("/autenticar")
    public ResponseEntity<?> autenticar(@RequestBody autenticacaoDTO dto) {
        AutenticacaoService service  = new AutenticacaoService();
        
        // ? = qualquer classe
        //ResponseEntity<autenticacaoDTO>
        
        boolean autenticado = service.autenticar(dto);

         System.err.println(autenticado);
        
        if (autenticado) {
            return ResponseEntity.ok("Usuário autenticado com sucesso!");
        } else {
            return ResponseEntity.status(401).body("Usuário ou senha inválidos!");
        }
    }
    
    @GetMapping
    @RequestMapping("/teste")
    public String autenticar(@RequestParam String dto) {
        return "teste " + dto;
    }
    
    
    @PostMapping
    @RequestMapping("/cadastro")
    public ResponseEntity<?> cadastro(@RequestBody UsuarioDTO dto) {
        
        boolean cadastrado= usuarioService.cadastro(dto);

         System.err.println(cadastrado);
        
        if (cadastrado) {
            return ResponseEntity.ok("Usuário autenticado com sucesso!");
        } else {
            return ResponseEntity.status(401).body("Usuário ou senha inválidos!");
        }
    }
     
    
       
}
