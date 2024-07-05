package br.com.camila.controllers;

import br.com.camila.entities.Cliente;
import br.com.camila.repositories.ClienteRepository;
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
@RequestMapping("/clientes")
@Tag(name = "Gerenciamento de cliente", description = "Endpoints referentes ao cliente")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    @Operation(
            summary = "Exibe a lista de clientes cadastrados",
            description = "Fornece uma lista de todos os contatos para um cliente específico"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de clientes recuperada com sucesso"),
            @ApiResponse(responseCode = "204", description = "Nenhum cliente encontrado")
    })
    public ResponseEntity<List<Cliente>> listAllCustomers(){
        List<Cliente> customersList = clienteRepository.findAll();

        if(customersList.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(customersList);
    }

    @GetMapping("/{idCustomer}")
    @Operation(
            summary = "Exibe o cliente pelo ID",
            description = "Recupera um cliente específico pelo ID especificado"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cliente encontrado com sucesso"),
            @ApiResponse(responseCode = "204", description = "Cliente não encontradoencontrado")
    })
    public ResponseEntity<Cliente> getCustomerById(@PathVariable Long idCustomer){
        Optional<Cliente> searchedCustomer = clienteRepository.findById(idCustomer);

        if(searchedCustomer.isPresent()){
            return ResponseEntity.ok(searchedCustomer.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Operation(
            summary = "Adiciona um novo cliente",
            description = "Recupera um cliente específico pelo ID especificado"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Cliente criado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    public ResponseEntity<Cliente> createCustomer(@RequestBody Cliente cliente){
        try {
            Cliente newCustomer = clienteRepository.save(cliente);
            return ResponseEntity
                    .created(new URI("/clientes/" + newCustomer.getIdCliente()))
                    .body(newCustomer);
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{idCustomer}")
    @Operation(
            summary = "Atualiza um cliente existente pelo ID",
            description = "Atualiza as informações de um cliente específico pelo ID especificado"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cliente atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    public ResponseEntity<Cliente> updateCustomerById(@PathVariable Long idCustomer, @RequestBody Cliente cliente){
        Optional<Cliente> searchedCustomer = clienteRepository.findById(idCustomer);

        if(searchedCustomer.isPresent()){
            cliente.setIdCliente(idCustomer);
            return ResponseEntity.ok(clienteRepository.save(cliente));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("{idCustomer}")
    @Operation(
            summary = "Deleta um cliente pelo ID",
            description = "Deleta um cliente específico pelo ID informado"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Cliente deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    public ResponseEntity<Void> deleteCustomerById(@PathVariable Long idCustomer){
        Optional<Cliente> searchedCustomer = clienteRepository.findById(idCustomer);

        if(searchedCustomer.isPresent()){
           clienteRepository.delete(searchedCustomer.get());
           return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
