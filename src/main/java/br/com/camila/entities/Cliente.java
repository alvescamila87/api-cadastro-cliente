package br.com.camila.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Representa um cliente cadastrado no sistema.
 * Cada cliente pode ter múltiplos contatos, e-mails e telefones associados.
 */
@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCliente;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime criadoEm;

    private String nomeCompleto;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contato> contatos = new ArrayList<>();

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Email> emails = new ArrayList<>();

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Telefone> telefones = new ArrayList<>();

    public Cliente() {
    }


    /**
     * Construtor completo para inicializar todos os atributos do Cliente.
     *
     * @param idCliente    O ID do cliente.
     * @param criadoEm     A data e hora de criação do cliente.
     * @param nomeCompleto O nome completo do cliente.
     * @param contatos     Lista de contatos associados ao cliente.
     * @param emails       Lista de e-mails associados ao cliente.
     * @param telefones    Lista de telefones associados ao cliente.
     */
    public Cliente(Long idCliente, LocalDateTime criadoEm, String nomeCompleto, List<Contato> contatos, List<Email> emails, List<Telefone> telefones) {
        this.idCliente = idCliente;
        this.criadoEm = criadoEm;
        this.nomeCompleto = nomeCompleto;
        this.contatos = contatos;
        this.emails = emails;
        this.telefones = telefones;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public List<Contato> getContatos() {
        return contatos;
    }

    public void setContatos(List<Contato> contatos) {
        this.contatos = contatos;
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

        Cliente cliente = (Cliente) o;
        return idCliente.equals(cliente.idCliente) && Objects.equals(criadoEm, cliente.criadoEm) && Objects.equals(nomeCompleto, cliente.nomeCompleto) && Objects.equals(contatos, cliente.contatos) && Objects.equals(emails, cliente.emails) && Objects.equals(telefones, cliente.telefones);
    }

    @Override
    public int hashCode() {
        int result = idCliente.hashCode();
        result = 31 * result + Objects.hashCode(criadoEm);
        result = 31 * result + Objects.hashCode(nomeCompleto);
        result = 31 * result + Objects.hashCode(contatos);
        result = 31 * result + Objects.hashCode(emails);
        result = 31 * result + Objects.hashCode(telefones);
        return result;
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
