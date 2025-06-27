package com.ska.NEXUS.apirest.repository;

import com.ska.NEXUS.apirest.model.OrcamentoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrcamentoRepository extends JpaRepository<OrcamentoModel, Long> {
    // Para futuros métodos de busca por usuário, etc.
}
