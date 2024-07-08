package br.com.camila.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.EqualsAndHashCode.Include;

import java.util.Objects;

/**
 * Representa um número de telefone associado a um cliente ou contato.
 *  @author Camila
 *
 *  @see Cliente
 *  @see Email
 *  @see Telefone
 *
 *  @since V1
 */
@Entity
@Table(name = "telefones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Telefone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Include
    private Long idTelefone;

    private String telefone;

    /**
     * Retorna a representação em String do objeto Telefone.
     *
     * @return Uma String contendo os atributos do Telefone.
     */
    @Override
    public String toString() {
        return "TELEFONE [" +
                "ID Telefone: " + idTelefone +
                ", Telefone: " + telefone +
                ']';
    }
}
