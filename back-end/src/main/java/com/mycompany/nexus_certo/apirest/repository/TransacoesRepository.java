package com.mycompany.nexus_certo.apirest.repository;

import com.mycompany.nexus_certo.apirest.model.TransacoesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface TransacoesRepository extends JpaRepository<TransacoesModel, Integer> {

    // Resumo geral de receitas e despesas por mês
    @Query("SELECT MONTH(t.data) as mes, " +
            "SUM(CASE WHEN LOWER(t.tipo) = 'receita' THEN t.valor ELSE 0 END), " +
            "SUM(CASE WHEN LOWER(t.tipo) = 'despesa' THEN t.valor ELSE 0 END) " +
            "FROM TransacoesModel t " +
            "WHERE YEAR(t.data) = :ano " +
            "GROUP BY MONTH(t.data) " +
            "ORDER BY mes")
    List<Object[]> resumoMensal(@Param("ano") int ano);

    // Resumo de despesas por categoria
    @Query("SELECT MONTH(t.data) as mes, t.categoria, SUM(t.valor) " +
            "FROM TransacoesModel t " +
            "WHERE LOWER(t.tipo) = 'despesa' AND YEAR(t.data) = :ano " +
            "GROUP BY MONTH(t.data), t.categoria " +
            "ORDER BY mes")
    List<Object[]> resumoMensalPorCategoria(@Param("ano") int ano);
}
