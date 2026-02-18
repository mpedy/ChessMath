import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";

/* global $ */
class ImgCavallo {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"))
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ "D5": "Knight.svg" })

        var cas = ["E7"]
        var i;
        for (i in cas) {
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
        for (i in cas) {
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

var img_cavallo = new ImgCavallo();
export { img_cavallo };