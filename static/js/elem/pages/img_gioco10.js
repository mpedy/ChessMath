import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";

/* global $ */
class ImgGioco10 {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"))
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ "D5": "Bishop.svg" })

        var cas = ["C4", "C6", "E4", "E6"]

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
var img_gioco10 = new ImgGioco10();
export { img_gioco10 };