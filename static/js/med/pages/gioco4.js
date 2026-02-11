import { MovingGame } from "../../Utility/MovingGame.js";

var gioco4 = new MovingGame({
    piece_position: {
        "D5": "Rook.svg",
        "A1": "obstacle.svg",
        "D6": "obstacle.svg",
        "F4": "obstacle.svg",
        "B7": "obstacle.svg",
        "B4": "obstacle.svg",
        "B5": "obstacle.svg",
        "C7": "obstacle.svg",
        "B6": "obstacle.svg",
        "C6": "obstacle.svg"
    },
    moving_pieces: { "Rook": "D5" },
    end_position: "A8",
    show_possible_moves: false,
    with_timer: true
})

export { gioco4 };