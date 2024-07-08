package br.com.camila.utils;

import br.com.camila.controllers.ClienteController;
import br.com.camila.entities.Cliente;
import br.com.camila.entities.Contato;
import br.com.camila.entities.Email;
import br.com.camila.entities.Telefone;
import br.com.camila.repositories.ClienteRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * Componente para geração de relatório PDF
 */
@Component
public class GeradorPDFUtil {

    @Autowired
    private ClienteRepository clienteRepository;

    /**
     * Layout para representação de output - relatório em PDF
     * Considerando os dados de clientes e seus respectivos contatos
     * tendo um endpoint no Controller de Cliente e utilizando método findAll JPA
     *
     * @return relatório em arquivo PDF com a lista de clientes e contatos
     *
     * @see Cliente
     * @see Contato
     * @see ClienteController
     * @see ClienteRepository
     */
    public byte[] geradorPdfRelatorio() {
        List<Cliente> listaClientes = clienteRepository.findAll();

        Document document = new Document();
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter.getInstance(document, baos);
            document.open();

            Font fontTitle = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Font fontSubtitle = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
            Font fontHeader = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            Font fontBody = new Font(Font.FontFamily.HELVETICA, 12);

            Paragraph title = new Paragraph("Relatório de Clientes e Contatos", fontTitle);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph("\n"));

            for (Cliente cliente : listaClientes) {
                // Linha de separação entre clientes
                if (listaClientes.indexOf(cliente) > 0) {
                    document.add(new Paragraph("\n"));
                    document.add(new LineSeparator());
                    document.add(new Paragraph("\n"));
                }

                // Informações do Cliente
                Paragraph clienteSubtitle = new Paragraph("Informações de Cliente -> ID: " + cliente.getIdCliente(), fontSubtitle);
                document.add(clienteSubtitle);

                Paragraph clienteInfo = new Paragraph();
                //clienteInfo.add(new Chunk("ID do Cliente: " + cliente.getIdCliente(), fontHeader));
                clienteInfo.add(new Chunk("\nNome completo: " + cliente.getNomeCompleto(), fontBody));
                clienteInfo.add(new Chunk("\nCriado Em: " + cliente.getCriadoEm(), fontBody));
                document.add(clienteInfo);
                document.add(new Paragraph("\n"));

                // Telefones do Cliente
                if (!cliente.getTelefones().isEmpty()) {
                    Paragraph telefonesHeader = new Paragraph("Telefones do cliente:", fontHeader);
                    document.add(telefonesHeader);
                    for (Telefone telefone : cliente.getTelefones()) {
                        Paragraph telefoneParagraph = new Paragraph(telefone.getTelefone(), fontBody);
                        document.add(telefoneParagraph);
                    }
                    document.add(new Paragraph("\n"));
                }

                // Emails do Cliente
                if (!cliente.getEmails().isEmpty()) {
                    Paragraph emailsHeader = new Paragraph("E-mails do cliente:", fontHeader);
                    document.add(emailsHeader);
                    for (Email email : cliente.getEmails()) {
                        Paragraph emailParagraph = new Paragraph(email.getEmail(), fontBody);
                        document.add(emailParagraph);
                    }
                    document.add(new Paragraph("\n"));
                }

                // Contatos do Cliente
                if (!cliente.getContatos().isEmpty()) {
                    for (Contato contato : cliente.getContatos()) {
                        Paragraph contatoSubtitle = new Paragraph("Informações de Contato -> ID: " + contato.getIdContato(), fontSubtitle);
                        document.add(contatoSubtitle);

                        Paragraph contatoInfo = new Paragraph();
                        //contatoInfo.add(new Chunk("ID do Contato: " + contato.getIdContato(), fontBody));
                        contatoInfo.add(new Chunk("\nNome completo: " + contato.getNomeCompleto(), fontBody));
                        document.add(contatoInfo);
                        document.add(new Paragraph("\n"));

                        // Telefones do Contato
                        if (!contato.getTelefones().isEmpty()) {
                            Paragraph telefonesContatoHeader = new Paragraph("Telefones do contato:", fontHeader);
                            document.add(telefonesContatoHeader);
                            for (Telefone telefone : contato.getTelefones()) {
                                Paragraph telefoneContatoParagraph = new Paragraph(telefone.getTelefone(), fontBody);
                                document.add(telefoneContatoParagraph);
                            }
                            document.add(new Paragraph("\n"));
                        }

                        // Emails do Contato
                        if (!contato.getEmails().isEmpty()) {
                            Paragraph emailsContatoHeader = new Paragraph("E-mails do contato:", fontHeader);
                            document.add(emailsContatoHeader);
                            for (Email email : contato.getEmails()) {
                                Paragraph emailContatoParagraph = new Paragraph(email.getEmail(), fontBody);
                                document.add(emailContatoParagraph);
                            }
                            document.add(new Paragraph("\n"));
                        }
                    }
                }

                document.add(new Paragraph("\n")); // Espaçamento entre clientes
            }

            document.close();
            return baos.toByteArray();
        } catch (DocumentException | IOException e) {
            throw new RuntimeException("Erro ao gerar relatório PDF", e);
        }
    }
}
