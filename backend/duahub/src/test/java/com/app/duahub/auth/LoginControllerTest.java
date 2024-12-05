package com.app.duahub.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import javax.naming.AuthenticationException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest
public class LoginControllerTest {
	
	@Mock
    private LoginService loginService;

    @InjectMocks
    private LoginController loginController;

    private Login loginRequest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        loginRequest = new Login(); // Crie um objeto Login com dados válidos para os testes
        loginRequest.setUsername("validUser");
        loginRequest.setPassword("validPassword");
    }

    @Test
    void cenarIoLoginComSucesso() {
        // Configuração do mock para simular um login bem-sucedido
        when(loginService.logar(any(Login.class))).thenReturn("mocked-jwt-token");

        // Chamada ao método da controller
        ResponseEntity<String> response = loginController.logar(loginRequest);

        // Verificações
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("mocked-jwt-token", response.getBody());
    }

    @Test
    void cenarIoLoginComCredenciaisInvalidas() {
        // Configuração do mock para simular erro de autenticação
        when(loginService.logar(any(Login.class))).thenThrow(new org.springframework.security.authentication.BadCredentialsException("Credenciais inválidas"));

        // Chamada ao método da controller
        ResponseEntity<String> response = loginController.logar(loginRequest);

        // Verificações
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertNull(response.getBody());  // O corpo da resposta deve ser nulo
    }

    @Test
    void cenarIoLoginComErroInterno() {
        // Configuração do mock para simular erro genérico
        when(loginService.logar(any(Login.class))).thenThrow(new RuntimeException("Erro inesperado"));

        // Chamada ao método da controller
        ResponseEntity<String> response = loginController.logar(loginRequest);

        // Verificações
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNull(response.getBody());  // O corpo da resposta deve ser nulo
    }
}
