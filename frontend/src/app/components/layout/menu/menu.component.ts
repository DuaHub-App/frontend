import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

@Component({
  selector: 'app-menu',
  standalone: true, // Certifica que o componente pode ser usado diretamente
  imports: [MdbCollapseModule], // Importando o módulo de collapse do MDB
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  isSidebarHidden = true; // Sidebar oculta por padrão

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden; // Alterna visibilidade
  }

  sair() {
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }

  navegarEntreRotas(rota: string) {
    this.router.navigate([`/menu/${rota}`]); // Navega entre rotas específicas
  }
}
