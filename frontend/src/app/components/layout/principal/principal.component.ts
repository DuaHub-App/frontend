import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CampeonatoComponent } from '../../campeonato/campeonato.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit {
  isSidebarClosed = false;
  rotaAtual: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.rotaAtual =  this.router.url;
  }

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
  sair() {
    this.router.navigate(['/login']);
  }

  navegarEntreRotas(rota: string) {
    this.router.navigate([`/admin/${rota}`]);
    this.rotaAtual = `/${rota}`;
  }
}
