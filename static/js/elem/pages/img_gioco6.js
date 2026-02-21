import { PrototipoGame } from "../../common/PrototipoGame.js";
import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";

/* global $ */
class ImgGioco6 extends PrototipoGame {
    constructor() {
        super();
    }
    start() {
        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"))
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ "D5": "Rook.svg" })

        var cas = ["D3", "D7", "C4", "C6", "B5", "E4", "E6", "F5"]

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
var img_gioco6 = new ImgGioco6();
export { img_gioco6 };