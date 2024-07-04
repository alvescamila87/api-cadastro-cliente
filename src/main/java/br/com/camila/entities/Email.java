package br.com.camila.entities;

import jakarta.persistence.*;

import java.util.Objects;

/**
 * Representa um endereço de e-mail associado a um cliente ou contato.
 */
@Entity
@Table(name = "emails")
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEmail;

    private String email;

    @ManyToOne
    @JoinColumn(name = "idCliente", referencedColumnName = "idCliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "idContato", referencedColumnName = "idContato")
    private Contato contato;

    public Email() {
    }

    /**
     * Construtor completo para inicializar todos os atributos do Email.
     *
     * @param idEmail O ID do e-mail.
     * @param email   O endereço de e-mail.
     * @param cliente O cliente associado ao e-mail.
     * @param contato O contato associado ao e-mail.
     */
    public Email(Long idEmail, String email, Cliente cliente, Contato contato) {
        this.idEmail = idEmail;
        this.email = email;
        this.cliente = cliente;
        this.contato = contato;
    }

    public Long getIdEmail() {
        return idEmail;
    }

    public void setIdEmail(Long idEmail) {
        this.idEmail = idEmail;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Contato getContato() {
        return contato;
    }

    public void setContato(Contato contato) {
        this.contato = contato;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Email email1 = (Email) o;
        return idEmail.equals(email1.idEmail) && Objects.equals(email, email1.email) && Objects.equals(cliente, email1.cliente) && Objects.equals(contato, email1.contato);
    }

    @Override
    public int hashCode() {
        int result = idEmail.hashCode();
        result = 31 * result + Objects.hashCode(email);
        result = 31 * result + Objects.hashCode(cliente);
        result = 31 * result + Objects.hashCode(contato);
        return result;
    }

    /**
     * Retorna a representação em String do objeto Email.
     *
     * @return Uma String contendo os atributos do Email.
     */
    @Override
    public String toString() {
        return "EMAIL [" +
                "ID E-mail:" + idEmail +
                ", E-mail: " + email +
                ", Cliente: " + cliente +
                ", Contato: " + contato +
                '}';
    }
}
