package com.app.duahub.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class EquipeDTO {
    private String nome;
    private List<Long> participantesIds;
    private List<ParticipanteDTO> participantes; // somente se for necessário em outro contexto

}
