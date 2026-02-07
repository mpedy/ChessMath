import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";

/* global $ */
class ImgCavallo {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass()
        drawChessboard.drawChessboard(document.getElementById("chessboard"))

        drawChessboard.piece_position = {
            "D5": "Knight.svg",
        }

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

        var cas = ["E7"]

        for (let i in cas) {
            let elem = $("#" + cas[i])[0]
            let div = document.createElement("div");
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
        cas = ["D6", "D7"]
        for (let i in cas) {
            let elem = $("#" + cas[i])[0]
            let div = document.createElement("div");
            div.style.background = "rgba(255,0,0,0.5)";
            div.style.borderRadius = "50%"
            div.style.position = "absolute"
            div.style.left = "30%"
            div.style.top = "30%"
            div.style.width = "40%"
            div.style.height = "40%"
            div.style.zIndex = "1";
            elem.appendChild(div);
        }
        drawChessboard.handleMouseDown_casella = function () { }
        drawChessboard.handleMouseDown_image = function () { }

    }
}

const img_cavallo = new ImgCavallo();
export { img_cavallo };