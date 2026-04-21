class PieceClass {
    constructor(tipo, casella, immagine, colore="white") {
        this.tipo = tipo;
        this.casella = casella;
        this._casella = casella; // Salva la posizione iniziale per poterla resettare
        this.immagine = immagine;
        this.colore = colore;
        this.possible_moves = new Array();
        this.selected = false
    }
    reset() {
        this.casella = this._casella;
        this.selected = false;
    }
}

export { PieceClass };