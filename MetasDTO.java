package com.ska.NEXUS.dto;

public class MetasDTO {

    private String nome;
    private float valorMeta;
    private float valorPoupadoInicial;
    private float valorEconomizado;

    public MetasDTO(String nome, float valorMeta, float valorPoupadoInicial, float valorEconomizado) {
        this.nome = nome;
        this.valorMeta = valorMeta;
        this.valorPoupadoInicial = valorPoupadoInicial;
        this.valorEconomizado = valorEconomizado;

    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public float getValorMeta() {
        return valorMeta;
    }

    public void setValorMeta(float valorMeta) {
        this.valorMeta = valorMeta;
    }

    public float getValorPoupadoInicial() {
        return valorPoupadoInicial;
    }

    public void setValorPoupadoInicial(float valorPoupadoInicial) {
        this.valorPoupadoInicial = valorPoupadoInicial;
    }

    public float getValorEconomizado() {
        return valorEconomizado;
    }

    public void setValorEconomizado(float valorEconomizado) {
        this.valorEconomizado = valorEconomizado;
    }

}
