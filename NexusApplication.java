package com.ska.NEXUS;

//import com.ska.NEXUS.dto.LivrariaDTO;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NexusApplication {

	public static void main(String[] args) {
		SpringApplication.run(NexusApplication.class, args);
                
                /*
            LivrariaService repo = new LivrariaService();
            

        // Cadastrar alguns livros
        repo.adicionar(new LivrariaDTO("O Senhor dos Anéis", "J.R.R. Tolkien", "123", 100, 10));
        repo.adicionar(new LivrariaDTO("1984", "George Orwell", "456", 50, 5));

        System.out.println("Livros cadastrados:");
        repo.listarTodos();

        // Atualizar um livro
        System.out.println("Atualizando o livro com ISBN 456...");
        LivrariaDTO livroParaAtualizar = repo.buscarPorIsbn("456");
        if (livroParaAtualizar != null) {
            livroParaAtualizar.atualizarInfo("1984", "George Orwell", 60, 7);
        }

        // Remover um livro
        System.out.println("Removendo o livro com ISBN 123...");
        repo.removerPorIsbn("123");

        System.out.println("Livros após atualizações:");
        repo.listarTodos();
    }
*/
}
}
