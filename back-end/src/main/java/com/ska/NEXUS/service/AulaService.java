package com.ska.NEXUS.service;

import com.ska.NEXUS.dto.AulaDTO;
import java.util.ArrayList;
import java.util.List;

public class AulaService {

    public List<AulaDTO> getDados() {
   
        //criacao de uma lista vazia
        ArrayList<AulaDTO> lista = new ArrayList();

        for (int i = 0; i < 10; i++) {
            
            //criacao de um objeto
            AulaDTO aula = new AulaDTO();
            aula.setDescricao("descricao da aula");
            aula.setProfessor("alexandre");
            aula.setTitulo("teste " + i);

            
            //adicionando o objeto a lista
            lista.add(aula);
        }

        return lista;
    }
}
