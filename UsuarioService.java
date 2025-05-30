package com.ska.NEXUS.service;

import com.ska.NEXUS.dto.UsuarioDTO;
import com.ska.NEXUS.model.UsuarioModel;
import com.ska.NEXUS.repository.UsuarioRepository;
import java.util.List;
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

        if (dto.getId() != null) {
            usuarioRepository.updateUsuario(dto);

        } else {
            usuarioRepository.inserirUsuario(dto);
        }

        return true;

    }

public List<UsuarioDTO> listar() {
    // Busca todos os usuários no banco de dados
    return usuarioRepository.findAll()
        .stream() // Converte a lista para um fluxo
        .map(usuario -> {
            UsuarioDTO dto = new UsuarioDTO(); // Cria um novo DTO para cada registro
            dto.setId(usuario.getId()); // Define o ID
            dto.setUsuario(usuario.getUsuario()); // Define o nome de usuário
            dto.setEmail(usuario.getEmail()); // Define o email
            return dto; // Retorna o DTO
        })
        .toList(); // Converte o fluxo de volta para uma lista
}


}
