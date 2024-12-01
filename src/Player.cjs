class Player {
    constructor(nome) {
        this.nome = nome;
        this.punti = 0;
        this.websocket;
        this.uuid = -1;
    }
    json = () => {
        return { "nome": this.nome, "punti": this.punti }
    }
}

module.exports = {
    Player: Player
}