export class Campeonato {
    id?: number;
    nome: string = '';
    participante: string = '';
    campeonato: string = '';

    constructor(
    nome: string = '',
    participante: string = '',
    campeonato: string = '',
    ) {
        this.nome = nome;
        this.participante = participante;
        this.campeonato = campeonato;
}
}