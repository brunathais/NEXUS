package com.ska.NEXUS.repository;

import com.ska.NEXUS.model.TransacoesModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacoesRepository extends JpaRepository<TransacoesModel, Long> {
}
