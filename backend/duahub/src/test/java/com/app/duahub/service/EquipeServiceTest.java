package com.app.duahub.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.app.duahub.entity.Equipe;
import com.app.duahub.entity.Participante;
import com.app.duahub.repository.EquipeRepository;

@SpringBootTest
public class EquipeServiceTest {
	
	@Autowired
	EquipeService equipeService;
	
	@MockBean
	EquipeRepository equipeRepository;
	
	private Equipe equipe;
    private Participante participante1;
    private Participante participante2;
    private List<Equipe> listaEquipes;

    @BeforeEach
    void setup() {
        participante1 = new Participante();
        participante1.setId(1L);
        participante1.setNome("João Silva");

        participante2 = new Participante();
        participante2.setId(2L);
        participante2.setNome("Maria Souza");

        equipe = new Equipe();
        equipe.setId(1L);
        equipe.setNome("Equipe A");
        equipe.setParticipantes(List.of(participante1, participante2));

        listaEquipes = List.of(equipe);
    }

    @Test
    void cenario01_salvarEquipe() {
        when(equipeRepository.save(equipe)).thenReturn(equipe);

        String retorno = equipeService.save(equipe);

        assertEquals("Equipe salva com sucesso!", retorno);
        verify(equipeRepository, times(1)).save(equipe);
    }

    @Test
    void cenario02_atualizarEquipeExistente() {
        when(equipeRepository.existsById(1L)).thenReturn(true);
        when(equipeRepository.save(equipe)).thenReturn(equipe);

        equipe.setNome("Equipe Atualizada");
        String retorno = equipeService.update(equipe, 1L);

        assertEquals("Equipe atualizada com sucesso!", retorno);
        verify(equipeRepository, times(1)).save(equipe);
    }

    @Test
    void cenario03_atualizarEquipeInexistente() {
        when(equipeRepository.existsById(1L)).thenReturn(false);

        String retorno = equipeService.update(equipe, 1L);

        assertEquals("Equipe não encontrada!", retorno);
        verify(equipeRepository, times(0)).save(equipe);
    }

    @Test
    void cenario04_deletarEquipeExistente() {
        when(equipeRepository.existsById(1L)).thenReturn(true);
        doNothing().when(equipeRepository).deleteById(1L);

        String retorno = equipeService.delete(1L);

        assertEquals("Equipe deletada com sucesso!", retorno);
        verify(equipeRepository, times(1)).deleteById(1L);
    }

    @Test
    void cenario05_deletarEquipeInexistente() {
        when(equipeRepository.existsById(1L)).thenReturn(false);

        String retorno = equipeService.delete(1L);

        assertEquals("Equipe não encontrada!", retorno);
        verify(equipeRepository, times(0)).deleteById(1L);
    }

    @Test
    void cenario06_buscarTodasAsEquipes() {
        when(equipeRepository.findAll()).thenReturn(listaEquipes);

        List<Equipe> retorno = equipeService.findAll();

        assertEquals(1, retorno.size());
        assertEquals("Equipe A", retorno.get(0).getNome());
        verify(equipeRepository, times(1)).findAll();
    }

    @Test
    void cenario07_buscarEquipePorIdExistente() {
        when(equipeRepository.findById(1L)).thenReturn(Optional.of(equipe));

        Equipe retorno = equipeService.findById(1L);

        assertEquals("Equipe A", retorno.getNome());
        assertEquals(2, retorno.getParticipantes().size());
        verify(equipeRepository, times(1)).findById(1L);
    }

    @Test
    void cenario08_buscarEquipePorIdInexistente() {
        when(equipeRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> equipeService.findById(1L));

        assertEquals("No value present", exception.getMessage());
        verify(equipeRepository, times(1)).findById(1L);
    }

	}
