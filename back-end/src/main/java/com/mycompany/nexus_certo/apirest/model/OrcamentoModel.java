package com.mycompany.nexus_certo.apirest.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class OrcamentoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private float essenciais;
    private float naoEssenciais;
    private float imprevistos;
    private float reservaEmergencia;

    public float getEssenciais() {
        return essenciais;
    }

    public int getId() {
        return id;
    }

    public float getImprevistos() {
        return imprevistos;
    }

    public float getNaoEssenciais() {
        return naoEssenciais;
    }

    public float getReservaEmergencia() {
        return reservaEmergencia;
    }

    public void setEssenciais(float essenciais) {
        this.essenciais = essenciais;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setImprevistos(float imprevistos) {
        this.imprevistos = imprevistos;
    }

    public void setNaoEssenciais(float naoEssenciais) {
        this.naoEssenciais = naoEssenciais;
    }

    public void setReservaEmergencia(float reservaEmergencia) {
        this.reservaEmergencia = reservaEmergencia;
    }
    
    
}
