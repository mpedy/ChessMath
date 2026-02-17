import { MovingGame } from "../../Utility/MovingGame.js";

var gioco2 = new MovingGame({
    piece_position: {
        "E2": "Rook.svg"
    },
    moving_pieces: {
        "Rook": "E2"
    },
    end_position: "B7",
    show_possible_moves: true,
    with_timer: true
});

export { gioco2 };