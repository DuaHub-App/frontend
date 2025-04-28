package com.app.duahub.entity;

import java.util.List;

import com.app.duahub.service.CampeonatoService.StatusCampeonato;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "campeonatos")
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
	private List<Equipe> equipes;

	// NOVOS ATRIBUTOS
	private Integer numeroEquipesPermitidas; // limite de equipes, null = sem limite

	private Integer numeroEquipesExistentes; // número atual de equipes

	@OneToOne
	@JoinColumn(name = "campeao_id")
	private Equipe campeao; // equipe campeã
}
