export class PieceClass {
    constructor(tipo, casella, immagine) {
        this.tipo = tipo;
        this.casella = casella;
        this.immagine = immagine;
        this._casella = casella;
        this.possible_moves = new Array();
        this.selected = false
    }
}