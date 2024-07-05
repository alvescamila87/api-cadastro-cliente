package br.com.camila.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Representa um contato associado a um cliente no sistema.
 * Cada contato pode ter múltiplos e-mails e telefones associados.
 */
@Entity
@Table(name = "contatos")
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idContato;
    private String nomeCompleto;

    @ManyToOne
    @JoinColumn(name = "idCliente", referencedColumnName = "idCliente")
    @JsonBackReference
    private Cliente cliente;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "contato_emails", joinColumns = @JoinColumn(name = "id_contato")
    )
    private List<Email> emails = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "contato_telefones", joinColumns = @JoinColumn(name = "id_contato")
    )
    private List<Telefone> telefones = new ArrayList<>();

    public Contato() {
    }

    /**
     * Construtor completo para inicializar todos os atributos do Contato.
     *
     * @param idContato    O ID do contato.
     * @param nomeCompleto O nome completo do contato.
     * @param cliente      O cliente ao qual o contato está associado.
     * @param emails       Lista de e-mails associados ao contato.
     * @param telefones    Lista de telefones associados ao contato.
     */
    public Contato(Long idContato, String nomeCompleto, Cliente cliente, List<Email> emails, List<Telefone> telefones) {
        this.idContato = idContato;
        this.nomeCompleto = nomeCompleto;
        this.cliente = cliente;
        this.emails = emails;
        this.telefones = telefones;
    }

    public Long getIdContato() {
        return idContato;
    }

    public void setIdContato(Long idContato) {
        this.idContato = idContato;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<Email> getEmails() {
        return emails;
    }

    public void setEmails(List<Email> emails) {
        this.emails = emails;
    }

    public List<Telefone> getTelefones() {
        return telefones;
    }

    public void setTelefones(List<Telefone> telefones) {
        this.telefones = telefones;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Contato contato = (Contato) o;
        return idContato.equals(contato.idContato) && Objects.equals(nomeCompleto, contato.nomeCompleto) && Objects.equals(cliente, contato.cliente) && Objects.equals(emails, contato.emails) && Objects.equals(telefones, contato.telefones);
    }

    @Override
    public int hashCode() {
        int result = idContato.hashCode();
        result = 31 * result + Objects.hashCode(nomeCompleto);
        result = 31 * result + Objects.hashCode(cliente);
        result = 31 * result + Objects.hashCode(emails);
        result = 31 * result + Objects.hashCode(telefones);
        return result;
    }

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
                ", Cliente: " + cliente +
                ", E-mails: " + emails +
                ", Telefones: " + telefones +
                ']';
    }
}
