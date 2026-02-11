import { MovingGame } from "../../Utility/MovingGame.js";

var gioco_toro = new MovingGame({
    piece_position: {
        "H8": "Rook.svg",
        "G8": "obstacle.svg",
        "G7": "obstacle.svg",
        "H7": "obstacle.svg",
        "E4": "obstacle.svg",
        "G6": "obstacle.svg",
        "C2": "obstacle.svg",
        "C5": "obstacle.svg",
        "B2": "obstacle.svg",
        "B3": "obstacle.svg",
        "B5": "obstacle.svg",
        "D1": "obstacle.svg",
        "D3": "obstacle.svg"
    },
    moving_pieces: { "Rook": "H8" },
    end_position: "C3",
    show_possible_moves: false,
    with_timer: false,
    toro: true
})

export { gioco_toro };