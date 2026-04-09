import { MovingGame } from "../../Utility/MovingGame.js";

var gioco12b = new MovingGame({
    piece_position: {
        "D5": "Knight.svg",
    },
    moving_pieces: { "Knight": "D5" },
    end_position: "E5",
    show_possible_moves: false,
    with_timer: true,
    title: "Muovi il Cavallo verso la casella evidenziata nel minor numero di mosse",
    time: 50,
    label_moves: "Mosse",
    f_dist: function (from, to) { return 1;},
    retry_message: (mvs) => `Hai effettuato ${mvs} moss${mvs>1?'e':'a'}. Vuoi riprovare?`,
    name: "G Muovi Cavallo 2",
})

export { gioco12b };