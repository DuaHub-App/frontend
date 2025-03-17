package com.app.duahub.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.duahub.entity.Campeonato;
import com.app.duahub.entity.DataCampeonato;
import com.app.duahub.exception.BusinessException;
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
	
	public enum StatusCampeonato{
		PENDENTE,
		EM_ANDAMENTO,
		FINALIZADO
	}

	public void validarDataCampeonato(DataCampeonato data) {
		LocalDate hoje = LocalDate.now();
		
		if(data.getData().isBefore(hoje)) {
			throw new BusinessException("A data do campeonato deve ser futura ou no mesmo dia!");
		} else if(data.getHoraFim().isBefore(data.getHoraInicio())) {
			throw new BusinessException("O horario final deve ser depois do horario de Inicio");
		}
	}
	
	public void atualizarStatus(Campeonato campeonato) {
		LocalDate hoje = LocalDate.now();
		LocalTime agora = LocalTime.now();
		
		DataCampeonato data = campeonato.getDataCampeonato();
		
		if(hoje.isBefore(data.getData()) || agora.isBefore(data.getHoraInicio())) {
			campeonato.setStatus(StatusCampeonato.PENDENTE);
		}else if(hoje.equals(data.getData()) && agora.equals(data.getHoraInicio())) {
			campeonato.setStatus(StatusCampeonato.EM_ANDAMENTO);
		}else {
		}
		
		campeonatoRepository.save(campeonato);
	}
}
