package com.app.duahub.service;

import com.app.duahub.dto.CampeonatoDTO;
import com.app.duahub.entity.Campeonato;
import com.app.duahub.repository.CampeonatoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CampeonatoServiceImpl implements CampeonatoService {

    private final CampeonatoRepository repository;

    @Override
    public Campeonato salvar(Campeonato campeonato) {
        return repository.save(campeonato);
    }

    @Override
    public Campeonato atualizar(Campeonato campeonato, Long id) {
        campeonato.setId(id);
        return repository.save(campeonato);
    }

    @Override
    public void deletar(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Campeonato> listarTodos() {
        return repository.findAll();
    }

    @Override
    public List<CampeonatoDTO> listarTodosComoDTO() {
        return repository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Campeonato> buscarPorId(Long id) {
        return repository.findById(id);
    }

    private CampeonatoDTO convertToDTO(Campeonato campeonato) {
        return CampeonatoDTO.builder()
                .id(campeonato.getId())
                .nome(campeonato.getNome())
                .status(campeonato.getStatus().toString())
                .build();
    }
}