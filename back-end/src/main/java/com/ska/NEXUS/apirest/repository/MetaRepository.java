package com.ska.NEXUS.apirest.repository;

import com.ska.NEXUS.apirest.model.MetaModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetaRepository extends JpaRepository<MetaModel, Long> {
}
