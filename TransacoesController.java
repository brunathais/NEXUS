package com.ska.NEXUS.controllers;

import com.ska.NEXUS.dto.TransacoesDTO;
import com.ska.NEXUS.model.TransacoesModel;
import com.ska.NEXUS.service.TransacoesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Indica que esta classe é um controlador REST, ou seja, responde requisições HTTP com dados (geralmente JSON)
@RestController
// Define o endpoint base para todas as rotas deste controller: /transacoes
@RequestMapping("/transacoes")
// Permite que qualquer origem (domínio) acesse este endpoint (útil para evitar problemas com CORS)
@CrossOrigin(origins = "*")
public class TransacoesController {

    // Injeta automaticamente uma instância da classe TransacoesService
    @Autowired
    private TransacoesService service;

    // Rota HTTP POST para salvar uma nova transação
    @PostMapping
    public ResponseEntity<TransacoesModel> salvar(@RequestBody TransacoesDTO dto) {
        // Chama o método do serviço para salvar a transação, passando os dados recebidos no corpo da requisição
        TransacoesModel nova = service.salvar(dto);
        // Retorna a nova transação salva com status 200 OK
        return ResponseEntity.ok(nova);
    }

    // Rota HTTP GET para listar todas as transações
    @GetMapping
    public ResponseEntity<List<TransacoesModel>> listar() {
        // Retorna a lista de todas as transações com status 200 OK
        return ResponseEntity.ok(service.listarTodas());
    }

    // Rota HTTP DELETE para excluir uma transação com base no ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        // Chama o serviço para excluir a transação correspondente ao ID passado na URL
        service.excluir(id);
        // Retorna uma resposta vazia com status 200 OK
        return ResponseEntity.ok().build();
    }

    // Rota HTTP PUT para atualizar (editar) uma transação existente
    @PutMapping("/{id}")
    public ResponseEntity<TransacoesModel> editar(@PathVariable Long id, @RequestBody TransacoesDTO dto) {
        // Chama o serviço para editar a transação com o ID informado, utilizando os novos dados do corpo da requisição
        return ResponseEntity.ok(service.editar(id, dto));
    }
}
