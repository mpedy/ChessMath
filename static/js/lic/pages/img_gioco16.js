import { PrototipoGame } from "../../common/PrototipoGame.js";
import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";

class ImgGioco16 extends PrototipoGame {
    constructor(name = "ImgGioco16") {
        super(`<div style="padding: 10px; display: block;">
	Una possibile soluzione:
</div>
<div id="chessboard"></div>`, name);
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

var img_gioco16 = new ImgGioco16("IMG Soluzione");
export { img_gioco16 };