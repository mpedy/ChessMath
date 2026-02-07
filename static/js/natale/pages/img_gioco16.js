import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";

class ImgGioco16 {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass()

        drawChessboard.drawChessboard_bis(document.getElementById("chessboard"), 4)

        drawChessboard.piece_position = {
            A2: "Queen.svg",
            B4: "Queen.svg",
            D3: "Queen.svg",
            C1: "Queen.svg"
        }

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

        drawChessboard.handleMouseDown_casella = function () { }
        drawChessboard.handleMouseDown_image = function () { }
    }
}

const img_gioco16 = new ImgGioco16();
export { img_gioco16 };