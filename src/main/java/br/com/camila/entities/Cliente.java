package br.com.camila.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.EqualsAndHashCode.Include;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Representa um cliente cadastrado no sistema.
 * Cada cliente pode ter múltiplos contatos, e-mails e telefones associados.
 *
 * @author Camila
 *
 * @see Contato
 * @see Email
 * @see Telefone
 *
 * @since V1
 */
@Entity
@Table(name = "clientes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Include
    private Long idCliente;

    @Temporal(TemporalType.DATE)
    private LocalDate criadoEm;

    private String nomeCompleto;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contato> contatos = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "cliente_emails",
            joinColumns = @JoinColumn(name = "id_cliente")
    )
    private List<Email> emails = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "cliente_telefones",
            joinColumns = @JoinColumn(name = "id_cliente")
    )
    private List<Telefone> telefones = new ArrayList<>();

    /**
     * Método para gerar a data de criação ("yyyy-mm-dd")
     * do registro de cliente automaticamente.
     */
    @PrePersist
    protected void geraDataCriacaoAutomatica() {
        criadoEm = LocalDate.now();
    }

    /**
     * Retorna a representação em String do objeto Cliente.
     *
     * @return Uma String contendo os atributos do Cliente.
     */
    @Override
    public String toString() {
        return "CLIENTE [" +
                "ID Cliente: " + idCliente +
                ", Criado em: " + criadoEm +
                ", Nome completo: " + nomeCompleto +
                ", Contatos: " + contatos +
                ", E-mails: " + emails +
                ", Telefones: " + telefones +
                ']';
    }
}
