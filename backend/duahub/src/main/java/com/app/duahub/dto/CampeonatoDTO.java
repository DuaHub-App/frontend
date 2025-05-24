package com.app.duahub.dto;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class CampeonatoDTO {
    private Long id;
    private String nome;
    private String status;
    private int numeroEquipesPermitidas;
    private int numeroEquipesExistentes;
    private DataCampeonatoDTO dataCampeonato;
}
