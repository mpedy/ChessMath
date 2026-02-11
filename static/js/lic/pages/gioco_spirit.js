import { DrawGame } from "../../Utility/DrawGame.js";

var gioco_spirit = new DrawGame({
    piece_position: {
        "D5": "Knight.svg",
    },
    caselle_corrette: ["B4", "B6", "C3", "C7", "E3", "E7", "F4", "F6"]
})

export { gioco_spirit };