package com.app.duahub.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.app.duahub.entity.Campeonato;
import com.app.duahub.repository.CampeonatoRepository;

@SpringBootTest
public class CampeonatoServiceTest {
	
	@Autowired
	CampeonatoService campeonatoService;
	
	@MockBean
	CampeonatoRepository campeonatoRepository;
	
	private Campeonato campeonato;
    private List<Campeonato> listaCampeonatos;

    @BeforeEach
    void setup() {
        campeonato = new Campeonato();
        campeonato.setId(1L);
        campeonato.setNome("Campeonato de Futebol");
        
        listaCampeonatos = new ArrayList<>();
        listaCampeonatos.add(campeonato);
    }

    // Teste: Salvar campeonato com sucesso
    @Test
    void cenario01_salvarCampeonatoComSucesso() {
        when(campeonatoRepository.save(campeonato)).thenReturn(campeonato);
        
        String retorno = campeonatoService.save(campeonato);

        assertEquals("Campeonato salvo com sucesso!", retorno);
        verify(campeonatoRepository, times(1)).save(campeonato);
    }

    // Teste: Atualizar campeonato com sucesso
    @Test
    void cenario02_atualizarCampeonatoComSucesso() {
        when(campeonatoRepository.existsById(1L)).thenReturn(true);
        when(campeonatoRepository.save(campeonato)).thenReturn(campeonato);
        
        String retorno = campeonatoService.update(campeonato, 1L);

        assertEquals("Campeonato atualizado com sucesso!", retorno);
        verify(campeonatoRepository, times(1)).save(campeonato);
    }

    // Teste: Atualizar campeonato não encontrado
    @Test
    void cenario03_atualizarCampeonatoNaoEncontrado() {
        when(campeonatoRepository.existsById(1L)).thenReturn(false);
        
        String retorno = campeonatoService.update(campeonato, 1L);

        assertEquals("Campeonato não encontrado!", retorno);
        verify(campeonatoRepository, times(0)).save(campeonato);
    }

    // Teste: Deletar campeonato com sucesso
    @Test
    void cenario04_deletarCampeonatoComSucesso() {
        when(campeonatoRepository.existsById(1L)).thenReturn(true);
        
        String retorno = campeonatoService.delete(1L);

        assertEquals("Campeonato deletado com sucesso!", retorno);
        verify(campeonatoRepository, times(1)).deleteById(1L);
    }

    // Teste: Deletar campeonato não encontrado
    @Test
    void cenario05_deletarCampeonatoNaoEncontrado() {
        when(campeonatoRepository.existsById(1L)).thenReturn(false);
        
        String retorno = campeonatoService.delete(1L);

        assertEquals("Campeonato não encontrado!", retorno);
        verify(campeonatoRepository, times(0)).deleteById(1L);
    }

    // Teste: Buscar todos os campeonatos
    @Test
    void cenario06_buscarTodosCampeonatos() {
        when(campeonatoRepository.findAll()).thenReturn(listaCampeonatos);
        
        List<Campeonato> retorno = campeonatoService.findAll();

        assertEquals(1, retorno.size());
        assertEquals("Campeonato de Futebol", retorno.get(0).getNome());
    }

    // Teste: Buscar campeonato por ID com sucesso
    @Test
    void cenario07_buscarCampeonatoPorIdComSucesso() {
        when(campeonatoRepository.findById(1L)).thenReturn(Optional.of(campeonato));
        
        Campeonato retorno = campeonatoService.findById(1L);

        assertEquals("Campeonato de Futebol", retorno.getNome());
    }

    @Test
    void cenario08_buscarCampeonatoPorIdNaoEncontrado() {
        when(campeonatoRepository.findById(1L)).thenReturn(Optional.empty());
        
        try {
            campeonatoService.findById(1L);
            fail("Esperava exceção de campeonato não encontrado");
        } catch (RuntimeException e) {
            assertEquals("Campeonato não encontrado", e.getMessage());
        }
    }

}
