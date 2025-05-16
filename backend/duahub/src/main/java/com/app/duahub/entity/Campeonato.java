package com.app.duahub.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "campeonatos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Campeonato {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nome;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "data_campeonato_id", referencedColumnName = "id")
	private DataCampeonato dataCampeonato;

	@Enumerated(EnumType.STRING)
	private StatusCampeonato status;

	@OneToMany
	@JoinColumn(name = "campeonato_id")
	private List<Partida> partidas;

	@OneToMany(mappedBy = "campeonato", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Equipe> equipes;

	private Integer numeroEquipesPermitidas;

	private Integer numeroEquipesExistentes;

	@OneToOne
	@JoinColumn(name = "campeao_id")
	private Equipe campeao;
}
