package com.app.duahub.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.duahub.entity.Equipe;
import com.app.duahub.repository.EquipeRepository;
import com.app.duahub.service.EquipeService;

@RestController
@RequestMapping("/equipes")
@CrossOrigin(origins = "*")
public class EquipeController {

	@Autowired
	private EquipeRepository equipeRepository;

	@Autowired
	private EquipeService equipeService;

	@PostMapping
	public ResponseEntity<String> save(@RequestBody Equipe equipe) {
		try {
			String message = this.equipeService.save(equipe);
			return new ResponseEntity<>(message, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> update(@RequestBody Equipe equipe,@PathVariable Long id) {

		try {
			String message = this.equipeService.update(equipe, id);
			return new ResponseEntity<>(message, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable Long id) {
		try {
			String message = this.equipeService.delete(id);
			return new ResponseEntity<>(message, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping
	public ResponseEntity<List<Equipe>> findAll(){
		try {
			List<Equipe> list = this.equipeService.findAll();
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Equipe> findById(@PathVariable Long id) {
		try {
			Equipe equipe = this.equipeService.findById(id);
			return new ResponseEntity<>(equipe, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}



}
