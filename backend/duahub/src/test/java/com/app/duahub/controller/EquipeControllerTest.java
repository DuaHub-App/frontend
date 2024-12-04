package com.app.duahub.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import com.app.duahub.entity.Equipe;
import com.app.duahub.entity.Participante;
import com.app.duahub.repository.EquipeRepository;
import com.app.duahub.service.EquipeService;

@SpringBootTest
public class EquipeControllerTest {

	@Autowired
	EquipeController equipeController;
	
	@MockBean
	EquipeService equipeService;
	
	private Equipe equipe;
    private Participante participante1;
    private Participante participante2;
    private List<Equipe> listaEquipes;
    private List<Equipe> listaVazia;

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
        listaVazia = new ArrayList<>();
    }

    @Test
    void cenario01_retornaListaVaziaDeEquipes() {
        when(equipeService.findAll()).thenReturn(listaVazia);

        ResponseEntity<List<Equipe>> retorno = equipeController.findAll();

        assertEquals(HttpStatus.OK, retorno.getStatusCode());
        assertEquals(0, retorno.getBody().size());
    }

    @Test
    void cenario02_retornaListaDeEquipesComParticipantes() {
        when(equipeService.findAll()).thenReturn(listaEquipes);

        ResponseEntity<List<Equipe>> retorno = equipeController.findAll();

        assertEquals(HttpStatus.OK, retorno.getStatusCode());
        assertEquals(1, retorno.getBody().size());
        assertEquals("Equipe A", retorno.getBody().get(0).getNome());
        assertEquals(2, retorno.getBody().get(0).getParticipantes().size());
    }

    @Test
    void cenario03_salvarEquipeComSucesso() {
        when(equipeService.save(equipe)).thenReturn("Equipe criada com sucesso!");

        ResponseEntity<String> retorno = equipeController.save(equipe);

        assertEquals(HttpStatus.CREATED, retorno.getStatusCode());
        assertEquals("Equipe criada com sucesso!", retorno.getBody());
    }

    @Test
    void cenario04_atualizarEquipeComSucesso() {
        equipe.setNome("Equipe Atualizada");
        when(equipeService.update(equipe, 1L)).thenReturn("Equipe atualizada com sucesso!");

        ResponseEntity<String> retorno = equipeController.update(equipe, 1L);

        assertEquals(HttpStatus.OK, retorno.getStatusCode());
        assertEquals("Equipe atualizada com sucesso!", retorno.getBody());
    }

    @Test
    void cenario05_deletarEquipeComSucesso() {
        when(equipeService.delete(1L)).thenReturn("Equipe deletada com sucesso!");

        ResponseEntity<String> retorno = equipeController.delete(1L);

        assertEquals(HttpStatus.OK, retorno.getStatusCode());
        assertEquals("Equipe deletada com sucesso!", retorno.getBody());
    }

    @Test
    void cenario06_buscarEquipePorIdComSucesso() {
        when(equipeService.findById(1L)).thenReturn(equipe);

        ResponseEntity<Equipe> retorno = equipeController.findById(1L);

        assertEquals(HttpStatus.OK, retorno.getStatusCode());
        assertEquals("Equipe A", retorno.getBody().getNome());
    }

    @Test
    void cenario07_buscarEquipePorIdNaoEncontrada() {
        when(equipeService.findById(1L)).thenThrow(new RuntimeException("Equipe não encontrada"));

        ResponseEntity<Equipe> retorno = equipeController.findById(1L);

        assertEquals(HttpStatus.BAD_REQUEST, retorno.getStatusCode());
    }
}
