import { MovingGame } from "../../Utility/MovingGame.js";

var gioco12b = new MovingGame({
    piece_position: {
        "D5": "Knight.svg",
    },
    moving_pieces: { "Knight": "D5" },
    end_position: "E5",
    show_possible_moves: false,
    with_timer: true,
    title: "Muovi il Cavallo verso la casella evidenziata nel minor numero di mosse",
    time: 50,
    label_moves: "Mosse"
})

export { gioco12b };