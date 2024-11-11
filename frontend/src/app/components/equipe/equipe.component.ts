import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Equipe, Participante } from '../../models/equipe/equipe.model';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss'],
})
export class EquipeComponent implements OnInit, OnDestroy {
  lista: Equipe[] = [];
  equipe: Equipe = new Equipe();
  equipeForm!: FormGroup;
  editMode: boolean = false;
  equipeSelecionada: Equipe | null = null;

  private navigationSubscription!: Subscription;
  constructor(
    private fb: FormBuilder,
    private equipeService: EquipeService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.equipeForm = this.fb.group({
      nomeEquipe: ['', Validators.required], // Nome da equipe
      idEquipe: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // ID da equipe (somente números)
      participantes: this.fb.array([this.criarParticipante()]), // FormArray para participantes
    });
  }

  ngOnInit(): void {
    this.listarEquipe();

    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        event.urlAfterRedirects === '/menu/equipe'
      ) {
        this.listarEquipe();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  listarEquipe(): void {
    this.equipeService.getEquipe().subscribe(
      (data) => {
        this.lista = data;
      },
      (error) => {
        console.error('Erro ao carregar equipes', error);
      }
    );
  }

  abrirModal(content: any, action: string, index?: number) {
    if (action === 'create') {
      this.editMode = false;
      this.equipeForm.reset();
    } else if (action === 'edit' && index !== undefined) {
      this.editMode = true;
      this.equipeSelecionada = this.lista[index];
      this.setEquipeData();
    }
    this.modalService.open(content, { size: 'xl' });
  }

  setEquipeData() {
    if (this.equipeSelecionada) {
      this.equipeForm.patchValue({
        nomeEquipe: this.equipeSelecionada.nome,
      });

      // Preenche o FormArray de participantes com os dados da equipe selecionada
      this.equipeSelecionada.participantes.forEach((participantes, index) => {
        if (index > 0) {
          this.adicionarParticipante(); // Adiciona participantes extras, se necessário
        }
        this.participantes.at(index).patchValue({
          nome: participantes.nome,
          id: participantes.id,
        });
      });
    }
  }

  // Método para criar um novo participante no FormArray
  criarParticipante(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required], // Nome do participante
      id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // ID do participante
    });
  }

  get participantes(): FormArray {
    return this.equipeForm.get('participantes') as FormArray;
  }

  adicionarParticipante(): void {
    if (this.participantes.length < 4) {
      this.participantes.push(this.criarParticipante());
    }
  }

  removerParticipante(index: number): void {
    if (this.participantes.length > 1) {
      this.participantes.removeAt(index);
    }
  }

  // Método para submeter o formulário de criação ou edição
  onSubmit(): void {
    if (this.equipeForm.invalid) {
      this.equipeForm.markAllAsTouched();
      return;
    }

    const equipeData = this.equipeForm.value;

    // Transformando os participantes para o modelo esperado
    const participantes: Participante[] = equipeData.participantes.map(
      (participante: any) => {
        return new Participante(participante.id, participante.nome);
      }
    );

    if (this.editMode && this.equipeSelecionada && this.equipeSelecionada.id) {
      // Atualização de uma equipe existente
      const equipeAtualizada: Equipe = {
        id: this.equipeSelecionada.id,
        nome: equipeData.nomeEquipe,
        participantes: participantes, // Atualizado para o modelo correto
      };

      this.equipeService.atualizarEquipe(equipeAtualizada).subscribe(
        (data: any) => {
          console.log('Equipe atualizada com sucesso:', data);
          this.listarEquipe(); // Recarrega a lista de equipes
        },
        (error: any) => {
          console.error('Erro ao atualizar equipe:', error);
        }
      );
    } else {
      // Criação de uma nova equipe
      const novaEquipe: Equipe = {
        nome: equipeData.nomeEquipe,
        participantes: participantes, // Atualizado para o modelo correto
      };

      this.equipeService.SalvarEquipe(novaEquipe).subscribe(
        (data: any) => {
          console.log('Equipe salva com sucesso:', data);
          this.listarEquipe(); // Recarrega a lista de equipes
        },
        (error: any) => {
          console.error('Erro ao salvar equipe:', error);
        }
      );
    }
  }
}
