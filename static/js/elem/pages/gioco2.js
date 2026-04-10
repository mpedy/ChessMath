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
    with_timer: true,
    title: "Muovi la Torre verso il punto evidenziato percorrendo il minor numero di caselle possibile",
    time: 60,
    label_moves: "Caselle",
    name: "G Muovi Torre"
});

export { gioco2 };