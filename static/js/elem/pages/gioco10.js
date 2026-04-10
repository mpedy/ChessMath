import { DrawGame } from "../../Utility/DrawGame.js";

var gioco10 = new DrawGame({
    piece_position: { "D5": "Bishop.svg" },
    caselle_corrette: ["C4", "C6", "E4", "E6"],
    with_timer: true,
    title: "Disegna tutte le caselle a distanza 1 dall'Alfiere",
    time: 60,
    name: "G Alfiere cfr 1"
})

export { gioco10 };