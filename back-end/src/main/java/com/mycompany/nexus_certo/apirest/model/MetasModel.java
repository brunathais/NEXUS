package com.mycompany.nexus_certo.apirest.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;

@Entity

public class MetasModel {

    private String nomeMeta;
    private BigDecimal valorTotal;
    private BigDecimal valorInicial;
    private BigDecimal valorPoupado;

}
