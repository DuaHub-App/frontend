export class DataCampeonato {
  data?: string;         // LocalDate no formato ISO: "yyyy-MM-dd"
  horaInicio?: string;   // LocalTime no formato ISO: "HH:mm"
  horaFim?: string;      // LocalTime no formato ISO: "HH:mm"

  constructor(data?: string, horaInicio?: string, horaFim?: string) {
    this.data = data;
    this.horaInicio = horaInicio;
    this.horaFim = horaFim;
  }
}

export class Campeonato {
  id?: number;
  nome?: string;
  dataCampeonato?: DataCampeonato;
  status?: StatusCampeonato;
  partidas: any[] = [];  // Tipo pode ser refinado conforme necessidade
  equipes: Equipe[] = [];

  constructor(
    nome: string = '',
    dataCampeonato: DataCampeonato = new DataCampeonato(),
    status: StatusCampeonato = StatusCampeonato.PENDENTE,
    partidas: any[] = [],
    equipes: Equipe[] = [],
    id?: number
  ) {
    this.nome = nome;
    this.dataCampeonato = dataCampeonato;
    this.status = status;
    this.partidas = partidas;
    this.equipes = equipes;
    this.id = id;
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

export enum StatusCampeonato {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  FINALIZADO = 'FINALIZADO'
}