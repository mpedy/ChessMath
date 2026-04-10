import { DrawGame } from "../../Utility/DrawGame.js";

var gioco6 = new DrawGame({
    piece_position: { "D5": "Rook.svg" },
    caselle_corrette: ["D3", "D7", "C4", "C6", "B5", "E4", "E6", "F5"],
    with_timer: true,
    title: "Segna tutte le caselle a distanza 2 dalla casella in cui si trova la Torre",
    time: 90,
    name: "G Torre cfr 2"
})

export { gioco6 };