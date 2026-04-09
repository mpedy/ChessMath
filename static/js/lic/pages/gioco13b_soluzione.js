import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { PrototipoGame } from "../../common/PrototipoGame.js";

class Gioco13bSoluzione extends PrototipoGame {
    constructor(name = "Gioco13bSoluzione") {
        super(`<div style="padding: 10px; display: block;">
	Una possibile soluzione:
</div>
<div id="chessboard"></div>`, name);
    }
    start() {

        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"))
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ "A2": "Knight.svg" })

        window.enlighted = "";

        window.enwrite("C3", 1, "white", "rgb(200,0,0)")
        window.enwrite("B5", 2, "white", "rgb(200,0,0)")
        window.enwrite("D6", 3, "black", "yellow")

    }
}

var gioco13b_soluzione = new Gioco13bSoluzione("Soluzione");
export { gioco13b_soluzione };