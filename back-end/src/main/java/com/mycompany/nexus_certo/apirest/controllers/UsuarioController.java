
package com.mycompany.nexus_certo.apirest.controllers;



import com.mycompany.nexus_certo.apirest.model.UsuarioModel;
import com.mycompany.nexus_certo.apirest.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/usuarios")
    public ResponseEntity<UsuarioModel> cadastrar(@RequestBody UsuarioModel user) {
        return ResponseEntity.ok(service.salvar(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioModel user) {
        if (service.autenticar(user.getEmail(), user.getSenha())) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).build();
        }
    }
}


