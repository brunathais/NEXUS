package com.mycompany.nexus_certo.apirest.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity

public class MetasModel {

    @Id
    private int id;

    private String nomeMeta;
    private BigDecimal valorTotal;
    private BigDecimal valorInicial;
    private BigDecimal valorPoupado;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNomeMeta() {
        return nomeMeta;
    }

    public void setNomeMeta(String nome) {
        this.nomeMeta = nome;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal total) {
        this.valorTotal = total;
    }

    public BigDecimal getValorInicial() {
        return valorInicial;
    }

    public void setValorInicial(BigDecimal inicial) {
        this.valorInicial = inicial;
    }

    public BigDecimal getValorPoupado() {
        return valorPoupado;
    }

    public void setValorPoupado(BigDecimal poupado) {
        this.valorPoupado = poupado;
    }
}
