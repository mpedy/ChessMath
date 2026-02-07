import { DrawChessboard as DrawChessboardClass } from "../drawchessboardnewnew.js";

class ImgGioco {
    constructor(piece_position, cas) {
        this.piece_position = piece_position;
        this.cas = cas;
    }
    start() {

        var drawChessboard = new DrawChessboardClass()

        drawChessboard.drawChessboard(document.getElementById("chessboard"))

        drawChessboard.piece_position = this.piece_position;

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

        for (var i in this.cas) {
            var elem = $("#" + this.cas[i])[0]
            var div = document.createElement("div");
            div.style.background = "red"
            div.style.borderRadius = "50%"
            div.style.position = "absolute"
            div.style.left = "10%"
            div.style.top = "10%"
            div.style.width = "80%"
            div.style.height = "80%"
            div.style.zIndex = "1";
            elem.appendChild(div);
        }
        drawChessboard.handleMouseDown_casella = function () { }
        drawChessboard.handleMouseDown_image = function () { }

    }
}

export { ImgGioco };