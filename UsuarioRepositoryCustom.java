package com.ska.NEXUS.repository.custom;

import com.ska.NEXUS.dto.UsuarioDTO;

public interface UsuarioRepositoryCustom {

    public boolean inserirUsuario(UsuarioDTO usuarioDTO);

    public boolean updateUsuario(UsuarioDTO usuarioDTO);

}
