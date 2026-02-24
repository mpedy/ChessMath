import { MovingGame } from "../../Utility/MovingGame.js";

var gioco3 = new MovingGame({
    piece_position: {
        "A2": "Rook.svg",
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
    moving_pieces: {
        "Rook": "A2"
    },
    end_position: "H7",
    show_possible_moves: false,
    with_timer: true,
    title: "Muovi la Torre verso il punto evidenziato nel minor numero di caselle",
    time: 120,
    label_moves: "Caselle"
});

export { gioco3 };