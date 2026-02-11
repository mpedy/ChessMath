import { MovingGame } from "../../Utility/MovingGame.js";

var gioco13b = new MovingGame({
    piece_position: {
        "A2": "Knight.svg",
    },
    moving_pieces: { "Knight": "A2" },
    end_position: "D6",
})

export { gioco13b };