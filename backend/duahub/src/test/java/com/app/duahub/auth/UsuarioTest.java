package com.app.duahub.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collection;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@SpringBootTest
public class UsuarioTest {
	
	@Test
    void deveRetornarListaDeAuthoritiesComBaseNaRole() {
        // Configuração
        Usuario usuario = new Usuario();
        usuario.setRole("ROLE_ADMIN");

        // Execução
        Collection<? extends GrantedAuthority> authorities = usuario.getAuthorities();

        // Verificações
        assertNotNull(authorities);
        assertEquals(1, authorities.size());
        assertTrue(authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN")));
    }

    @Test
    void deveRetornarSenhaDoUsuario() {
        // Configuração
        Usuario usuario = new Usuario();
        usuario.setPassword("password123");

        // Execução
        String password = usuario.getPassword();

        // Verificação
        assertEquals("password123", password);
    }

    @Test
    void deveRetornarUsernameDoUsuario() {
        // Configuração
        Usuario usuario = new Usuario();
        usuario.setUsername("user123");

        // Execução
        String username = usuario.getUsername();

        // Verificação
        assertEquals("user123", username);
    }

    @Test
    void deveRetornarContaComoAtivaPorPadrao() {
        // Configuração
        Usuario usuario = new Usuario();

        // Verificações
        assertTrue(usuario.isAccountNonExpired());
        assertTrue(usuario.isAccountNonLocked());
        assertTrue(usuario.isCredentialsNonExpired());
        assertTrue(usuario.isEnabled());
    }

    @Test
    void devePermitirDefinirEAcessarAtributos() {
        // Configuração
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setUsername("test_user");
        usuario.setPassword("test_password");
        usuario.setRole("ROLE_USER");

        // Verificações
        assertEquals(1L, usuario.getId());
        assertEquals("test_user", usuario.getUsername());
        assertEquals("test_password", usuario.getPassword());
        assertEquals("ROLE_USER", usuario.getRole());
    }

}
