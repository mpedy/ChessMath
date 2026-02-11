import { MovingGame } from "../../Utility/MovingGame.js";

var gioco13b = new MovingGame({
    piece_position: {
        "A2": "Knight.svg",
    },
    moving_pieces: { "Knight": "A2"},
    end_position: "D6",
    show_possible_moves: false,
    with_timer: true
})

export { gioco13b };