package com.seuapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.seuapp.model.Transacao;
import com.seuapp.repository.TransacaoRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transacoes")
@CrossOrigin(origins = "http://localhost:5500") // frontend
public class TransacaoController {

    @Autowired
    private TransacaoRepository transacaoRepo;

    // CREATE
    @PostMapping
    public Transacao criarTransacao(@RequestBody Transacao transacao) {
        return transacaoRepo.save(transacao);
    }

    // READ - listar todas
    @GetMapping
    public List<Transacao> listarTransacoes() {
        return transacaoRepo.findAll();
    }

    // READ - buscar por ID
    @GetMapping("/{id}")
    public Optional<Transacao> buscarPorId(@PathVariable Long id) {
        return transacaoRepo.findById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Transacao atualizar(@PathVariable Long id, @RequestBody Transacao novaTransacao) {
        return transacaoRepo.findById(id)
            .map(transacao -> {
                transacao.setTipo(novaTransacao.getTipo());
                transacao.setValor(novaTransacao.getValor());
                transacao.setData(novaTransacao.getData());
                transacao.setDescricao(novaTransacao.getDescricao());
                transacao.setCategoria(novaTransacao.getCategoria());
                return transacaoRepo.save(transacao);
            })
            .orElseThrow(() -> new RuntimeException("Transação não encontrada"));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        transacaoRepo.deleteById(id);
    }
}
