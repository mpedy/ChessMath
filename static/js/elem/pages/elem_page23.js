import { DrawChessboard as DrawChessboardClass } from "../../drawchessboardnewnew.js";

class Page23 {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass()

        drawChessboard.drawChessboard(document.getElementById("chessboard"))

        drawChessboard.piece_position = {
            D5: "Bishop.svg",
        }

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

        var cas = [A2, A8, B3, B7, C4, C6, E4, E6, F3, F7, G2, G8, H1]

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
const page23 = new Page23();
export { page23 };