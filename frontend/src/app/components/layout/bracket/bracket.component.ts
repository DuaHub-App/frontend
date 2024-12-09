import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-bracket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss'],
})
export class BracketComponent {
  isModalOpen: boolean = false;
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
    { pos: '10º', name: 'MEDICINA UNINTER', points: 0 },
  ];

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  /* PDF e JPG
  exportAsJPG(): void {
    const element = document.getElementById('elementId');
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'arquivo.jpg';
        link.click();
      });
    }
  }
  exportAsPDF(): void {
    const element = document.getElementById('elementId');
    if (element) {
      const pdf = new jsPDF();
      pdf.html(element, {
        callback: (doc) => {
          doc.save('arquivo.pdf');
        },
      });
    }
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.text("Seu conteúdo aqui!", 10, 10);
    doc.save("arquivo.pdf");
  }

  downloadImage() {
    console.log("Iniciando download de PDF...");
    const element = document.getElementById("bracket"); // ID do elemento HTML
    if (element) {
      html2canvas(element).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "bracket.png";
        link.click();
      });
    } else {
      console.error("Elemento HTML não encontrado!");
    }
  } 
  */
}
