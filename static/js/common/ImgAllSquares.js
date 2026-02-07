import { DrawChessboard as DrawChessboardClass } from "../Utility/Drawchessboard.js";

/* global $ */
class ImgAllSquares {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass()

        drawChessboard.drawChessboard(document.getElementById("chessboard"))

        drawChessboard.drawPieces(document.getElementById("chessboard"),
            { "F5": "Bishop.svg", "C5": "Rook.svg" })

        var cas = ["D7", "F7", "H7", "D5", "H5", "D3", "F3", "H3"]

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

        cas = ["C7", "D6", "E5", "D4", "C3", "B4", "A5", "B6"]
        for (let i in cas) {
            let elem = $("#" + cas[i])[0]
            let div = document.createElement("div");
            div.style.background = "blue"
            div.style.borderRadius = "50%"
            div.style.position = "absolute"
            div.style.left = "10%"
            div.style.top = "10%"
            div.style.width = "80%"
            div.style.height = "80%"
            div.style.zIndex = "1";
            elem.appendChild(div);
        }
    }
}

const img_allsquares = new ImgAllSquares();
export { img_allsquares };