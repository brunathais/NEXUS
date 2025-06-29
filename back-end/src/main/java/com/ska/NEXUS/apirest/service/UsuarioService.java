

package com.ska.NEXUS.apirest.service;

import com.ska.NEXUS.apirest.model.UsuarioModel;
import com.ska.NEXUS.apirest.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

    @Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repo;

    @Autowired
private PasswordEncoder passwordEncoder;


    public UsuarioModel salvar(UsuarioModel usuario) {
        usuario.setSenha(passwordEncoder.encode(UsuarioDTO.getSenha()));
usuarioRepository.save(usuario);
//não precisa do return? ex de antes: return repo.save(user);
    }

    public ResponseEntity<?> autenticar(LoginDTO dto) {
        Optional<Usuario> usuarioOpt = UsuarioRepository.findByEmail(dto.getEmail());
        
        if(usuarioOpt.isEmpty() || 
        !passwordEncoder.matches(dto.getSenha(), usuarioOpt.get().getSenha()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body("Usuário ou senha inválidos/incorretos");
        }
        )
        Usuario usuario = usuarioOpt.get();
        return ResponseEntity.ok(usuario)
    }
}


