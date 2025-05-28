package com.ska.NEXUS.service;

import com.ska.NEXUS.dto.DespesaDTO;
import java.util.ArrayList;

public class DespesaService {

    //BANCO DE DADOS;
    public ArrayList<DespesaDTO> listaDepesa = new ArrayList();

    public String salvar(DespesaDTO dto) {
        String tipo = dto.getTipo();
        String categoria = dto.getCategoria();

        String retorno = new String();

        if (tipo.equals("Despesa") && categoria == null) {
            retorno = "Cadastro invalido";
        } else {

            //ATRIBUTO SAO VARIAVEIS 
            // EXTRUTURA NO JS
            // let  NOMENCLATURA = VALOR
            // EXTRUTURA NO JAVA
            // TIPO DA INFORMACAO       NOMENCLATURA  = new TIPO INFORMACAO();
            //  EXEMPLODTO  categoria = NEW EXEMPLODTO();
            listaDepesa.add(dto);
            retorno = "DEU TUDO CERTO, DESPESA SALVA COM SUCESSO!";
        }

        return retorno;

    }

    public ArrayList<DespesaDTO> visualizarHistorico() {
        return listaDepesa;
        
    }
}
