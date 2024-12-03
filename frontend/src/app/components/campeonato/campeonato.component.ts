import { Component, inject, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterModule } from '@angular/router';
import { Campeonato, Equipe } from '../../models/campeonato/campeonato';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CampeonatoService } from '../../service/campeonato.service';
import { 
  FormArray, 
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MenuCampeonatoComponent } from '../layout/menu-campeonato/menu-campeonato.component';
import { QualiferCampeonatoComponent } from '../layout/qualifer-campeonato/qualifer-campeonato.component';
import { BracketComponent } from '../layout/bracket/bracket.component';
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'app-campeonato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuCampeonatoComponent, QualiferCampeonatoComponent, BracketComponent, RouterModule],
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.scss'],
})
export class CampeonatoComponent implements OnInit, OnDestroy {
  lista: Campeonato[] = [];
  campeonato: Campeonato = new Campeonato();
  campeonatoForm!: FormGroup;
  formCreate!: FormGroup;
  editMode: boolean = false;
  campeonatoSelecionado: Campeonato | null = null;

  inject: LoginService = inject(LoginService);

  private navigationSubscription!: Subscription;
  constructor(
    private fb: FormBuilder,
    private campeonatoService: CampeonatoService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.campeonatoForm = this.fb.group({
      nomeCampeonato: ['', Validators.required],  
      idCampeonato: ['', Validators.required, Validators.pattern('^[0-9]*$')],
      equipes: this.fb.array([this.criarEquipe()]), 
    });
  }

  tabela() {
    this.router.navigate(['/home/tabela']); 
  }

  ngOnInit(): void {
    this.listarCampeonatos();

    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        event.urlAfterRedirects === '/menu/campeonato'
      ) {
        this.listarCampeonatos();
      }
    });

    this.formCreate = this.fb.group({
      nomeCampeonato: ['', Validators.required],
      equipes: this.fb.array([this.criarEquipe()]),
    });
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  listarCampeonatos(): void {
    this.campeonatoService.getCampeonatos().subscribe(
      (data) => {
        this.lista = data;
      },
      (error) => {
        console.error('Erro ao carregar campeonatos', error);
      }
    );
  }

  abrirModal(content: any, action: string, index?: number) {
    if (action === 'create') {
      this.editMode = false;
      this.campeonatoForm.reset();
    } else if (action === 'edit' && index !== undefined) {
      this.editMode = true;
      this.campeonatoSelecionado = this.lista[index];
      this.setCampeonatoData();
    }
    this.modalService.open(content, { size: 'xl' });
  }

  setCampeonatoData() {
    if (this.campeonatoSelecionado) {
      this.campeonatoForm.patchValue({
        idCampeonato: this.campeonatoSelecionado.id,
        nomeCampeonato: this.campeonatoSelecionado.nome,
      });

      this.campeonatoSelecionado.equipe.forEach((equipe, index) => {
        if (index > 0) {
          this.adicionarEquipe();
        }
        this.equipes.at(index).patchValue({
          nome: equipe.nome,
          id: equipe.id,
        });
      });
    }
  }

  criarEquipe(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      id: [null],
    });
  }

  get equipes(): FormArray {
    return this.formCreate.get('equipes') as FormArray;
  }

  adicionarEquipe(): void {
    this.equipes.push(this.criarEquipe());
  }

  removerEquipe(index: number): void {
    this.equipes.removeAt(index);
  }

  salvarCampeonato(campeonato: Campeonato) {
    this.campeonatoService.salvarCampeonato(campeonato).subscribe(
      (data) => {
        console.log('Campeonato salvo com sucesso:', data);
        this.listarCampeonatos();
      },
      (error) => {
        console.error('Erro ao salvar campeonato:', error);
      }
    );
  }

  atualizarCampeonato(campeonato: Campeonato) {
    this.campeonatoService.atualizarCampeonato(campeonato).subscribe(
      (data) => {
        console.log('Campeonato atualizado com sucesso:', data);
        this.listarCampeonatos();
      },
      (error) => {
        console.error('Erro ao atualizar campeonato:', error);
      }
    );
  }

  onSubmitCreate(): void {
    if (this.formCreate.invalid) {
      this.formCreate.markAllAsTouched();
      return;
    }

    const formData = this.formCreate.value;

    const equipes: Equipe[] = formData.equipes.map(
      (equipe: any) => 
        new Equipe(equipe.id, equipe.nome)
    );
     
    const novoCampeonato = new Campeonato(formData.nomeCampeonato, equipes);

    this.salvarCampeonato(novoCampeonato);
  }

  onSubmit(): void {

    if (this.campeonatoForm.invalid) {
      this.campeonatoForm.markAllAsTouched();
      return;
    }

    const campeonatoData = this.campeonatoForm.value;

    const equipes: Equipe[] = campeonatoData.equipes.map(
      (equipe: any) => 
        new Equipe(equipe.id, equipe.nome)
    );

    if (this.editMode && this.campeonatoSelecionado && this.campeonatoSelecionado.id) {
      const campeonatoAtualizado: Campeonato = {
        id: this.campeonatoSelecionado.id,
        nome: campeonatoData.nomeCampeonato,
        campeonato: campeonatoData.campeonato,
        equipe: equipes,
      };

      this.atualizarCampeonato(campeonatoAtualizado);
    } else {
      const novoCampeonato: Campeonato = {
        nome: campeonatoData.nomeCampeonato,
        campeonato: campeonatoData.campeonato,
        equipe: equipes,
      };

      this.salvarCampeonato(novoCampeonato);
    }
  }
}
