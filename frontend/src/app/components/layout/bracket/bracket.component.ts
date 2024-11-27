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
    { pos: '1º', name: 'UNIAMÉRICA', points: 12 },
    { pos: '2º', name: 'MEDICINA UPE FRANCO', points: 9 },
    { pos: '3º', name: 'ENG & ARQ UDC', points: 7 },
    { pos: '4º', name: 'MEDICINA UPE CDE', points: 5 },
    { pos: '5º', name: 'HUMANIDADES UNILA', points: 4 },
    { pos: '6º', name: 'UNIGUAÇU', points: 3 },
    { pos: '7º', name: 'ENG & ARQ UNILA', points: 2 },
    { pos: '8º', name: 'UTFPR-MD', points: 1 },
    { pos: '9º', name: 'MEDICINA UNILA', points: 0 },
    { pos: '10º', name: 'MEDICINA UNINTER', points: 0 }
    // Adicione mais dados conforme necessário
  ];

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
