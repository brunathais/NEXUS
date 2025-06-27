/*package com.ska.NEXUS.apirest.repository;

@Query("SELECT SUM(t.valor) FROM Transacao t WHERE t.tipo = :tipo")
BigDecimal somarPorTipo(@Param("tipo") String tipo);

@Query("SELECT t.categoria, SUM(t.valor) FROM Transacao t WHERE t.tipo = 'DESPESA' GROUP BY t.categoria")
Map<String, BigDecimal> somarDespesasPorCategoria();
*/