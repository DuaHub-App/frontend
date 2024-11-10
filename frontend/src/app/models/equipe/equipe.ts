export class Equipe {
    id?: number;
    nome: string = '';
    equipe: string = '';
    participante: any[] = []

    constructor(
    nome: string = '',
    equipe: string = '',
    participante: any[] = []
    ) {
        this.nome = nome;
        this.equipe = equipe,
        this.participante = [] = []
}
}