package com.ska.NEXUS.controllers;
import com.ska.NEXUS.repository.CadastroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/CadastroController")
@CrossOrigin(origins = "*") // Altere conforme necessário
public class CadastroController {



    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarUsuario(@RequestBody CadastroController usuario) {
       // cadastroRepository.save(usuario);
        return ResponseEntity.ok("Usuário cadastrado com sucesso!");
    }
}
