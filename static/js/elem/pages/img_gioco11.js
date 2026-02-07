import { DrawChessboard as DrawChessboardClass } from "../../drawchessboardnewnew.js";

/* global $ */
class ImgGioco11 {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass()

        drawChessboard.drawChessboard(document.getElementById("chessboard"))

        drawChessboard.piece_position = {
            "F5": "Bishop.svg",
        }

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

        var cas = ["D7", "F7", "H7", "D5", "H5", "D3", "F3", "H3"]

        for (var i in cas) {
            var elem = $("#" + cas[i])[0]
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
const img_gioco11 = new ImgGioco11();
export { img_gioco11 };