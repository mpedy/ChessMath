import { MovingGame } from "../../Utility/MovingGame.js";

var gioco_toro1 = new MovingGame({
    piece_position: {
        "H8": "Bishop.svg",
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
    moving_pieces: { "Bishop": "H8" },
    end_position: "C3",
    show_possible_moves: false,
    with_timer: true,
    toro: true,
    title: "Muovi l'Alfiere verso il punto evidenziato nel minor numero di mosse sulla scacchiera toroidale",
    time: 90,
    label_moves: "Mosse",
    f_dist: function (from, to) { return 1; },
    retry_message: (mvs) => `Hai effettuato ${mvs} moss${mvs>1?'e':'a'}. Vuoi riprovare?`,
})

export { gioco_toro1 };