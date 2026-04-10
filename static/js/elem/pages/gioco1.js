import { DrawGame } from "../../Utility/DrawGame.js";

var gioco1 = new DrawGame({
    piece_position: { "D5": "Rook.svg" },
    caselle_corrette: ["C5", "B5", "A5", "E5", "F5", "G5", "H5", "D4", "D3", "D2", "D1", "D6", "D7", "D8"],
    with_timer: true,
    title: "Quali sono le caselle che la Torre può raggiungere in una mossa?",
    time: 60,
    name: "G Torre caselle 1 mossa"
})

export { gioco1 };