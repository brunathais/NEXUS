package com.ska.NEXUS.service;

import com.ska.NEXUS.dto.UsuarioDTO;
import com.ska.NEXUS.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean receberMensagem(UsuarioDTO usuarioDTO) {
        return usuarioRepository.inserirUsuario(usuarioDTO);
    }

    public Boolean cadastro(UsuarioDTO dto) {
        String usuario = dto.getUsuario();
        String senha = dto.getSenha();
        String email = dto.getEmail();

        System.err.println(usuario);
        System.err.println(senha);
        System.err.println(email);

        if(dto.getId() != null){
            usuarioRepository.updateUsuario(dto);
            
        }else{
             usuarioRepository.inserirUsuario(dto);
        }    
        
        return true;

    }
    
    public boolean listarDados(){
        
    } 

    
}
