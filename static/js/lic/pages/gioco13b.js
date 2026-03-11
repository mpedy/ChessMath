import { MovingGame } from "../../Utility/MovingGame.js";

var gioco13b = new MovingGame({
    piece_position: {
        "A2": "Knight.svg",
    },
    moving_pieces: { "Knight": "A2" },
    end_position: "D6",
    with_timer: true,
    title: "Muovi il Cavallo verso la casella evidenziata nel minor numero di mosse",
    time: 50,
    label_moves: "Mosse",
    f_dist: function (from, to) { return 1;},
    retry_message: (mvs) => `Hai effettuato ${mvs} moss${mvs>1?'e':'a'}. Vuoi riprovare?`,
})

export { gioco13b };