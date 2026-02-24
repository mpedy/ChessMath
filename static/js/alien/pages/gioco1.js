import { DrawGame } from "../../Utility/DrawGame.js";

var gioco1 = new DrawGame({
    piece_position: {
        "D5": "Knight.svg",
    },
    caselle_corrette: ["B4", "B6", "C3", "C7", "E3", "E7", "F4", "F6"],
    title: "Segna tutte le caselle in cui il Cavallo può andare con una mossa",
    time: 60
})

export { gioco1 };