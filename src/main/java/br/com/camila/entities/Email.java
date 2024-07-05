package br.com.camila.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.EqualsAndHashCode.Include;

import java.util.Objects;

/**
 * Representa um endereço de e-mail associado a um cliente ou contato.
 */
@Entity
@Table(name = "emails")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Include
    private Long idEmail;

    private String email;

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
