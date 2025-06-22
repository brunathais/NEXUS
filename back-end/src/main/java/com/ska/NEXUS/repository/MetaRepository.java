package com.seuprojeto.nexus.repository;

import com.seuprojeto.nexus.model.MetaModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetaRepository extends JpaRepository<MetaModel, Long> {
}
