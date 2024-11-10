import { Component } from '@angular/core';
import { Campeonato } from '../../models/campeonato/campeonato';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../layout/menu/menu.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-campeonato',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campeonato.component.html',
  styleUrl: './campeonato.component.scss',
})
export class CampeonatoComponent {
  lista: Campeonato[] = [];

  constructor(
    private modalService: NgbModal
  ) {
    let campeonato: Campeonato = new Campeonato();
    campeonato.id = 1;
    campeonato.nome = 'Cs';
    campeonato.campeonato = 'Cs';

    let campeonato2: Campeonato = new Campeonato();
    campeonato.id = 2;
    campeonato.nome = 'Valorant';
    campeonato.campeonato = 'Cs';

    let campeonato3: Campeonato = new Campeonato();
    campeonato.id = 3;
    campeonato.nome = 'Rainbowsix';
    campeonato.campeonato = 'Cs';

    let campeonato4: Campeonato = new Campeonato();
    campeonato.id = 4;
    campeonato.nome = 'Vavas';
    campeonato.campeonato = 'TESTESTES';

    let campeonato5: Campeonato = new Campeonato();
    campeonato.id = 5;
    campeonato.nome = 'Fila';
    campeonato.campeonato = 'TESTESTES';

    this.lista.push(campeonato);
    this.lista.push(campeonato2);
    this.lista.push(campeonato3);
    this.lista.push(campeonato4);
    this.lista.push(campeonato5);
  }

  abrirModal(content: any) {
    this.modalService.open(content, {size: 'xl'});
  }
}
