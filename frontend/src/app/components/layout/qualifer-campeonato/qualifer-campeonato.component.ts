import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-qualifer-campeonato',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qualifer-campeonato.component.html',
  styleUrl: './qualifer-campeonato.component.scss'
})
export class QualiferCampeonatoComponent {

  playoffMessage(modalidade: string) {
    alert(`Playoffs da modalidade: ${modalidade}`);
  }  

  modalidades = [
    {
      icon: '/assets/images/easy/1.svg',
      modalidade: '1º Período',
      tipo: 'Turma A',
      atleticas: 10,
      campeao: 'UNIAMÉRICA'
    },
    {
      icon: '/assets/images/easy/2.svg',
      modalidade: '1º Período',
      tipo: 'Turma B',
      atleticas: 14,
      campeao: 'UNIAMÉRICA'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma C',
      atleticas: 15,
      campeao: 'EXATAS UTFPR-MD',
      icon: '/assets/images/easy/3.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma D',
      atleticas: 15,
      campeao: 'UNIGUAÇU',
      icon: '/assets/images/easy/4.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma E',
      atleticas: 14,
      campeao: 'UNIGUAÇU',
      icon: '/assets/images/easy/5.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma F',
      atleticas: 14,
      campeao: 'UNIGUAÇU',
      icon: '/assets/images/easy/6.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma G',
      atleticas: 10,
      campeao: 'UNIGUAÇU',
      icon: '/assets/images/easy/7.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma H',
      atleticas: 14,
      campeao: 'UNIAMÉRICA',
      icon: '/assets/images/easy/8.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma I',
      atleticas: 14,
      campeao: 'UNIGUAÇU',
      icon: '/assets/images/easy/9.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma J',
      atleticas: 15,
      campeao: 'MEDICINA UPE CDE',
      icon: '/assets/images/easy/10.svg'
    },
    {
      modalidade: '1º Período',
      tipo: 'Turma K',
      atleticas: 14,
      campeao: 'ENG E ARQ UDC',
      icon: '/assets/images/easy/1.svg'
    }
  ];
}