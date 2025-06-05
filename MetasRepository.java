package com.ska.NEXUS.repository;

import com.ska.NEXUS.dto.MetasDTO;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import org.springframework.stereotype.Repository;

@Repository
public class MetasRepository {

    private String url = "jdbc:sqlserver://localhost:1433;databaseName=NEXUS_aula";
    private String user = "sa";
    private String password = "p@ssword24";

    public void salvar(MetasDTO meta) throws Exception {
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

        try (Connection con = DriverManager.getConnection(url, user, password)) {
            String sql = "INSERT INTO Metas (nome, valorMeta, valorPoupadoInicial, valorEconomizado) VALUES (?, ?, ?, ?)";

            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setString(1, meta.getNome());
            stmt.setFloat(2, meta.getValorMeta());
            stmt.setFloat(3, meta.getValorPoupadoInicial());
            stmt.setFloat(4, meta.getValorEconomizado());

            stmt.executeUpdate();
        }
    }
}
