import { MovingGame } from "../../Utility/MovingGame.js";

var gioco14 = new MovingGame({
    piece_position: {
        "G2": "Knight.svg",
        "A7": "obstacle.svg",
        "B7": "obstacle.svg",
        "B8": "obstacle.svg",
        "F2": "obstacle.svg",
        "F1": "obstacle.svg",
        "F3": "obstacle.svg",
        "G3": "obstacle.svg",
        "G1": "obstacle.svg",
        "H3": "obstacle.svg",
        "H2": "obstacle.svg",
        "H1": "obstacle.svg"
    },
    moving_pieces: { "Knight": "G2" },
    end_position: "A8",
    show_possible_moves: false,
})

export { gioco14 };