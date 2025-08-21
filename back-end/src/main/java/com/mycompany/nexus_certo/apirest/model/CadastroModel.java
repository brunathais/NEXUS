package com.mycompany.nexus_certo.apirest.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class CadastroModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Usuário é obrigatório")
    @Size(max = 50, message = "Usuário deve ter no máximo 50 caracteres")
    @Column(unique = true)
    private String usuario;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    @Size(max = 100, message = "Email deve ter no máximo 100 caracteres")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 8, max = 100, message = "Senha deve ter entre 8 e 100 caracteres")
    private String senha;

    public String getEmail() {
        return email;
    }

    public int getId() {
        return id;
    }

    public String getSenha() {
        return senha;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

}
