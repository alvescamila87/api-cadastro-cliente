package br.com.camila.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    public Email() {
    }

    /**
     * Construtor completo para inicializar todos os atributos do Email.
     *
     * @param idEmail O ID do e-mail.
     * @param email   O endereço de e-mail.
     */
    public Email(Long idEmail, String email) {
        this.idEmail = idEmail;
        this.email = email;
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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Email email1 = (Email) o;
        return idEmail.equals(email1.idEmail) && Objects.equals(email, email1.email);
    }

    @Override
    public int hashCode() {
        int result = idEmail.hashCode();
        result = 31 * result + Objects.hashCode(email);
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
                ']';
    }
}
