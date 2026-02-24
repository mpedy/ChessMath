import { MovingGame } from "../../Utility/MovingGame.js";

var gioco_training_toro = new MovingGame({
    piece_position: {
        "D5": "Rook.svg",
        "C4": "obstacle.svg",
        "F5": "obstacle.svg",
        "D6": "obstacle.svg",
    },
    moving_pieces: { "Rook": "D5" },
    end_position: null,
    show_possible_moves: true,
    with_timer: false,
    toro: true,
    html: `<div id="title">Prova la scacchiera toroidale</div>
<div id="chessboard"></div>
<div>
	<div style="background: black;">Mosse: <span id="number_of_moves">0</span></div>
</div>
<div id="controls_container">
	<button id="ricomincia" onclick="window.ricomincia()">Ricomincia</button>
</div>`,

}
)

export { gioco_training_toro };