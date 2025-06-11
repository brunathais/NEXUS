/*package com.ska.NEXUS.service;

import com.ska.NEXUS.dto.LivrariaDTO;
import java.util.ArrayList;

public class LivrariaService {
    private ArrayList<LivrariaDTO> livros = new ArrayList<>();

    public void mostrarInfo(LivrariaDTO livro) {
        System.out.println("Título: " + livro.getTitulo());
        System.out.println("Autor: " + livro.getAutor());
        System.out.println("ISBN: " + livro.getIsbn());
        System.out.println("Preço: R$ " + livro.getPreco());
        System.out.println("Quantidade em estoque: " + livro.getQuantidade());
        System.out.println("-----------------------------");
    }

    public void adicionar(LivrariaDTO livro) {
        livros.add(livro);
    }

    public LivrariaDTO buscarPorIsbn(String isbn) {
        for (LivrariaDTO livro : livros) {
            if (livro.getIsbn().equals(isbn)) {
                return livro;
            }
        }
        return null;
    }

    public void removerPorIsbn(String isbn) {
        LivrariaDTO livro = buscarPorIsbn(isbn);
        if (livro != null) {
            livros.remove(livro);
        }
    }

    public void listarTodos() {
        if (livros.isEmpty()) {
            System.out.println("Nenhum livro cadastrado.");
        } else {
            for (LivrariaDTO livro : livros) {
                mostrarInfo(livro);
            }
        }
    }
}
*/