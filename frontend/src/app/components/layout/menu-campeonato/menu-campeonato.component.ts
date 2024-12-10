import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

@Component({
  selector: 'app-menu-campeonato',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './menu-campeonato.component.html',
  styleUrl: './menu-campeonato.component.scss',
})
export class MenuCampeonatoComponent {
  constructor(private router: Router) {}

  sair() {
    this.router.navigate(['/login']);
  }

  navegarEntreRotas(rota: string) {
    this.router.navigate([`/menu/${rota}`]);
  }
}
