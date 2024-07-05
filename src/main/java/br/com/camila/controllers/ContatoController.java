package br.com.camila.controllers;

import br.com.camila.entities.Cliente;
import br.com.camila.entities.Contato;
import br.com.camila.repositories.ClienteRepository;
import br.com.camila.repositories.ContatoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes/{idCustomer}/contatos")
@Tag(name = "Gerenciamento de Contato", description = "Endpoints referentes ao gerenciamento de contatos associados ao cliente")
public class ContatoController {

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    @Operation(
            summary = "Exibe a lista de contatos de um cliente",
            description = "Fornece uma lista de todos os contatos para um cliente específico"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de contatos recuperada com sucesso"),
            @ApiResponse(responseCode = "204", description = "Nenhum contato encontrado para o cliente especificado"),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    public ResponseEntity<List<Contato>> getAllContacts(@PathVariable Long idCustomer){
        Optional<Cliente> searchedCustomer = clienteRepository.findById(idCustomer);

        if(searchedCustomer.isPresent()) {
            Cliente cliente = searchedCustomer.get();
            List<Contato> contactsList = contatoRepository.findAll();

            if (contactsList.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(contactsList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{idContact}")
    @Operation(
            summary = "Exibe um contato pelo ID",
            description = "Recupera um contato específico pelo ID do contato associado ao ID do cliente"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Contato encontrado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Contato ou Cliente não encontrado")
    })
    public ResponseEntity<Contato> getContactById(@PathVariable Long idCustomer, @PathVariable Long idContact){
        Optional<Cliente> searchedCustomer = clienteRepository.findById(idCustomer);

        if(searchedCustomer.isPresent()) {
            Cliente cliente = searchedCustomer.get();
            Optional<Contato> searchedContact = cliente.getContatos()
                    .stream()
                    .filter(c -> c.getIdContato().equals(idContact))
                    .findFirst();

            if (searchedContact.isPresent()) {
                Contato contato = searchedContact.get();

                return ResponseEntity.ok(searchedContact.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Operation(
            summary = "Adiciona um novo contato",
            description = "Adiciona um novo contato a um cliente específico"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Contato criado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    public ResponseEntity<Contato> createContact(@PathVariable Long idCustomer, @RequestBody Contato contato){
        try {
            Optional<Cliente> searchedCustomer = clienteRepository.findById(idCustomer);

            if(searchedCustomer.isPresent()) {
                Cliente cliente = searchedCustomer.get();
                contato.setCliente(cliente);

                Contato newContact = contatoRepository.save(contato);

                return ResponseEntity
                        .created(new URI("/clientes/" +idCustomer + "/contatos/" + newContact.getIdContato()))
                        .body(newContact);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{idContact}")
    @Operation(
            summary = "Atualiza um contato existente",
            description = "Atualiza as informações de um contato específico pelo ID do contato e ID do cliente"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Contato atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Contato ou Cliente não encontrado")
    })
    public ResponseEntity<Contato> updateContactById(@PathVariable Long idCustomer, @PathVariable Long idContact, @RequestBody Contato contato){
        Optional<Cliente> searchedCustomer = clienteRepository.findById(idCustomer);

        if(searchedCustomer.isPresent()) {
            Cliente cliente = searchedCustomer.get();
            contato.setCliente(cliente);

            Optional<Contato> searchedContact = cliente.getContatos()
                    .stream()
                    .filter(c -> c.getIdContato().equals(idContact))
                    .findFirst();

            if (searchedContact.isPresent()) {
                return ResponseEntity.ok(contatoRepository.save(contato));
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{idContact}")
    @Operation(
            summary = "Deleta um contato",
            description = "Deleta um contato específico pelo ID do contato e ID do cliente"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Contato deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Contato ou Cliente não encontrado")
    })
    public ResponseEntity<Void> deleteContactById(@PathVariable Long idCustomer, @PathVariable Long idContact){
        Optional<Cliente> searchedCustomer = clienteRepository.findById(idCustomer);

        if (searchedCustomer.isPresent()) {
            Cliente cliente = searchedCustomer.get();

            Optional<Contato> searchedContact = cliente.getContatos()
                    .stream()
                    .filter(c -> c.getIdContato().equals(idContact))
                    .findFirst();

            if (searchedContact.isPresent()) {
                Contato contato = searchedContact.get();
                cliente.getContatos().remove(contato);
                contatoRepository.delete(contato);
                clienteRepository.save(cliente);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
