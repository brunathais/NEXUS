package com.mycompany.nexus_certo.apirest.repository;

import com.mycompany.nexus_certo.apirest.model.UsuarioModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

    @Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Integer> {
        Optional<UsuarioModel> findByUsuarioAndSenha(String usuario, String senha);
}
