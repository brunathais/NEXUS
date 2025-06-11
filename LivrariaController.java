/*package com.ska.NEXUS.controllers;

import com.ska.NEXUS.dto.LivrariaDTO;
import com.ska.NEXUS.service.LivrariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/livraria")
public class LivrariaController {

    @Autowired
    private LivrariaService livrariaService;

    // Listar todos os livros
    @GetMapping("/livros")
    public List<LivrariaDTO> listarLivros() {
        return livrariaService.listarTodos();
    }

    // Adicionar um livro
    @PostMapping("/livros")
    public String adicionarLivro(@RequestBody LivrariaDTO livro) {
        livrariaService.adicionar(livro);
        return "Livro adicionado com sucesso.";
    }

    // Buscar um livro por ISBN
    @GetMapping("/livros/{isbn}")
    public LivrariaDTO buscarLivro(@PathVariable String isbn) {
        return livrariaService.buscarPorIsbn(isbn);
    }

    // Remover um livro por ISBN
    @DeleteMapping("/livros/{isbn}")
    public String removerLivro(@PathVariable String isbn) {
        livrariaService.removerPorIsbn(isbn);
        return "Livro removido com sucesso.";
    }
}
*/