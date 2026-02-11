import { MovingGame } from "../../Utility/MovingGame.js";

var gioco_training_toro = new MovingGame({
    piece_position: {
        "D5": "Rook.svg",
        "C4": "obstacle.svg",
        "F5": "obstacle.svg",
        "D6": "obstacle.svg",
    },
    moving_pieces: { "Rook": "D5" },
    end_position: null,
    show_possible_moves: true,
    with_timer: false,
    toro: true
}
)

export { gioco_training_toro };