package com.app.duahub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.duahub.entity.Campeonato;
import com.app.duahub.entity.Equipe;
import com.app.duahub.repository.CampeonatoRepository;

@Service
public class CampeonatoService {

	@Autowired
	private CampeonatoRepository campeonatoRepository;

	public String save(Campeonato campeonato) {
		this.campeonatoRepository.save(campeonato);
		return "Campeonato salvo com sucesso!";
	}

	public String update(Campeonato campeonato, Long id) {
		if (campeonatoRepository.existsById(id)) {
			campeonato.setId(id);
			campeonatoRepository.save(campeonato);
			return "Campeonato atualizado com sucesso!";
		} else {
			return "Campeonato não encontrado!";
		}
	}

	public String delete(Long id) {
		if (campeonatoRepository.existsById(id)) {
			campeonatoRepository.deleteById(id);
			return "Campeonato deletado com sucesso!";
		} else {
			return "Campeonato não encontrado!";
		}
	}

	public List<Campeonato> findAll(){
		List<Campeonato> list = this.campeonatoRepository.findAll();
		return list;
	}

	public Campeonato findById(Long id) {
	    return this.campeonatoRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Campeonato não encontrado"));
	}

}
