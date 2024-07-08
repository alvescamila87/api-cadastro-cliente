package br.com.camila.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.EqualsAndHashCode.Include;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Representa um contato associado a um cliente no sistema.
 * Cada contato pode ter múltiplos e-mails e telefones associados.
 *
 * @author Camila
 *
 * @see Cliente
 * @see Email
 * @see Telefone
 *
 * @since V1
 */
@Entity
@Table(name = "contatos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Include
    private Long idContato;
    private String nomeCompleto;

    @ManyToOne
    @JoinColumn(name = "idCliente", referencedColumnName = "idCliente")
    @JsonBackReference
    private Cliente cliente;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "contato_emails",
            joinColumns = @JoinColumn(name = "id_contato")
    )
    private List<Email> emails = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "contato_telefones",
            joinColumns = @JoinColumn(name = "id_contato")
    )
    private List<Telefone> telefones = new ArrayList<>();

    /**
     * Retorna a representação em String do objeto Contato.
     *
     * @return Uma String contendo os atributos do Contato.
     */
    @Override
    public String toString() {
        return "CONTATO [" +
                "ID Contato: " + idContato +
                ", Nome completo: " + nomeCompleto +
                ", E-mails: " + emails +
                ", Telefones: " + telefones +
                ']';
    }
}
