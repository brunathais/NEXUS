
package com.ska.NEXUS.model;

import jakarta.persistence.*;

@Entity
@Table (name= "tb_usuario")

public class UsuarioModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name= "TX_NOME")
    private String nome;
    
    @Column(name= "TX_SENHA")
    private String senha;

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
    
    
    
    
    
    
   
    private String usuario;
    private String email;
    

    public String getUsuario(){
        return usuario;
    }
    
    public void setUsuario(String teste){
        this.usuario = teste;
    }
    
        public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }
}

