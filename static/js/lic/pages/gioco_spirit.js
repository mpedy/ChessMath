import { DrawGame } from "../../Utility/DrawGame.js";

var gioco_spirit = new DrawGame({
    piece_position: {
        "D5": "Knight.svg",
    },
    caselle_corrette: ["B4", "B6", "C3", "C7", "E3", "E7", "F4", "F6"],
    title: "Segna tutte le caselle della circonferenza di raggio 1 con centro il Cavallo",
    time: 40,
    name: "G Cavallo cfr 1"
})

export { gioco_spirit };