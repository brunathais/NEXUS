package com.seuapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class TransacaoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo; // Receita ou Despesa

    private Double valor;

    private LocalDate data;

    private String descricao;

    private String categoria; // Só para Despesa

    // Getters e Setters
}
