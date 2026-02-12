import { DrawGame } from "../../Utility/DrawGame.js";

var gioco11b = new DrawGame({
    piece_position: {
        "F5": "Bishop.svg",
    },
    caselle_corrette: ["D7", "F7", "H7", "D5", "H5", "D3", "F3", "H3"]
})

export { gioco11b };