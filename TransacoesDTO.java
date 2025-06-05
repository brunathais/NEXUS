package com.ska.NEXUS.dto;
import java.time.LocalDate;

public class TransacoesDTO {

    private String tipo;
    private Double valor;
    private LocalDate data;
    private String descricao;
    private String categoria;

    public String getCategoria() {
        return categoria;
    }

    public LocalDate getData() {
        return data;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getTipo() {
        return tipo;
    }

    public Double getValor() {
        return valor;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }
   
}
