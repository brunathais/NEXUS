package com.ska.NEXUS.service;

import com.ska.NEXUS.dto.UsuarioDTO;
import com.ska.NEXUS.repository.impl.UsuarioRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;

public class UsuarioService {
    
    @Autowired
    private UsuarioRepositoryImpl usuarioRepository;
    
    public boolean receberMensagem(UsuarioDTO usuarioDTO){
        return usuarioRepository.inserirUsuario(usuarioDTO);
    }

    private final String usuarioCerto = "oi";
    private final String senhaCerta = "oi";

    
    
    
    public Boolean cadastro(UsuarioDTO dto) {
        String usuario = dto.getUsuario();
        String senha = dto.getSenha();
        
        System.err.println(usuario);
        System.err.println(senha);
        
        return usuario.equals(this.usuarioCerto) && senha.equals(this.senhaCerta);
        
    }
    
    
}
