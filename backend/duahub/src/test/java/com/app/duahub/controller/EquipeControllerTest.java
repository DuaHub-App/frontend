package com.app.duahub.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

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

@SpringBootTest
public class EquipeControllerTest {

	@Autowired
	EquipeController equipeController;
	
	@MockBean
	EquipeRepository equipeRepository;
	
	@Test
    void cenario01_retornaListaVaziaDeEquipes() {
        // Configurando o comportamento simulado do repositório
        List<Equipe> listaVazia = new ArrayList<>();
        when(equipeRepository.findAll()).thenReturn(listaVazia);

        // Chamando o controlador
        ResponseEntity<List<Equipe>> retorno = equipeController.findAll();

        // Validando o resultado
        assertEquals(HttpStatus.OK, retorno.getStatusCode());
        assertEquals(0, retorno.getBody().size());
    }

    @Test
    void cenario02_retornaListaDeEquipesComParticipantes() {
        // Criando os dados simulados
        Participante participante1 = new Participante();
        participante1.setId(1L);
        participante1.setNome("João Silva");

        Participante participante2 = new Participante();
        participante2.setId(2L);
        participante2.setNome("Maria Souza");

        Equipe equipe = new Equipe();
        equipe.setId(1L);
        equipe.setNome("Equipe A");
        equipe.setParticipantes(List.of(participante1, participante2));

        List<Equipe> listaDeEquipes = List.of(equipe);
        when(equipeRepository.findAll()).thenReturn(listaDeEquipes);

        // Chamando o controlador
        ResponseEntity<List<Equipe>> retorno = equipeController.findAll();

        // Validando o resultado
        assertEquals(HttpStatus.OK, retorno.getStatusCode());
        assertEquals(1, retorno.getBody().size());
        assertEquals("Equipe A", retorno.getBody().get(0).getNome());
        assertEquals(2, retorno.getBody().get(0).getParticipantes().size());
    }
}
