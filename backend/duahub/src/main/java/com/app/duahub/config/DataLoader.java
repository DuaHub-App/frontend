package com.app.duahub.config;


import com.app.duahub.auth.LoginRepository;

import com.app.duahub.auth.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        Usuario usuario = loginRepository.findById(1L).orElseGet(() -> {
            Usuario user = new Usuario();
            user.setUsername("admin");
            user.setPassword("$2a$12$Cj191eTSPvIe0bZPiH.fRuu8c3DefPAABctQ93JIYt9wUJ1slhlGC");
            user.setRole("ADMIN");
            return loginRepository.save(user);
        });
    }
}