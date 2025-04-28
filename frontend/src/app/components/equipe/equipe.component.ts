import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
import { MenuComponent } from '../layout/menu/menu.component';
import { MenuCampeonatoComponent } from '../layout/menu-campeonato/menu-campeonato.component';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuCampeonatoComponent],
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss'],
})
export class EquipeComponent implements OnInit, OnDestroy {
  lista: Equipe[] = [];
  equipe: Equipe = new Equipe();
  equipeForm!: FormGroup;
  formCreate!: FormGroup;
  editMode: boolean = false;
  equipeSelecionada: Equipe | null = null;

  private navigationSubscription!: Subscription;
  constructor(
    private fb: FormBuilder,
    private equipeService: EquipeService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef

  ) {
    this.equipeForm = this.fb.group({
      nomeEquipe: ['', Validators.required], // Nome da equipe
      idEquipe: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      participantes: this.fb.array([this.criarParticipante()]),
    });
  }

    ngOnInit(): void {
      this.listarEquipe();

      this.navigationSubscription = this.router.events.subscribe((event) => {
        if (
          event instanceof NavigationEnd &&
          event.urlAfterRedirects === '/admin/inicio'
        ) {
          this.listarEquipe();
        }
      });

      this.formCreate = this.fb.group({
        nomeEquipe: ['', Validators.required],
        participantes: this.fb.array([this.criarParticipante()]),
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
        idEquipe: this.equipeSelecionada.id,
        nomeEquipe: this.equipeSelecionada.nome,
      });

      this.equipeSelecionada.participantes.forEach((participante, index) => {
        if (index > 0) {
          this.adicionarParticipante();
        }
        this.participantes.at(index).patchValue({
          nome: participante.nome,
          id: participante.id,
        });
      });
    }
  }

  criarParticipante(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      id: [null],
    });
  }

  get participantes(): FormArray {
    return this.formCreate.get('participantes') as FormArray;
  }

  adicionarParticipante(): void {
    this.participantes.push(this.criarParticipante());
  }

  removerParticipante(index: number): void {
    this.participantes.removeAt(index);
  }

  salvarEquipe(equipe: Equipe) {
    this.equipeService.SalvarEquipe(equipe).subscribe(
      (data) => {
        console.log('Equipe salva com sucesso:', data);
        this.listarEquipe();
      },
      (error) => {
        console.error('Erro ao salvar equipe:', error);
      }
    );
  }

  irParaAdmin(): void {
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/inicio']);
    });
  }

  atualizarEquipe(equipe: Equipe): void {
    this.equipeService.atualizarEquipe(equipe).subscribe(
      (data) => {
        this.listarEquipe();
        window.location.reload();
        this.irParaAdmin();
      },
      (error) => {
        console.error('Erro ao atualizar equipe:', error);
      }
    );
  }

  onSubmitCreate(): void {
    if (this.formCreate.invalid) {
      this.formCreate.markAllAsTouched();
      return;
    }

    const formData = this.formCreate.value;

    const participantes: Participante[] = formData.participantes.map(
      (participante: any) =>
        new Participante(participante.id, participante.nome)
    );

    const novaEquipe = new Equipe(formData.nomeEquipe, participantes);

    this.salvarEquipe(novaEquipe);
    this.irParaAdmin();
  }

  onSubmit(): void {
    if (this.equipeForm.invalid) {
      this.equipeForm.markAllAsTouched();
      return;
    }

    const equipeData = this.equipeForm.value;

    const participantes: Participante[] = equipeData.participantes.map(
      (participante: any) =>
        new Participante(participante.id, participante.nome)
    );

    if (this.editMode && this.equipeSelecionada && this.equipeSelecionada.id) {
      const equipeAtualizada: Equipe = {
        id: this.equipeSelecionada.id,
        nome: equipeData.nomeEquipe,
        participantes: participantes,
      };

      this.atualizarEquipe(equipeAtualizada);
    } else {
      const novaEquipe: Equipe = {
        nome: equipeData.nomeEquipe,
        participantes: participantes,
      };

      this.salvarEquipe(novaEquipe);
    }
  }
}
