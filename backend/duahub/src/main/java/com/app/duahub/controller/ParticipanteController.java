package com.app.duahub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.duahub.entity.Campeonato;
import com.app.duahub.entity.Participante;
import com.app.duahub.service.ParticipanteService;

@RestController
@RequestMapping("/participantes")
public class ParticipanteController {
	
	@Autowired ParticipanteService participanteService;

	@PostMapping
    @PreAuthorize("hasAuthority('admin-geral')")
    public ResponseEntity<Object> save(@RequestBody Participante participante) {
        try {
            String message = this.participanteService.save(participante);
            return new ResponseEntity<>(message, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao salvar o participante: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Atualização de participante
    @PreAuthorize("hasAuthority('admin-geral')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@RequestBody Participante participante, @PathVariable Long id) {
        try {
            String message = this.participanteService.update(participante, id);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar o participante: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Exclusão de participante
    @PreAuthorize("hasAuthority('admin-geral')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        try {
            String message = this.participanteService.delete(id);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao excluir o participante: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Buscar todos os participantes
    @PreAuthorize("hasAuthority('admin-geral')")
    @GetMapping
    public ResponseEntity<Object> findAll() {
        try {
            List<Participante> list = this.participanteService.findAll();
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao buscar participante: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Buscar participante por ID
    @PreAuthorize("hasAuthority('admin-geral')")
    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable Long id) {
        try {
        	Participante participante = this.participanteService.findById(id);
            return new ResponseEntity<>(participante, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("participante não encontrado: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
	
}
