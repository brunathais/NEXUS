package com.ska.NEXUS.apirest.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class MetaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private BigDecimal valorTotal;

    private BigDecimal valorPoupado;

    private LocalDate prazo;

    private String categoria;

    public String getCategoria() {
        return categoria;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public LocalDate getPrazo() {
        return prazo;
    }

    public BigDecimal getValorPoupado() {
        return valorPoupado;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setPrazo(LocalDate prazo) {
        this.prazo = prazo;
    }

    public void setValorPoupado(BigDecimal valorPoupado) {
        this.valorPoupado = valorPoupado;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }
    
}
