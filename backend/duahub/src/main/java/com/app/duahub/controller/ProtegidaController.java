package com.app.duahub.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProtegidaController {

    @GetMapping("/api/protegida")
    public String protegida() {
        return "Você acessou uma rota protegida com sucesso!";
    }

    @GetMapping("/public/aberta")
    public String aberta() {
        return "Rota pública sem autenticação.";
    }
}
