
package com.mycompany.nexus_certo.apirest.dto;

public class UsuarioDTO {
    private int id;
    private String usuario;
    private String senha;
    private String email;

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsuario() {
        return usuario;
    }



    public String getSenha() {
        return senha;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }


    public void setSenha(String senha) {
        this.senha = senha;
    }
}
