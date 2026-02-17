import { DrawGame } from "../../Utility/DrawGame.js";

var gioco6 = new DrawGame({
    piece_position: {
        "D5": "Rook.svg",
    },
    caselle_corrette: ["D3", "D7", "C4", "C6", "B5", "E4", "E6", "F5"]
})

export { gioco6 };