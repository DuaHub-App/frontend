package com.app.duahub.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.duahub.entity.Campeonato;
import com.app.duahub.entity.Equipe;
import com.app.duahub.entity.Partida;
import com.app.duahub.exception.BusinessException;
import com.app.duahub.repository.CampeonatoRepository;
import com.app.duahub.repository.PartidaRepository;

@Service
public class PartidaService {

	@Autowired
	private PartidaRepository partidaRepository;
	
	@Autowired
	private CampeonatoRepository campeonatoRepository;
	
	private Partida.FasePartida determinarFase(int numeroDeEquipes) {
	    if (numeroDeEquipes >= 16) {
	        return Partida.FasePartida.OITAVAS;
	    } else if (numeroDeEquipes == 8) {
	        return Partida.FasePartida.QUARTAS;
	    } else if (numeroDeEquipes == 4) {
	        return Partida.FasePartida.SEMIFINAL;
	    } else {
	        return Partida.FasePartida.FINAL;
	    }
	}
	
	public void gerarPartidasAutomaticamente(Long campeonatoId) {
	    Campeonato campeonato = campeonatoRepository.findById(campeonatoId)
	        .orElseThrow(() -> new BusinessException("Campeonato não encontrado!"));

	    List<Equipe> equipes = campeonato.getEquipes();
	    
	    if (equipes.size() < 2) {
	        throw new BusinessException("É necessário pelo menos 2 equipes para criar partidas.");
	    }

	    List<Partida> partidas = new ArrayList<>();
	    
	    // Define a fase inicial com base no número de equipes
	    Partida.FasePartida fase = determinarFase(equipes.size());

	    for (int i = 0; i < equipes.size(); i += 2) {
	        if (i + 1 < equipes.size()) {
	            Partida partida = new Partida();
	            partida.setFase(fase);
	            partida.setEquipe1(equipes.get(i));
	            partida.setEquipe2(equipes.get(i + 1));
	            partida.setCampeonato(campeonato);
	            partidas.add(partida);
	        }
	    }
	    
	    partidaRepository.saveAll(partidas);
	}
	
}
