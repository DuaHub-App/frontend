import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../layout/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { Equipe } from '../../models/equipe/equipe';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipeService } from '../../service/equipe.service';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipe.component.html',
  styleUrl: './equipe.component.scss',
})
export class EquipeComponent implements OnInit {
  lista: Equipe[] = [];

  constructor(
    private modalService: NgbModal,
    private equipeService: EquipeService
  ) {}
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
}
