import { MovingGame } from "../../Utility/MovingGame.js";

var gioco13b = new MovingGame({
    piece_position: {
        "A2": "Knight.svg",
    },
    moving_pieces: { "Knight": "A2"},
    end_position: "D6",
    show_possible_moves: false,
    with_timer: true,
    title: "Muovi il Cavallo verso la casella evidenziata nel minor numero di mosse",
    time: 120,
    label_moves: "Mosse",
    name: "G Muovi Cavallo"
})

export { gioco13b };