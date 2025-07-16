
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
public class TransacoesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    @NotNull(message = "Valor é obrigatório")
    private BigDecimal valor;

    @NotBlank(message = "Tipo é obrigatório")
    private String tipo; // ex: "Entrada" ou "Saída"

    @NotNull
    private LocalDate data;


        public LocalDate getData() {
            return data;
        }

        public String getDescricao() {
            return descricao;
        }

        public int getId() {
            return id;
        }

        public String getTipo() {
            return tipo;
        }

        public BigDecimal getValor() {
            return valor;
        }

        public void setData(LocalDate data) {
            this.data = data;
        }

        public void setDescricao(String descricao) {
            this.descricao = descricao;
        }

        public void setId(int id) {
            this.id = id;
        }

        public void setTipo(String tipo) {
            this.tipo = tipo;
        }

        public void setValor(BigDecimal valor) {
            this.valor = valor;
        }
    
}
