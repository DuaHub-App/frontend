package com.app.duahub.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "partidas")
public class Partida {
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Enumerated(EnumType.STRING)
    private FasePartida fase;
	
	@ManyToOne
	@JoinColumn(name = "equipe1_id", nullable = false)
	private Equipe equipe1;
	
	@ManyToOne
	@JoinColumn(name = "equipe2_id", nullable = false)
	private Equipe equipe2;
	
	@ManyToOne
	@JoinColumn(name = "vencedor_id")
	private Equipe vencedor;
	
	@ManyToOne
	@JoinColumn(name = "campeonato_id", nullable = false)
	private Campeonato campeonato;
	
	 public enum FasePartida {
	        OITAVAS, QUARTAS, SEMIFINAL, FINAL;
	    }
}
