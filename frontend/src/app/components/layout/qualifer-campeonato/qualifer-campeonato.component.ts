import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-qualifer-campeonato',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './qualifer-campeonato.component.html',
  styleUrl: './qualifer-campeonato.component.scss'
})
export class QualiferCampeonatoComponent {

  constructor(private router: Router) {}

  playoff() {
    this.router.navigate(['/home/playoff']);
  }  

  modalidades = [
    {
      icon: '/assets/images/easy/1.svg',
      modalidade: '1º Período',
      tipo: 'Turma A',
      numEquipes: 10,
      campeao: 'UNIAMÉRICA'
    },
    {
      icon: '/assets/images/easy/2.svg',
      modalidade: '1º Período',
      tipo: 'Turma B',
      numEquipes: 14,
      campeao: 'UNIAMÉRICA'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma C',
      numEquipes: 15,
      campeao: 'EXATAS UTFPR-MD',
      icon: '/assets/images/easy/3.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma D',
      numEquipes: 15,
      campeao: 'UNIGUAÇU',
      icon: '/assets/images/easy/4.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma E',
      numEquipes: 14,
      campeao: 'UNIGUAÇU',
      icon: '/assets/images/easy/5.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma F',
      numEquipes: 14,
      campeao: 'UNIGUAÇU',
      icon: '/assets/images/easy/6.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma G',
      numEquipes: 10,
      campeao: 'UNIGUAÇU',
      icon: '/assets/images/easy/7.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma H',
      numEquipes: 14,
      campeao: 'UNIAMÉRICA',
      icon: '/assets/images/easy/8.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma I',
      numEquipes: 14,
      campeao: 'UNIGUAÇU',
      icon: '/assets/images/easy/9.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma J',
      numEquipes: 15,
      campeao: 'MEDICINA UPE CDE',
      icon: '/assets/images/easy/10.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma K',
      numEquipes: 14,
      campeao: 'ENG E ARQ UDC',
      icon: '/assets/images/easy/1.svg'
    }
  ];
}