import { DrawGame } from "../../Utility/DrawGame.js";

var gioco6bis = new DrawGame({
    piece_position: {
        "D5": "Rook.svg",
    },
    caselle_corrette: ["D7","C6","D6","E6","B5","C5","D5","E5","F5","C4","D4","E4","D3"]
})

export { gioco6bis };