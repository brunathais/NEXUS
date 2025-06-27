/*package com.ska.NEXUS.apirest.service;

public Map<String, Object> obterResumoFinanceiro() {
    BigDecimal totalReceitas = transacaoRepository.somarPorTipo("RECEITA");
    BigDecimal totalDespesas = transacaoRepository.somarPorTipo("DESPESA");
    Map<String, BigDecimal> porCategoria = transacaoRepository.somarDespesasPorCategoria();

    Map<String, Object> resumo = new HashMap<>();
    resumo.put("receitas", totalReceitas);
    resumo.put("despesas", totalDespesas);
    resumo.put("porCategoria", porCategoria);
    return resumo;
}
*/