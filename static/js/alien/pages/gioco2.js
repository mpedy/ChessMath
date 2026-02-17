import { DrawGame } from "../../Utility/DrawGame.js";

var gioco2 = new DrawGame({
    piece_position: {
        "G7": "Knight.svg",
    },
    caselle_corrette: [
        "E11", "G11", "I11",
        "D10", "F10", "H10", "J10",
        "C9", "G9", "K9",
        "D8", "F8", "H8", "J8",
        "C7", "E7", "G7", "I7", "K7",
        "D6", "F6", "H6", "J6",
        "C5", "G5", "K5",
        "D4", "F4", "H4", "J4",
        "E3", "G3", "I3"
    ],
    chessboard_dim: 12
})

export { gioco2 };