package com.app.duahub.service;

import java.util.List;

import com.app.duahub.dto.EquipeDTO;
import com.app.duahub.dto.ParticipanteDTO;
import com.app.duahub.entity.Participante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.duahub.entity.Equipe;
import com.app.duahub.repository.EquipeRepository;

@Service
public class EquipeService {

	@Autowired
	public EquipeRepository equipeRepository;

	public String save(Equipe equipe) {
		this.equipeRepository.save(equipe);
		return "Equipe salva com sucesso!";
	}

	public String update(Equipe equipe, Long id) {
		if (equipeRepository.existsById(id)) {
			equipe.setId(id);
			equipeRepository.save(equipe);
			return "Equipe atualizada com sucesso!";
		} else {
			return "Equipe não encontrada!";
		}
	}

	public String delete(Long id) {
		if (equipeRepository.existsById(id)) {
			equipeRepository.deleteById(id);
			return "Equipe deletada com sucesso!";
		} else {
			return "Equipe não encontrada!";
		}
	}

	public List<Equipe> findAll(){
		List<Equipe> list = this.equipeRepository.findAll();
		return list;
	}

	public Equipe findById(Long id) {
		Equipe equipe = this.equipeRepository.findById(id).get();
		return equipe;
	}

	public EquipeDTO save(EquipeDTO equipeDTO) {
		// Aqui você faz a conversão de DTO para Entity
		Equipe equipe = new Equipe();
		equipe.setNome(equipeDTO.getNome());

		List<Participante> participantes = equipeDTO.getParticipantes().stream().map(p -> {
			Participante participante = new Participante();
			participante.setNome(p.getNome());
			return participante;
		}).toList();

		equipe.setParticipantes(participantes);

		equipe = equipeRepository.save(equipe);

		// Se quiser, pode devolver o DTO preenchido
		EquipeDTO equipeCriada = new EquipeDTO();
		equipeCriada.setNome(equipe.getNome());
		equipeCriada.setParticipantes(equipe.getParticipantes().stream().map(p -> {
			ParticipanteDTO participanteDTO = new ParticipanteDTO();
			participanteDTO.setNome(p.getNome());
			return participanteDTO;
		}).toList());

		return equipeCriada;
	}
}
