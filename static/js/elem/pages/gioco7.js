import { DrawGame } from "../../Utility/DrawGame.js";

var gioco7 = new DrawGame({
    piece_position: { "D5": "Bishop.svg", },
    caselle_corrette: ["A2", "A8", "B3", "B7", "C4", "C6", "E4", "E6", "F3", "F7", "G2", "G8", "H1"],
    with_timer: true,
})

export { gioco7 };