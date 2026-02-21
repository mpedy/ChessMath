import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { PrototipoGame } from "../../common/PrototipoGame.js";

class Gioco12b_soluzione extends PrototipoGame {
    constructor() {
        super();
    }
    start() {

        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"))
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ "D5": "Knight.svg" })

        window.enlighted = "";

        window.enwrite("F6", 1, "white", "rgb(200,0,0)")
        window.enwrite("D7", 2, "white", "rgb(200,0,0)")
        window.enwrite("E5", 3, "black", "yellow")

    }
}

var gioco12b_soluzione = new Gioco12b_soluzione();
export { gioco12b_soluzione };
