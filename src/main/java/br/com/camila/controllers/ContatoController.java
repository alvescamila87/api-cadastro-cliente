package br.com.camila.controllers;

import br.com.camila.entities.Contato;
import br.com.camila.repositories.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contatos")
public class ContatoController {

    @Autowired
    private ContatoRepository contatoRepository;

    @GetMapping
    public ResponseEntity<List<Contato>> getAllContacts(){
        List<Contato> contactsList = contatoRepository.findAll();

        if(contactsList.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(contactsList);
    }

    @GetMapping("{idContact}")
    public ResponseEntity<Contato> getContactById(@PathVariable Long idContact){
        Optional<Contato> searchedContact = contatoRepository.findById(idContact);

        if(searchedContact.isPresent()){
            return ResponseEntity.ok(searchedContact.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Contato> createContact(@RequestBody Contato contato){
        try {
            Contato newContact = contatoRepository.save(contato);
            return ResponseEntity
                    .created(new URI("/contatos/" + newContact.getIdContato()))
                    .body(newContact);
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{idContact}")
    public ResponseEntity<Contato> updateContactById(@PathVariable Long idContact, @RequestBody Contato contato){
        Optional<Contato> searchedContact = contatoRepository.findById(idContact);

        if(searchedContact.isPresent()){
            contato.setIdContato(idContact);
            return ResponseEntity.ok(contatoRepository.save(contato));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{idContact}")
    public ResponseEntity<Void> deleteContactById(@PathVariable Long idContact){
        Optional<Contato> searchedContact = contatoRepository.findById(idContact);

        if(searchedContact.isPresent()){
            contatoRepository.delete(searchedContact.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
