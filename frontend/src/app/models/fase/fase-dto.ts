import { Equipe } from "../equipe/equipe.model";

export class FaseDTO {
    equipe1: Equipe = new Equipe();  // Primeira equipe na fase
    equipe2: Equipe = new Equipe();  // Segunda equipe na fase
  
    constructor(equipe1: Equipe = new Equipe(), equipe2: Equipe = new Equipe()) {
      this.equipe1 = equipe1;
      this.equipe2 = equipe2;
    }
}
