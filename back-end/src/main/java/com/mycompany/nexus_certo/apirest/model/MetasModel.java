package com.mycompany.nexus_certo.apirest.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class MetasModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotNull(message = "Valor Total da meta é obrigatório")
    private BigDecimal valorTotal;

private float valorPoupadoInicial;
private float valorPoupadoMensal;

    public String getNome() {
        return nome;
    }

    public int getId() {
        return id;
    }

    public float getValorPoupadoInicial() {
        return valorPoupadoInicial;
    }

    public float getValorPoupadoMensal() {
        return valorPoupadoMensal;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public void setValorPoupadoInicial(float valorPoupadoInicial) {
        this.valorPoupadoInicial = valorPoupadoInicial;
    }

    public void setValorPoupadoMensal(float valorPoupadoMensal) {
        this.valorPoupadoMensal = valorPoupadoMensal;
    }

}
