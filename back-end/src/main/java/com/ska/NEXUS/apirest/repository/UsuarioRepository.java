package com.ska.NEXUS.apirest.repository;

import com.ska.NEXUS.apirest.model.UsuarioModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

    @Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Integer> {
        Optional<UsuarioModel> findByEmailAndSenha(String email, String senha);
}
