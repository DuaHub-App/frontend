import { Component } from '@angular/core';
import { MenuComponent } from '../layout/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { Equipe } from '../../models/equipe/equipe';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipe.component.html',
  styleUrl: './equipe.component.scss'
})
export class EquipeComponent {
  lista: Equipe[] = [];

  constructor(   private modalService: NgbModal
  ) {
    

    let equipe: Equipe = new Equipe();
    equipe.id = 1;
    equipe.nome = 'cava';
    equipe.participantes = 'joao';

    let equipe2: Equipe = new Equipe();
    equipe.id = 2;
    equipe.nome = 'Vala';
    equipe.participantes = 'felipe';

    let equipe3: Equipe = new Equipe();
    equipe.id = 3;
    equipe.nome = 'safad';
    equipe.participantes = 'gabriel';

    let equipe4: Equipe = new Equipe();
    equipe.id = 4;
    equipe.nome = 'Vavas';
    equipe.participantes = 'henrique';

    let equipe5: Equipe = new Equipe();
    equipe.id = 5;
    equipe.nome = 'Fila';
    equipe.participantes = 'guilherme';

    this.lista.push(equipe);
    this.lista.push(equipe);
    this.lista.push(equipe);
    this.lista.push(equipe);
    this.lista.push(equipe);
  }

  abrirModal(content: any) {
    this.modalService.open(content, {size: 'xl'});
  }
}
