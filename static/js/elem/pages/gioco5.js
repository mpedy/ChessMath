import { DrawGame } from "../../Utility/DrawGame.js";

var gioco5 = new DrawGame({
    piece_position: { "D5": "Rook.svg" },
    caselle_corrette: ["D6", "E5", "D4", "C5"],
    with_timer: true,
    title: "Segna tutte le caselle a distanza 1 dalla casella in cui si trova la Torre",
    time: 60
})

export { gioco5 };