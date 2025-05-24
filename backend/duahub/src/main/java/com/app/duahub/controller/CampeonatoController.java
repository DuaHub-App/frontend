package com.app.duahub.controller;

import com.app.duahub.dto.CampeonatoDTO;
import com.app.duahub.entity.Campeonato;
import com.app.duahub.service.CampeonatoBusinessService;
import com.app.duahub.service.CampeonatoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/campeonatos")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CampeonatoController {

    private final CampeonatoService campeonatoService;
    private final CampeonatoBusinessService businessService;

    @PostMapping
    //@PreAuthorize("hasAuthority('admin-geral')")
    public ResponseEntity<Campeonato> criar(@RequestBody Campeonato campeonato) {
        return ResponseEntity.ok(campeonatoService.salvar(campeonato));
    }

    @PutMapping("/{id}")
    //@PreAuthorize("hasAuthority('admin-geral')")
    public ResponseEntity<Campeonato> atualizar(@RequestBody Campeonato campeonato, @PathVariable Long id) {
        return ResponseEntity.ok(campeonatoService.atualizar(campeonato, id));
    }

    @DeleteMapping("/{id}")
    //@PreAuthorize("hasAuthority('admin-geral')")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        campeonatoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    //@PreAuthorize("hasAuthority('admin-geral')")
    public ResponseEntity<List<CampeonatoDTO>> listarTodos() {
        return ResponseEntity.ok(campeonatoService.listarTodosComoDTO());
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasAuthority('admin-geral')")
    public ResponseEntity<Campeonato> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(campeonatoService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Campeonato não encontrado")));
    }

/*
    private CampeonatoDTO convertToDTO(Campeonato campeonato) {
        return new CampeonatoDTO(
                campeonato.getId(),
                campeonato.getNome(),
                campeonato.getStatus().toString()
        );
    }
*/

//    @PutMapping("/{id}/iniciar")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<CampeonatoDTO> iniciar(@PathVariable Long id) {
//        Campeonato campeonato = businessService.iniciarCampeonato(id);
//        return ResponseEntity.ok(convertToDTO(campeonato));
//    }
//
//    @PutMapping("/{id}/finalizar")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<CampeonatoDTO> finalizar(@PathVariable Long id) {
//        Campeonato campeonato = businessService.finalizarCampeonato(id);
//        return ResponseEntity.ok(convertToDTO(campeonato));
//    }

    @PutMapping("/{id}/iniciar")
    //@PreAuthorize("hasAuthority('admin-geral')")
    public ResponseEntity<Campeonato> iniciar(@PathVariable Long id) {
        return ResponseEntity.ok(businessService.iniciarCampeonato(id));
    }

    @PutMapping("/{id}/finalizar")
    //@PreAuthorize("hasAuthority('admin-geral')")
    public ResponseEntity<Campeonato> finalizar(@PathVariable Long id) {
        return ResponseEntity.ok(businessService.finalizarCampeonato(id));
    }
}