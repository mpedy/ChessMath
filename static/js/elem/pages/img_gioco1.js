import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";

/* global $ */
class ImgGioco1 {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass()

        drawChessboard.drawChessboard(document.getElementById("chessboard"))

        drawChessboard.piece_position = {
            "D5": "Rook.svg",
        }

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

        var cas = ["C5", "B5", "A5", "E5", "F5", "G5", "H5", "D4", "D3", "D2", "D1", "D6", "D7", "D8"]

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
var img_gioco1 = new ImgGioco1();
export { img_gioco1 };