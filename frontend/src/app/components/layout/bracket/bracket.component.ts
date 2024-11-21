import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bracket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss'],
})
export class BracketComponent {
  // Brackets do torneio: 4 de cada lado, totalizando 8 times
  leftBracket = [
    { team1: 'Equipe A', team2: 'Equipe B' },
    { team1: 'Equipe C', team2: 'Equipe D' },
    { team1: 'Equipe E', team2: 'Equipe F' },
    { team1: 'Equipe G', team2: 'Equipe H' },
  ];

  rightBracket = [
    { team1: 'Equipe I', team2: 'Equipe J' },
    { team1: 'Equipe K', team2: 'Equipe L' },
    { team1: 'Equipe M', team2: 'Equipe N' },
    { team1: 'Equipe O', team2: 'Equipe P' },
  ];

  quartas: { team1: string; team2: string }[] = [];
  semi: { team1: string; team2: string }[] = [];
  final: { team1: string; team2: string } = { team1: '', team2: '' };

  // Função para selecionar uma equipe vencedora
  selectTeam(team: string) {
    console.log(`Vencedor selecionado: ${team}`);

    // Simula o avanço do time na próxima fase
    this.advanceToNextRound(team);
  }

  // Função para avançar para a próxima rodada
  advanceToNextRound(team: string) {
    if (this.leftBracket.length > 0) {
      // Passa a equipe selecionada para as quartas de final
      this.quartas.push({ team1: team, team2: '' });
      this.leftBracket = this.leftBracket.filter(
        (match) => match.team1 !== team && match.team2 !== team
      );
    }

    if (this.rightBracket.length > 0) {
      // Passa a equipe selecionada para as quartas de final
      this.quartas.push({ team1: team, team2: '' });
      this.rightBracket = this.rightBracket.filter(
        (match) => match.team1 !== team && match.team2 !== team
      );
    }

    if (this.quartas.length > 0) {
      // Passa a equipe selecionada para as semifinais
      this.semi.push({ team1: team, team2: '' });
      this.quartas = this.quartas.filter(
        (match) => match.team1 !== team && match.team2 !== team
      );
    }

    if (this.semi.length > 0) {
      // Passa a equipe selecionada para a final
      this.final.team1 = team;
      this.semi = this.semi.filter(
        (match) => match.team1 !== team && match.team2 !== team
      );
    }
  }
}
