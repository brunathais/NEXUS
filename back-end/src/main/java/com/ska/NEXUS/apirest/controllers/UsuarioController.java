package com.ska.NEXUS.apirest.controllers;

import com.ska.NEXUS.apirest.dto.UsuarioDTO;
import com.ska.NEXUS.apirest.model.UsuarioModel;
import com.ska.NEXUS.apirest.repository.UsuarioRepository;
import com.ska.NEXUS.apirest.service.UsuarioService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UsuarioDTO dto) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsuario(dto.getUsuario());

        if (usuarioOpt.isEmpty() || !usuarioOpt.get().getSenha().equals(dto.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos");
        }

        return ResponseEntity.ok("Login realizado com sucesso!");
    }

    @PostMapping("/usuarios")
public ResponseEntity<String> cadastrar(@RequestBody UsuarioDTO dto) {
    if (usuarioRepository.existsByUsuario(dto.getUsuario())) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Usuário já existe");
    }
    // salvar normalmente
}


/* @Autowired
    private UsuarioService service;

    @PostMapping("/usuarios")
    public ResponseEntity<UsuarioModel> cadastrar(@RequestBody UsuarioModel user) {
        return ResponseEntity.ok(service.salvar(user));
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
    Optional<Usuario> usuario = usuarioRepository.findByEmail(dto.getEmail());
    
    
    if (usuario.isPresent() && usuario.get().getSenha().equals(dto.getSenha())) {
        return ResponseEntity.ok().body("Login bem-sucedido!");
    }
    
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos");
}
*/
    
/* 
 *     @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioModel user) {
        if (service.autenticar(user.getEmail(), user.getSenha())) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).build();
        }
    }
*/

}
