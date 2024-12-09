package com.app.duahub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.app.duahub.entity.Campeonato;
import com.app.duahub.repository.CampeonatoRepository;
import com.app.duahub.service.CampeonatoService;

@RestController
@RequestMapping("/campeonatos")
@CrossOrigin(origins = "*")
public class CampeonatoController {

	@Autowired
	private CampeonatoRepository campeonatoRepository; 

	@Autowired
	private CampeonatoService campeonatoService;

	@PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> save(@RequestBody Campeonato campeonato) {
        try {
            String message = this.campeonatoService.save(campeonato);
            return new ResponseEntity<>(message, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao salvar o campeonato: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Atualização de campeonato
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@RequestBody Campeonato campeonato, @PathVariable Long id) {
        try {
            String message = this.campeonatoService.update(campeonato, id);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar o campeonato: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Exclusão de campeonato
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        try {
            String message = this.campeonatoService.delete(id);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao excluir o campeonato: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Buscar todos os campeonatos
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Object> findAll() {
        try {
            List<Campeonato> list = this.campeonatoService.findAll();
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao buscar campeonatos: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Buscar campeonato por ID
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable Long id) {
        try {
            Campeonato campeonato = this.campeonatoService.findById(id);
            return new ResponseEntity<>(campeonato, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Campeonato não encontrado: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
