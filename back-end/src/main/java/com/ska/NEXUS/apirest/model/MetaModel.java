package com.seuprojeto.nexus.model;

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

    // Getters e Setters
}
