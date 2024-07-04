package br.com.camila.controllers;

import br.com.camila.entities.Cliente;
import br.com.camila.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public ResponseEntity<List<Cliente>> listAllCustomers(){
        List<Cliente> listCustomer = clienteRepository.findAll();

        if(listCustomer.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(listCustomer);
    }

    @GetMapping("/{idCustomer}")
    public ResponseEntity<Cliente> getCustomerById(@PathVariable Long idCustomer){
        Optional<Cliente> searchedCustomer = clienteRepository.findById(idCustomer);

        if(searchedCustomer.isPresent()){
            return ResponseEntity.ok(searchedCustomer.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
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
