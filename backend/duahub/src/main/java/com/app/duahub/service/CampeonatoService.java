package com.app.duahub.service;

import com.app.duahub.dto.CampeonatoDTO;
import com.app.duahub.entity.Campeonato;
import java.util.List;
import java.util.Optional;

public interface CampeonatoService {
	// Operações básicas de CRUD
	Campeonato salvar(Campeonato campeonato);
	Campeonato atualizar(Campeonato campeonato, Long id);
	void deletar(Long id);
	List<Campeonato> listarTodos();
	List<CampeonatoDTO> listarTodosComoDTO();
	Optional<Campeonato> buscarPorId(Long id);
}