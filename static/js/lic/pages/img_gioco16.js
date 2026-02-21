import { PrototipoGame } from "../../common/PrototipoGame.js";
import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";

class ImgGioco16 extends PrototipoGame {
    constructor() {
        super();
    }
    start() {
        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"))
        drawChessboard.drawChessboard(4)
        drawChessboard.piece_position = {
            A2: "Queen.svg",
            B4: "Queen.svg",
            D3: "Queen.svg",
            C1: "Queen.svg"
        }
        drawChessboard.drawPieces()

        drawChessboard.handleMouseDown_casella = function () { }
        drawChessboard.handleMouseDown_image = function () { }
    }
}

var img_gioco16 = new ImgGioco16();
export { img_gioco16 };