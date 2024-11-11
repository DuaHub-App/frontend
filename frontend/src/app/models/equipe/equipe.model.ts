export class Equipe {
  id?: number;
  nome: string = '';
  participantes: Participante[] = [];

  constructor(
    nome: string = '',
    participantes: Participante[] = [] 
  ) {
    this.nome = nome;
    this.participantes = participantes;
  }
}

export class Participante {
  id?: number;
  nome: string = '';

  constructor(id?: number, nome: string = '') {
    this.id = id;
    this.nome = nome;
  }
}