import { DrawGame } from "../../Utility/DrawGame.js";

var gioco3 = new DrawGame({
    piece_position: {
        "A1": "Knight.svg",
    },
    caselle_corrette: ["B3", "C2", "C8", "B7", "H7", "G8", "G2", "H3"]
})

export { gioco3 };