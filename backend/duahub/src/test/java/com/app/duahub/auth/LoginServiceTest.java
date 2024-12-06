package com.app.duahub.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.app.duahub.config.JwtServiceGenerator;

@SpringBootTest
public class LoginServiceTest {
	
	@InjectMocks
    private LoginService loginService;

    @Mock
    private LoginRepository loginRepository;

    @Mock
    private JwtServiceGenerator jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveRetornarTokenJwtQuandoLoginValido() {
        // Configuração
        Login login = new Login("user_test", "password_test");
        Usuario usuario = new Usuario();
        usuario.setUsername("user_test");
        usuario.setPassword("password_test");
        usuario.setRole("ROLE_USER");

        when(loginRepository.findByUsername("user_test")).thenReturn(Optional.of(usuario));
        when(jwtService.generateToken(usuario)).thenReturn("mocked_jwt_token");

        // Execução
        String token = loginService.logar(login);

        // Verificações
        // Usamos ArgumentCaptor para capturar o argumento passado para o authenticate
        ArgumentCaptor<UsernamePasswordAuthenticationToken> captor = ArgumentCaptor.forClass(UsernamePasswordAuthenticationToken.class);
        verify(authenticationManager).authenticate(captor.capture());
        
        // Verifica se o valor do UsernamePasswordAuthenticationToken está correto
        assertEquals("user_test", captor.getValue().getName());
        assertEquals("password_test", captor.getValue().getCredentials());
        
        // Verificação se o repositório foi chamado corretamente (1 vez)
        verify(loginRepository).findByUsername("user_test");

        // Verificação se o token JWT foi gerado
        verify(jwtService).generateToken(usuario);

        // Verificação do retorno do método
        assertEquals("mocked_jwt_token", token);
    }
    @Test
    void deveLancarBadCredentialsExceptionQuandoCredenciaisForemInvalidas() {
        // Configuração
        Login login = new Login("user_test", "wrong_password");

        // Mock do repositório para retornar um usuário válido
        Usuario usuario = new Usuario();
        usuario.setUsername("user_test");
        usuario.setPassword("hashed_password"); // Aqui você pode usar qualquer valor representando a senha armazenada
        usuario.setRole("ROLE_USER");
        
        when(loginRepository.findByUsername("user_test")).thenReturn(Optional.of(usuario));

        // Mock do AuthenticationManager para lançar uma exceção BadCredentialsException
        doThrow(new BadCredentialsException("Credenciais inválidas"))
            .when(authenticationManager)
            .authenticate(any(UsernamePasswordAuthenticationToken.class));

        // Execução e Verificações
        BadCredentialsException exception = assertThrows(BadCredentialsException.class, () -> {
            loginService.logar(login);
        });

        assertEquals("Credenciais inválidas", exception.getMessage());
        verify(authenticationManager).authenticate(
            new UsernamePasswordAuthenticationToken("user_test", "wrong_password")
        );
    }

    @Test
    void deveLancarExcecaoQuandoUsuarioNaoForEncontrado() {
        // Configuração
        Login login = new Login("inexistent_user", "password");

        // Simula a ausência do usuário no repositório
        when(loginRepository.findByUsername("inexistent_user")).thenReturn(Optional.empty());

        // Execução e Verificações
        Exception exception = assertThrows(RuntimeException.class, () -> {
            loginService.logar(login);
        });

        // Verificação da mensagem da exceção
        assertEquals("Usuário não encontrado", exception.getMessage());

        // Verificação do mock
        verify(loginRepository).findByUsername("inexistent_user");
        verifyNoInteractions(authenticationManager);
        verifyNoInteractions(jwtService);
    }

    @Test
    void deveLancarExcecaoQuandoJwtServiceFalhar() {
        // Configuração
        Login login = new Login("user_test", "password_test");
        Usuario usuario = new Usuario();
        usuario.setUsername("user_test");
        usuario.setPassword("password_test");

        when(loginRepository.findByUsername("user_test")).thenReturn(Optional.of(usuario));
        doThrow(new RuntimeException("Erro ao gerar token")).when(jwtService).generateToken(usuario);

        // Execução e Verificações
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            loginService.logar(login);
        });

        assertEquals("Erro ao gerar token", exception.getMessage());
        verify(jwtService).generateToken(usuario);
    }


}
