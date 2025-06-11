package com.ska.NEXUS.repository.impl;

import com.ska.NEXUS.dto.UsuarioDTO;
import com.ska.NEXUS.repository.custom.UsuarioRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
public class UsuarioRepositoryImpl implements UsuarioRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public boolean inserirUsuario(UsuarioDTO usuarioDTO) {
        String sql = "INSERT INTO TB_USUARIO(TX_NOME, TX_SENHA, TX_EMAIL) VALUES ";

        sql += "(:nome, :senha, :email);";

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("nome", usuarioDTO.getNome());
        query.setParameter("senha", usuarioDTO.getSenha());
        query.setParameter("email", usuarioDTO.getEmail());
        query.executeUpdate();

        return true;
    }
    
    @Override
    @Transactional
    public boolean updateUsuario(UsuarioDTO usuarioDTO) {
        String sql = "UPDATE TB_USUARIO SET TX_NOME = :nome, TX_EMAIL = :email, TX_SENHA = :senha WHERE ID = :id";

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("nome", usuarioDTO.getNome());
        query.setParameter("email", usuarioDTO.getEmail());
        query.setParameter("senha", usuarioDTO.getSenha());
        query.setParameter("id", usuarioDTO.getId()); // Certifique-se de que o DTO tem o campo 'id'

        return query.executeUpdate() > 0;
    }

}
