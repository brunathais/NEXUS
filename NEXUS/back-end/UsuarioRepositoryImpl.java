
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
    public boolean inserirUsuario(UsuarioDTO usuarioDTO){
         String sql = "INSERT INTO TB_USUARIO(TX_NOME, TX_SENHA) VALUES ";
         sql += "(:nome, :senha);";
                 
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("nome",usuarioDTO.getNome());
        query.setParameter("senha",usuarioDTO.getSenha());
        query.executeUpdate();
                  
        return true;       
    }
}