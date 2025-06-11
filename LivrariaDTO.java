
package com.ska.NEXUS.dto;

public class LivrariaDTO {
    private String titulo;
    private String autor;
    private String isbn;
    private float preco;
    private int quantidade;
    
    
    public String getTiulo(){
        return titulo;
    }
    public String getAutor(){
        return autor;
    }
    public String getIsbn(){
        return isbn;
    }
    public float getPreco(){
        return preco;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setPreco(float preco) {
        this.preco = preco;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public LivrariaDTO(String titulo, String autor, String isbn, float preco, int quantidade) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.preco = preco;
    this.quantidade = quantidade;
}
public void atualizarInfo(String titulo, String autor, float preco, int quantidade) {
    this.titulo = titulo;
    this.autor = autor;
    this.preco = preco;
    this.quantidade = quantidade;
}

   
}
