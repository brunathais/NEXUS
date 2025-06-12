
package com.ska.NEXUS.service;

import com.ska.NEXUS.dto.MetasDTO;

public class MetasService {
    public float calcularValorRestante(MetasDTO meta) {
        return meta.getValorMeta() - meta.getValorEconomizado();
    }
    
    public boolean verificarMetaAlcancada(MetasDTO meta) {
        return meta.getValorEconomizado() >= meta.getValorMeta();
    }
}

