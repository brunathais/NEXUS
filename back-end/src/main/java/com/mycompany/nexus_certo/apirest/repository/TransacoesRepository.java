
package com.mycompany.nexus_certo.apirest.repository;

import com.mycompany.nexus_certo.apirest.model.TransacoesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransacoesRepository extends JpaRepository<TransacoesModel, Integer> {
}
