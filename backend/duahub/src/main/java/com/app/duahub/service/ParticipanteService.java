package com.app.duahub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.duahub.entity.Participante;
import com.app.duahub.repository.ParticipanteRepository;


@Service
public class ParticipanteService {
	
	@Autowired ParticipanteRepository participanteRepository;
	
	public String save(Participante participante) {
		this.participanteRepository.save(participante);
		return "participante salvo com sucesso!";
	}

	public String update(Participante participante, Long id) {
		if (participanteRepository.existsById(id)) {
			participante.setId(id);
			participanteRepository.save(participante);
			return "participante atualizado com sucesso!";
		} else {
			return "participante não encontrado!";
		}
	}

	public String delete(Long id) {
		if (participanteRepository.existsById(id)) {
			participanteRepository.deleteById(id);
			return "participante deletado com sucesso!";
		} else {
			return "participante não encontrado!";
		}
	}

	public List<Participante> findAll(){
		List<Participante> list = this.participanteRepository.findAll();
		return list;
	}

	public Participante findById(Long id) {
	    return this.participanteRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("participante não encontrado"));
	}
	
	
}
