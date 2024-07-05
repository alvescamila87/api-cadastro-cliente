package br.com.camila.controllers;

import br.com.camila.entities.Cliente;
import br.com.camila.entities.Contato;
import br.com.camila.repositories.ClienteRepository;
import br.com.camila.repositories.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes/{idCustomer}/contatos")
public class ContatoController {

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
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
