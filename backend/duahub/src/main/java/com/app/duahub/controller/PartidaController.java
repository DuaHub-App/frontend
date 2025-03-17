package com.app.duahub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.duahub.service.PartidaService;

@RestController
@RequestMapping("/partidas")
public class PartidaController {

	@Autowired
    private PartidaService partidaService;

    @PostMapping("/gerar/{campeonatoId}")
    public ResponseEntity<String> gerarPartidas(@PathVariable Long campeonatoId) {
        partidaService.gerarPartidasAutomaticamente(campeonatoId);
        return ResponseEntity.ok("Partidas geradas com sucesso!");
    }
}
