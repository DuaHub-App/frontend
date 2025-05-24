package com.app.duahub.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.app.duahub.entity.Campeonato;
import com.app.duahub.service.CampeonatoService;

@SpringBootTest
public class CampeonatoControllerTest {
	
	@Autowired
    private CampeonatoController campeonatoController;

    @MockBean
    private CampeonatoService campeonatoService;

    private Campeonato campeonato1;
    private Campeonato campeonato2;
    private List<Campeonato> listaCampeonatos;
    private List<Campeonato> listaVazia;

    @BeforeEach
    void setup() {
        // Criação de instâncias de Campeonato
        campeonato1 = new Campeonato();
        campeonato1.setId(1L);
        campeonato1.setNome("Campeonato de Futebol");

        campeonato2 = new Campeonato();
        campeonato2.setId(2L);
        campeonato2.setNome("Campeonato de Basquete");

        // Lista com campeonatos
        listaCampeonatos = List.of(campeonato1, campeonato2);
        listaVazia = new ArrayList<>();
    }

    /*@Test
    void cenario1_salvarCampeonatoComSucesso() {
        // Mockando o comportamento do serviço
        when(campeonatoService.save(any(Campeonato.class))).thenReturn("Campeonato criado com sucesso");

        // Chamando o método da controller
        Campeonato campeonato = new Campeonato();
        ResponseEntity<Object> retorno = campeonatoController.save(campeonato);

        // Verificando o código de status e o corpo da resposta
        assertEquals(HttpStatus.CREATED, retorno.getStatusCode());  // Verifica se o status é 201 (CREATED)
        assertEquals("Campeonato criado com sucesso", retorno.getBody());  // Verifica a mensagem do corpo
    }

    @Test
    void cenario2_salvarCampeonatoComErro() {
        // Mockando o comportamento do serviço para lançar uma exceção
        when(campeonatoService.save(any(Campeonato.class))).thenThrow(new RuntimeException("Erro ao salvar o campeonato"));

        // Chamando o método da controller
        Campeonato campeonato = new Campeonato();
        ResponseEntity<Object> retorno = campeonatoController.save(campeonato);

        // Verificando o código de status e o corpo da resposta
        assertEquals(HttpStatus.BAD_REQUEST, retorno.getStatusCode());  // Verifica se o status é 400 (BAD REQUEST)
        assertEquals("Erro ao salvar o campeonato: Erro ao salvar o campeonato", retorno.getBody());  // Verifica a mensagem no corpo
    }

    @Test
    void cenario3_atualizarCampeonatoComSucesso() {
        // Mockando o comportamento do serviço
        when(campeonatoService.update(any(Campeonato.class), eq(1L))).thenReturn("Campeonato atualizado com sucesso");

        // Chamando o método da controller
        Campeonato campeonato = new Campeonato();
        ResponseEntity<Object> retorno = campeonatoController.update(campeonato, 1L);

        // Verificando o código de status e o corpo da resposta
        assertEquals(HttpStatus.OK, retorno.getStatusCode());  // Verifica se o status é 200 (OK)
        assertEquals("Campeonato atualizado com sucesso", retorno.getBody());  // Verifica a mensagem no corpo
    }

    @Test
    void cenario4_atualizarCampeonatoComErro() {
        // Mockando o comportamento do serviço para lançar uma exceção
        when(campeonatoService.update(any(Campeonato.class), eq(1L))).thenThrow(new RuntimeException("Erro ao atualizar o campeonato"));

        // Chamando o método da controller
        Campeonato campeonato = new Campeonato();
        ResponseEntity<Object> retorno = campeonatoController.update(campeonato, 1L);

        // Verificando o código de status e o corpo da resposta
        assertEquals(HttpStatus.BAD_REQUEST, retorno.getStatusCode());  // Verifica se o status é 400 (BAD REQUEST)
        assertEquals("Erro ao atualizar o campeonato: Erro ao atualizar o campeonato", retorno.getBody());  // Verifica a mensagem no corpo
    }

    @Test
    void cenario5_excluirCampeonatoComSucesso() {
        // Mockando o comportamento do serviço
        when(campeonatoService.delete(1L)).thenReturn("Campeonato excluído com sucesso");

        // Chamando o método da controller
        ResponseEntity<Object> retorno = campeonatoController.delete(1L);

        // Verificando o código de status e o corpo da resposta
        assertEquals(HttpStatus.OK, retorno.getStatusCode());  // Verifica se o status é 200 (OK)
        assertEquals("Campeonato excluído com sucesso", retorno.getBody());  // Verifica a mensagem no corpo
    }

    @Test
    void cenario6_excluirCampeonatoComErro() {
        // Mockando o comportamento do serviço para lançar uma exceção
        when(campeonatoService.delete(1L)).thenThrow(new RuntimeException("Erro ao excluir o campeonato"));

        // Chamando o método da controller
        ResponseEntity<Object> retorno = campeonatoController.delete(1L);

        // Verificando o código de status e o corpo da resposta
        assertEquals(HttpStatus.BAD_REQUEST, retorno.getStatusCode());  // Verifica se o status é 400 (BAD REQUEST)
        assertEquals("Erro ao excluir o campeonato: Erro ao excluir o campeonato", retorno.getBody());  // Verifica a mensagem no corpo
    }

    @Test
    void cenario7_buscarTodosCampeonatosComSucesso() {
        // Mockando o comportamento do serviço
        when(campeonatoService.findAll()).thenReturn(listaCampeonatos);

        // Chamando o método da controller
        ResponseEntity<Object> retorno = campeonatoController.findAll();

        // Verificando o código de status e o corpo da resposta
        assertEquals(HttpStatus.OK, retorno.getStatusCode());  // Verifica se o status é 200 (OK)
        assertTrue(retorno.getBody() instanceof List);  // Verifica se o corpo é uma lista
    }

    @Test
    void cenario8_buscarTodosCampeonatosComErro() {
        // Mockando o comportamento do serviço para lançar uma exceção
        when(campeonatoService.findAll()).thenThrow(new RuntimeException("Erro ao buscar campeonatos"));

        // Chamando o método da controller
        ResponseEntity<Object> retorno = campeonatoController.findAll();

        // Verificando o código de status e o corpo da resposta
        assertEquals(HttpStatus.BAD_REQUEST, retorno.getStatusCode());  // Verifica se o status é 400 (BAD REQUEST)
        assertEquals("Erro ao buscar campeonatos: Erro ao buscar campeonatos", retorno.getBody());  // Verifica a mensagem no corpo
    }

    @Test
    void cenario9_buscarCampeonatoPorIdComSucesso() {
        // Mockando o comportamento do serviço
        when(campeonatoService.findById(1L)).thenReturn(campeonato1);

        // Chamando o método da controller
        ResponseEntity<Object> retorno = campeonatoController.findById(1L);

        // Verificando o código de status e o corpo da resposta
        assertEquals(HttpStatus.OK, retorno.getStatusCode());  // Verifica se o status é 200 (OK)
        assertEquals(campeonato1, retorno.getBody());  // Verifica se o corpo é o campeonato esperado
    }

    @Test
    void cenario10_buscarCampeonatoPorIdNaoEncontrado() {
        // Mockando o comportamento do serviço para lançar uma exceção
        when(campeonatoService.findById(1L)).thenThrow(new RuntimeException("Campeonato não encontrado"));

        // Chamando o método da controller
        ResponseEntity<Object> retorno = campeonatoController.findById(1L);

        // Verificando o código de status e o corpo da resposta
        assertEquals(HttpStatus.NOT_FOUND, retorno.getStatusCode());  // Verifica se o status é 404 (NOT FOUND)
        assertEquals("Campeonato não encontrado: Campeonato não encontrado", retorno.getBody());  // Verifica a mensagem no corpo
    }*/
}
