package com.ska.NEXUS.repository;

import com.ska.NEXUS.model.UsuarioModel;
import com.ska.NEXUS.repository.custom.UsuarioRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long>, UsuarioRepositoryCustom{
    
}