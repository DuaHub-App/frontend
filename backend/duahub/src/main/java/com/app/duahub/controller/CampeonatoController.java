package com.app.duahub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.duahub.entity.Campeonato;
import com.app.duahub.repository.CampeonatoRepository;
import com.app.duahub.service.CampeonatoService;

@RestController
@RequestMapping("/campeonatos")
@CrossOrigin(origins = "http://localhost:4200")
public class CampeonatoController {

	@Autowired
	private CampeonatoRepository campeonatoRepository; 

	@Autowired
	private CampeonatoService campeonatoService;

	@PostMapping
	public ResponseEntity<String> save(@RequestBody Campeonato campeonato) {
		try {
			String message = this.campeonatoService.save(campeonato);
			return new ResponseEntity<>(message, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> update(@RequestBody Campeonato campeonato,@PathVariable Long id) {

		try {
			String message = this.campeonatoService.update(campeonato, id);
			return new ResponseEntity<>(message, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable Long id) {
		try {
			String message = this.campeonatoService.delete(id);
			return new ResponseEntity<>(message, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping
	public ResponseEntity<List<Campeonato>> findAll(){
		try {
			List<Campeonato> list = this.campeonatoService.findAll();
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Campeonato> findById(@PathVariable Long id) {
		try {
			Campeonato campeonato = this.campeonatoService.findById(id);
			return new ResponseEntity<>(campeonato, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null , HttpStatus.BAD_REQUEST);
		}
	}


}
