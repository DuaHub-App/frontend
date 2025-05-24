package com.app.duahub.service;

import com.app.duahub.entity.Campeonato;
import com.app.duahub.entity.StatusCampeonato;
import com.app.duahub.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CampeonatoBusinessService {

    private final CampeonatoService campeonatoService;

    public Campeonato iniciarCampeonato(Long id) {
        Campeonato campeonato = campeonatoService.buscarPorId(id)
                .orElseThrow(() -> new BusinessException("Campeonato não encontrado"));

        if (campeonato.getStatus() != StatusCampeonato.PENDENTE) {
            throw new BusinessException("Status inválido para iniciar campeonato");
        }

        campeonato.setStatus(StatusCampeonato.EM_ANDAMENTO);
        return campeonatoService.salvar(campeonato);
    }

    public Campeonato finalizarCampeonato(Long id) {
        // 1. Busca o campeonato ou lança exceção se não encontrado
        Campeonato campeonato = campeonatoService.buscarPorId(id)
                .orElseThrow(() -> new BusinessException("Campeonato não encontrado"));

        // 2. Valida se o campeonato está em andamento
        if (campeonato.getStatus() != StatusCampeonato.EM_ANDAMENTO) {
            throw new BusinessException("Apenas campeonatos em andamento podem ser finalizados");
        }

        // 3. Atualiza o status e salva
        campeonato.setStatus(StatusCampeonato.FINALIZADO);
        return campeonatoService.salvar(campeonato);
    }
}