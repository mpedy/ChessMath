import { DrawGame } from "../../Utility/DrawGame.js";

var gioco5 = new DrawGame({
    piece_position: {
        "D5": "Rook.svg",
    },
    caselle_corrette: ["D6", "E5", "D4", "C5"],
    title: "Segna le caselle appartenenti alla circonferenza di raggio 1 con centro la Torre",
    time: 30,
    name: "G Segna caselle cfr 1 Torre"
})

export { gioco5 };