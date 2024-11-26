import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bracket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss'],
})
export class BracketComponent {
  isModalOpen: boolean = false; // Controla a visibilidade do modal
  classificationData = [
    { name: 'URSO', points: 12 },
    { name: 'JAGUARES', points: 9 },
    { name: 'QUATI', points: 7 },
    { name: 'KORINGA', points: 5 },
    { name: 'DOSE LETAL', points: 4 },
    { name: 'TUCANOS', points: 3 },
    { name: 'CARPINCHO', points: 2 },
    { name: 'PORCO', points: 1 },
    { name: 'MEDUSA', points: 0 },
    { name: 'SOBERANA', points: 0 }
    // Adicione mais dados conforme necessário
  ];

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
