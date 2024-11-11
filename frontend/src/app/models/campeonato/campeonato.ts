export class Campeonato {
  id?: number;
  nome: string = '';
  equipe: Equipe[] = [];
  campeonato: string = '';

  constructor(
    nome: string = '',
    equipe: Equipe[] = [],
    campeonato: string = ''
  ) {
    this.nome = nome;
    this.equipe = equipe;
    this.campeonato = campeonato;
  }
}

export class Equipe {
  id?: number;
  nome: string = '';

  constructor(id?: number, nome: string = '') {
    this.id = id;
    this.nome = nome;
  }
}
