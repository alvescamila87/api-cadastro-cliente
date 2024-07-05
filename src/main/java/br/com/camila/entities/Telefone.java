package br.com.camila.entities;

import jakarta.persistence.*;

import java.util.Objects;

/**
 * Representa um número de telefone associado a um cliente ou contato.
 */
@Entity
@Table(name = "telefones")
public class Telefone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTelefone;

    private String telefone;

    public Telefone() {
    }

    /**
     * Construtor completo para inicializar todos os atributos do Telefone.
     *
     * @param idTelefone O ID do telefone.
     * @param telefone   O número de telefone.
     */
    public Telefone(Long idTelefone, String telefone) {
        this.idTelefone = idTelefone;
        this.telefone = telefone;
    }

    public Long getIdTelefone() {
        return idTelefone;
    }

    public void setIdTelefone(Long idTelefone) {
        this.idTelefone = idTelefone;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Telefone telefone1 = (Telefone) o;
        return idTelefone.equals(telefone1.idTelefone) && Objects.equals(telefone, telefone1.telefone);
    }

    @Override
    public int hashCode() {
        int result = idTelefone.hashCode();
        result = 31 * result + Objects.hashCode(telefone);
        return result;
    }

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
