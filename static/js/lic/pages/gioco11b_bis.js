import { DrawGame } from "../../Utility/DrawGame.js";

var gioco11b_bis = new DrawGame({
    piece_position: {
        "F5": "Bishop.svg",
    },
    caselle_corrette: ["D7", "F7", "H7", "E6", "G6", "D5", "F5", "H5", "E4", "G4", "D3", "F3", "H3"]
})

export { gioco11b_bis };