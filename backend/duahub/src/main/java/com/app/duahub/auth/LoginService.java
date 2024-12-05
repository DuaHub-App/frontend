//AuthenticationService.java
package com.app.duahub.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.app.duahub.config.JwtServiceGenerator;

@Service
public class LoginService {
	
	@Autowired
	private LoginRepository repository;
	@Autowired
	private JwtServiceGenerator jwtService;
	@Autowired
	private AuthenticationManager authenticationManager;


	public String logar(Login login) {

        // Busca o usuário no repositório
        Usuario user = repository.findByUsername(login.getUsername())
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Realiza a autenticação
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                login.getUsername(),
                login.getPassword()
            )
        );

        // Gera o token JWT
        String jwtToken = jwtService.generateToken(user);
        
        return jwtToken;
    }

}
