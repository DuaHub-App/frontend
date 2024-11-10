import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { CampeonatoComponent } from '../../campeonato/campeonato.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, MenuComponent, RouterOutlet, CampeonatoComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
