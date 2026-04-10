import { MovingGame } from "../../Utility/MovingGame.js";

var gioco9 = new MovingGame({
    piece_position: {
        "A4": "Bishop.svg",
        "A2": "obstacle.svg",
        "D8": "obstacle.svg",
        "D6": "obstacle.svg",
        "D4": "obstacle.svg",
        "D2": "obstacle.svg",
        "F5": "obstacle.svg",
        "F7": "obstacle.svg",
    },
    moving_pieces: {
        "Bishop": "A4"
    },
    end_position: "H7",
    show_possible_moves: false,
    with_timer: true,
    title: "Muovi l'Alfiere verso il punto evidenziato nel minor numero di caselle",
    time: 120,
    label_moves: "Caselle",
    name: "G Muovi Alfiere 2"
});

export { gioco9 };