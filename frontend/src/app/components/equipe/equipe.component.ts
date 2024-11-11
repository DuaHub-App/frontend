import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Equipe } from '../../models/equipe/equipe.model';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipeService } from '../../service/equipe.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss'],
})

export class EquipeComponent implements OnInit, OnDestroy {
  lista: Equipe[] = [];  // Lista de equipes
  equipe: Equipe = new Equipe;
  equipeForm!: FormGroup; // Formulário de equipe
  editMode: boolean = false; // Flag de modo de edição
  equipeSelecionada: Equipe | null = null; // Equipe selecionada para edição
  private navigationSubscription!: Subscription; // Assinatura de navegação

  constructor(
    private fb: FormBuilder,
    private equipeService: EquipeService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Inicialização do formulário
    this.equipeForm = this.fb.group({
      nomeEquipe: ['', Validators.required],  // Nome da equipe
      idEquipe: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // ID da equipe (somente números)
      participantes: this.fb.array([this.criarParticipante()])  // FormArray para participantes
    });
  }

  ngOnInit(): void {
    this.listarEquipe();

    // Assinar evento de navegação para recarregar as equipes ao voltar para esta página
    this.navigationSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/menu/equipe') {
        this.listarEquipe();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  // Método para listar as equipes
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

  // Método para abrir o modal (criação ou edição)
  abrirModal(content: any, action: string, index?: number) {
    if (action === 'create') {
      this.editMode = false;
      this.equipeForm.reset(); // Reseta o formulário de criação
    } else if (action === 'edit' && index !== undefined) {
      this.editMode = true;
      this.equipeSelecionada = this.lista[index]; // Define a equipe a ser editada
      this.setEquipeData(); // Preenche o formulário de edição com os dados da equipe selecionada
    }
    this.modalService.open(content, { size: 'xl' });
  } 

  // Preenche os campos do formulário de edição com os dados da equipe selecionada
  setEquipeData() {
    if (this.equipeSelecionada) {
      this.equipeForm.patchValue({
        nomeEquipe: this.equipeSelecionada.nome,
      });

      // Preenche o FormArray de participantes com os dados da equipe selecionada
      this.equipeSelecionada.participante.forEach((participante, index) => {
        if (index > 0) {
          this.adicionarParticipante(); // Adiciona participantes extras, se necessário
        }
        this.participantes.at(index).patchValue({
          nome: participante.nome,
          id: participante.id
        });
      });
    }
  }

  // Método para criar um novo participante no FormArray
  criarParticipante(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],  // Nome do participante
      id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]  // ID do participante
    });
  }

  // Getter para acessar o FormArray de participantes
  get participantes(): FormArray {
    return this.equipeForm.get('participantes') as FormArray;
  }

  // Método para adicionar mais participantes no formulário
  adicionarParticipante(): void {
    if (this.participantes.length < 4) {  // Limite de participantes (exemplo: 4)
      this.participantes.push(this.criarParticipante());
    }
  }

  // Método para remover um participante
  removerParticipante(index: number): void {
    if (this.participantes.length > 1) {  // Ao menos um participante deve estar presente
      this.participantes.removeAt(index);
    }
  }

  // Método para submeter o formulário de criação ou edição
  // onSubmit(): void {
  //   if (this.equipeForm.invalid) {
  //     this.equipeForm.markAllAsTouched(); // Marca todos os campos como tocados para mostrar as mensagens de erro
  //     return;
  //   }

  //   const equipeData = this.equipeForm.value;

  //   if (this.editMode && this.equipeSelecionada && this.equipeSelecionada.id) {
  //     // Atualização de uma equipe existente
  //     const equipeAtualizada: Equipe = {
  //       id: this.equipeSelecionada.id,
  //       nome: equipeData.nomeEquipe,
  //       participante: equipeData.participantes,
  //       equipe: ''
  //     };

  //     this.equipeService.atualizarEquipe(equipeAtualizada).subscribe(
  //       (data: any) => {
  //         console.log("Equipe atualizada com sucesso:", data);
  //         this.listarEquipe(); // Recarrega a lista de equipes
  //       },
  //       (error: any) => {
  //         console.error("Erro ao atualizar equipe:", error);
  //       }
  //     );
  //   } else {
  //     // Criação de uma nova equipe
  //     const novaEquipe: Equipe = {
  //       nome: equipeData.nomeEquipe,
  //       participante: equipeData.participantes,
  //       equipe: ''
  //     };

  //     this.equipeService.SalvarEquipe(novaEquipe).subscribe(
  //       (data: any) => {
  //         console.log("Equipe salva com sucesso:", data);
  //         this.listarEquipe(); // Recarrega a lista de equipes
  //       },
  //       (error: any) => {
  //         console.error("Erro ao salvar equipe:", error);
  //       }
  //     );
  //   }
  // }

  // Método para deletar uma equipe
  // deletarEquipe(id: number | undefined) {
  //   if (id !== undefined) {
  //     this.equipeService.deletarEquipe(id).subscribe(
  //       (response: any) => {
  //         console.log("Equipe deletada", response);
  //         this.listarEquipe(); // Recarrega a lista de equipes
  //       },
  //       (error: any) => {
  //         console.error("Erro ao deletar equipe", error);
  //       }
  //     );
  //   }
  // }
}
