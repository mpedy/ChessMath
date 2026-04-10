import { MovingGame } from "../../Utility/MovingGame.js";

var gioco8 = new MovingGame({
    piece_position: {
        "A2": "Bishop.svg",
        "D4": "obstacle.svg",
        "E5": "obstacle.svg",
        "F6": "obstacle.svg",
        "G7": "obstacle.svg",
        "H3": "obstacle.svg",
        "B7": "obstacle.svg",
        "A8": "obstacle.svg",
        "C6": "obstacle.svg",
        "G3": "obstacle.svg"
    },
    moving_pieces: { "Bishop": "A2" },
    end_position: "H7",
    show_possible_moves: false,
    with_timer: true,
    title: "Muovi l'Alfiere verso il punto evidenziato nel minor numero di caselle",
    time: 40,
    label_moves: "Caselle",
    name: "G Muovi Alfiere"
})

export { gioco8 };