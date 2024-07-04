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

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "contato_id")
    private Contato contato;

    public Telefone() {
    }

    /**
     * Construtor completo para inicializar todos os atributos do Telefone.
     *
     * @param idTelefone O ID do telefone.
     * @param telefone   O número de telefone.
     * @param cliente    O cliente associado ao telefone.
     * @param contato    O contato associado ao telefone.
     */
    public Telefone(Long idTelefone, String telefone, Cliente cliente, Contato contato) {
        this.idTelefone = idTelefone;
        this.telefone = telefone;
        this.cliente = cliente;
        this.contato = contato;
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

        Telefone telefone1 = (Telefone) o;
        return idTelefone.equals(telefone1.idTelefone) && Objects.equals(telefone, telefone1.telefone) && Objects.equals(cliente, telefone1.cliente) && Objects.equals(contato, telefone1.contato);
    }

    @Override
    public int hashCode() {
        int result = idTelefone.hashCode();
        result = 31 * result + Objects.hashCode(telefone);
        result = 31 * result + Objects.hashCode(cliente);
        result = 31 * result + Objects.hashCode(contato);
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
                ", Cliente: " + cliente +
                ", Contato: " + contato +
                ']';
    }
}
