package com.ska.NEXUS.service;

import com.ska.NEXUS.dto.AutenticacaoDTO;

public class AutenticacaoService {

    private final String usuarioCerto = "certo";
    private final String senhaCerta = "1357";

    public Boolean autenticar(AutenticacaoDTO dto) {
        String usuario = dto.getUsuario();
        String senha = dto.getSenha();

        System.err.println(usuario);
        System.err.println(senha);

        // if (usuario.equals(this.usuarioCerto) && senha.equals(this.senhaCerta)) {
        //   return true;
        //} else {
        //   return false;
        //}
        return usuario.equals(this.usuarioCerto) && senha.equals(this.senhaCerta);
    }

}
