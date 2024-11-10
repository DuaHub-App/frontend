import { Component, inject, OnInit } from '@angular/core';
import { MenuComponent } from '../layout/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { Equipe } from '../../models/equipe/equipe.model';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipeService } from '../../service/equipe.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './equipe.component.html',
  styleUrl: './equipe.component.scss',
})
export class EquipeComponent implements OnInit {
  lista: Equipe[] = [];

  private fb = inject(FormBuilder); // Injeção do FormBuilder
  equipeForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private equipeService: EquipeService
  ) {
    this.equipeForm = this.fb.group({
      nomeEquipe: ['', Validators.required], // Nome da equipe
      idEquipe: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // ID da equipe (somente números)
      participantes: this.fb.array([
        // FormArray para participantes
        this.criarParticipante(), // Criação do primeiro participante
      ]),
    });
  }
  ngOnInit(): void {
    this.listarEquipe();
  }

  abrirModal(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  listarEquipe(): void {
    this.equipeService.getEquipe().subscribe(
      (data) => {
        this.lista = data;
      },
      (error) => {
        console.error('Erro ao carregar equipe', error);
      }
    );
  }

  criarParticipante(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required], // Nome do participante
      id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // ID do participante (somente números)
    });
  }
  // Getter para acessar o FormArray de participantes
  get participantes(): FormArray {
    return this.equipeForm.get('participantes') as FormArray;
  }
  // Função para adicionar mais participantes
  adicionarParticipante(): void {
    if (this.participantes.length < 4) {
      this.participantes.push(this.criarParticipante());
    }
  }
  // Função para remover um participante
  removerParticipante(index: number): void {
    if (this.participantes.length > 1) {
      this.participantes.removeAt(index);
    }
  }
  // Função para submeter o formulário
  onSubmit(): void {
    if (this.equipeForm.valid) {
      console.log(this.equipeForm.value);
    } else {
      console.log('Formulário inválido');
    }
  }

  salvarCliente(cliente: any) {
    this.funcionarioService.SalvarClienteReq(cliente).subscribe(
      (data) => {
        this.novoCliente = data;
        this.carregarClientes();
        console.log("Cliente salvo com sucesso:", this.novoCliente);
      },
      (error) => {
        console.error("Erro ao salvar cliente:", error);
      }
    );
  }

}
