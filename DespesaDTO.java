package com.ska.NEXUS.dto;

public class DespesaDTO {

    private String descricao;
    private float valor;
    private String data;
    private String categoria;

    public String getDescricao() {
        return descricao;
    }

    public float getValor() {
        return valor;
    }

    public String getData() {
        return data;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setDescricao(String nome) {
        this.descricao = nome;
    }

    public void setValor(float valor) {
        this.valor = valor;
    }

    public void setData(String data) {
        this.data = data;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

}
