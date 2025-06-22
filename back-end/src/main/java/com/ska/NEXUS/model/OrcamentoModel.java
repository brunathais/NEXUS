package model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "orcamentos")
public class Orcamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double essenciais;
    private Double naoEssenciais;
    private Double imprevistos;
    private Double reservaEmergencia;

    // Relacionamento futuro com usuário
    // private Long usuarioId;

    public Orcamento() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getEssenciais() { return essenciais; }
    public void setEssenciais(Double essenciais) { this.essenciais = essenciais; }

    public Double getNaoEssenciais() { return naoEssenciais; }
    public void setNaoEssenciais(Double naoEssenciais) { this.naoEssenciais = naoEssenciais; }

    public Double getImprevistos() { return imprevistos; }
    public void setImprevistos(Double imprevistos) { this.imprevistos = imprevistos; }

    public Double getReservaEmergencia() { return reservaEmergencia; }
    public void setReservaEmergencia(Double reservaEmergencia) { this.reservaEmergencia = reservaEmergencia; }
}
