package com.ska.NEXUS.dto;

public class CadastroDTO {
    private String usuario;
    private String senha;
    
    public String getUsuario(){
        return usuario;
    }
    
    public void setUsuario(String user){
        this.usuario = user;
    }
    
    public String getSenha(){
    return senha;
    }
    
   public void setSenha(String teste){
       this.senha = teste;
   }
}
