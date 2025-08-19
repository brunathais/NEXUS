package com.mycompany.nexus_certo.apirest.service;

import com.mycompany.nexus_certo.apirest.repository.TransacoesRepository;
import java.math.BigDecimal;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GraficosService {

    @Autowired
    private TransacoesRepository repo;

    public List<Map<String, Object>> resumoMensal(int ano) {
        List<Map<String, Object>> meses = new ArrayList<>();
        for (int m = 1; m <= 12; m++) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("mes", m);
            item.put("receitas", BigDecimal.ZERO);
            item.put("despesas", BigDecimal.ZERO);
            item.put("saldo", BigDecimal.ZERO);
            item.put("essenciais", BigDecimal.ZERO);
            item.put("nao_essenciais", BigDecimal.ZERO);
            item.put("imprevistos", BigDecimal.ZERO);
            meses.add(item);
        }

        // Totais de receitas/despesas
        List<Object[]> linhas = repo.resumoMensal(ano);
        for (Object[] row : linhas) {
            int mes = ((Number) row[0]).intValue();
            BigDecimal receitas = (BigDecimal) row[1];
            BigDecimal despesas = (BigDecimal) row[2];
            Map<String, Object> item = meses.get(mes - 1);
            item.put("receitas", receitas != null ? receitas : BigDecimal.ZERO);
            item.put("despesas", despesas != null ? despesas : BigDecimal.ZERO);
            item.put("saldo", (receitas != null ? receitas : BigDecimal.ZERO)
                    .subtract(despesas != null ? despesas : BigDecimal.ZERO));
        }

        // Detalhe de categorias de despesas
        List<Object[]> linhasCat = repo.resumoMensalPorCategoria(ano);
        for (Object[] row : linhasCat) {
            int mes = ((Number) row[0]).intValue();
            String cat = (String) row[1];
            BigDecimal total = (BigDecimal) row[2];
            Map<String, Object> item = meses.get(mes - 1);
            if (cat != null) {
                switch (cat.toLowerCase()) {
                    case "essencial":
                        item.put("essenciais", total);
                        break;
                    case "nao-essencial":
                        item.put("nao_essenciais", total);
                        break;
                    case "imprevisto":
                        item.put("imprevistos", total);
                        break;
                }
            }
        }
        return meses;
    }
}
