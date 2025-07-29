package com.mycompany.nexus_certo.apirest.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;

@Entity

public class OrcamentoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private BigDecimal essenciais;
    private BigDecimal naoEssenciais;
    private BigDecimal imprevistos;
    private BigDecimal reservaEmergencia;

    // Getters //
    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public BigDecimal getEssenciais() {
        return essenciais;
    }

    public BigDecimal getNaoEssenciais() {
        return naoEssenciais;
    }

    public BigDecimal getImprevistos() {
        return imprevistos;
    }

    public BigDecimal getReservaEmergencia() {
        return reservaEmergencia;
    }

    // Setters //
    public void setId(int id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEssenciais(BigDecimal Essenciais) {
        this.essenciais = Essenciais;
    }

    public void setNaoEssenciais(BigDecimal NaoEssenciais) {
        this.naoEssenciais = NaoEssenciais;
    }

    public void setImprevistos(BigDecimal Imprevistos) {
        this.imprevistos = Imprevistos;
    }

    public void setReservaEmergencia(BigDecimal reservaEmergencia) {
        this.reservaEmergencia = reservaEmergencia;
    }

}
