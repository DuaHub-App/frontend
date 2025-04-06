import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { MenuCampeonatoComponent } from "../menu-campeonato/menu-campeonato.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ,MenuCampeonatoComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
