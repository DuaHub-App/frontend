import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { CampeonatoService } from '../../service/campeonato.service';
import { EquipeService } from '../../service/equipe.service';
import { Campeonato, StatusCampeonato } from '../../models/campeonato/campeonato';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campeonato',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.scss'],
})
export class CampeonatoComponent implements OnInit, OnDestroy {
  lista: Campeonato[] = [];
  campeonatoSelecionado!: Campeonato;
  editMode = false;
  statusOptions = Object.values(StatusCampeonato);
  navigationSubscription!: Subscription;

  campeonatoForm!: FormGroup;
  formCreate!: FormGroup;
  equipesForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private campeonatoService: CampeonatoService,
    private equipeService: EquipeService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    this.listarCampeonatos();
    this.setupNavigation();
  }

  ngOnDestroy(): void {
    this.navigationSubscription?.unsubscribe();
  }

  private initForms(): void {
    this.campeonatoForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      dataCampeonato: this.fb.group({
        data: ['', Validators.required],
        horaInicio: ['', Validators.required],
        horaFim: ['', Validators.required]
      }),
      status: [StatusCampeonato.PENDENTE, Validators.required]
    });

    this.formCreate = this.fb.group({
      nome: ['', Validators.required],
      dataCampeonato: this.fb.group({
        data: ['', Validators.required],
        horaInicio: ['', Validators.required],
        horaFim: ['', Validators.required]
      }),
      status: [StatusCampeonato.PENDENTE, Validators.required]
    });

    this.equipesForm = this.fb.group({
      equipes: this.fb.array([])
    });
  }

  private setupNavigation(): void {
    this.navigationSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/menu/campeonato') {
        this.listarCampeonatos();
      }
    });
  }

  private criarEquipeFormGroup(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      participantes: this.fb.array([
        this.criarParticipanteFormGroup()
      ], [Validators.minLength(1), Validators.maxLength(4)])
    });
  }

  private criarParticipanteFormGroup(): FormGroup {
    return this.fb.group({ nome: ['', Validators.required] });
  }

  get equipesArray(): FormArray {
    return this.equipesForm.get('equipes') as FormArray;
  }

  adicionarEquipe(): void {
    this.equipesArray.push(this.criarEquipeFormGroup());
  }

  removerEquipe(index: number): void {
    if (this.equipesArray.length > 1) {
      this.equipesArray.removeAt(index);
    }
  }

  adicionarParticipante(eIndex: number): void {
    const participantes = (this.equipesArray.at(eIndex).get('participantes') as FormArray);
    if (participantes.length < 4) {
      participantes.push(this.criarParticipanteFormGroup());
    }
  }

  removerParticipante(eIndex: number, pIndex: number): void {
    const participantes = (this.equipesArray.at(eIndex).get('participantes') as FormArray);
    if (participantes.length > 1) {
      participantes.removeAt(pIndex);
    }
  }

  salvarEquipes(): void {
    const payload = this.equipesArray.value.map((equipe: any) => ({
      nome: equipe.nome,
      participantes: equipe.participantes.map((p: any) => ({ nome: p.nome }))
    }));
    this.equipeService
      .salvarEquipesAoCampeonato(this.campeonatoSelecionado.id!, payload)
      .subscribe(() => this.listarCampeonatos());
  }

  abrirModal(
    template: any,
    action: 'create' | 'edit' | 'addEquipes',
    index?: number
  ): void {
    if (action === 'create') {
      this.editMode = false;
      this.formCreate.reset({ status: StatusCampeonato.PENDENTE });
      this.modalService.open(template, { size: 'xl' });

    } else if (action === 'edit' && index != null) {
      this.editMode = true;
      this.campeonatoSelecionado = this.lista[index];
      this.setCampeonatoData();
      this.modalService.open(template, { size: 'xl' });

    } else if (action === 'addEquipes' && index != null) {
      this.campeonatoSelecionado = this.lista[index];
      this.equipesForm = this.fb.group({
        equipes: this.fb.array([this.criarEquipeFormGroup()])
      });
      this.modalService.open(template, { size: 'lg' });
    }
  }

  private setCampeonatoData(): void {
    this.campeonatoForm.patchValue({
      id: this.campeonatoSelecionado.id,
      nome: this.campeonatoSelecionado.nome,
      status: this.campeonatoSelecionado.status,
      dataCampeonato: this.campeonatoSelecionado.dataCampeonato!
    });
  }

  // listarCampeonatos(): void {
  //   this.campeonatoService.getCampeonatos().subscribe(data => (this.lista = data));
  // }

  listarCampeonatos(): void {
    this.campeonatoService.getCampeonatos().subscribe(
      (data) => {
        this.lista = data;
      },
      (error) => {
        console.error('Erro ao carregar equipes', error);
      }
    );
  }


  // Métodos de submit para criação e edição
  onSubmitCreate(): void {
    if (this.formCreate.invalid) {
      this.formCreate.markAllAsTouched();
      return;
    }
    const formValue = this.formCreate.value;
    const novoCampeonato: Campeonato = {
      nome: formValue.nome,
      status: formValue.status,
      dataCampeonato: {
        data: formValue.dataCampeonato.data,
        horaInicio: formValue.dataCampeonato.horaInicio,
        horaFim: formValue.dataCampeonato.horaFim
      },
      equipes: [],
      partidas: []
    };
    this.campeonatoService.salvarCampeonato(novoCampeonato).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.listarCampeonatos();
      },
      error: err => console.error('Erro ao salvar campeonato:', err)
    });
  }

  onSubmit(): void {
    if (this.campeonatoForm.invalid) {
      this.campeonatoForm.markAllAsTouched();
      return;
    }
    const formValue = this.campeonatoForm.value;
    const campeonatoAtualizado: Campeonato = {
      id: formValue.id,
      nome: formValue.nome,
      status: formValue.status,
      dataCampeonato: {
        data: formValue.dataCampeonato.data,
        horaInicio: formValue.dataCampeonato.horaInicio,
        horaFim: formValue.dataCampeonato.horaFim
      },
      equipes: this.campeonatoSelecionado?.equipes || [],
      partidas: this.campeonatoSelecionado?.partidas || []
    };
    this.campeonatoService.atualizarCampeonato(campeonatoAtualizado).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.listarCampeonatos();
      },
      error: err => console.error('Erro ao atualizar campeonato:', err)
    });
  }

  // Adicione este método no seu componente para retornar o FormArray de participantes:
  getParticipantes(eIndex: number): FormArray {
    return (this.equipesForm.get('equipes') as FormArray)
      .at(eIndex)
      .get('participantes') as FormArray;
  }
}