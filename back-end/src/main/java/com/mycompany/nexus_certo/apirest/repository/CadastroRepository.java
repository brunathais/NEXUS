package com.mycompany.nexus_certo.apirest.repository;

import com.mycompany.nexus_certo.apirest.model.CadastroModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CadastroRepository extends JpaRepository<CadastroModel, Integer> {
    Optional<CadastroModel> findByUsuarioAndSenha(String usuario, String senha);
    Optional<CadastroModel> findByUsuario(String usuario);
}
