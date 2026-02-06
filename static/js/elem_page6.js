import { DrawChessboard as DrawChessboardClass } from "./drawchessboardnewnew.js";

class Page6 {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass()
        drawChessboard.drawChessboard(document.getElementById("chessboard"))
        drawChessboard.drawPieces(document.getElementById("chessboard"), { E4: "Rook.svg" })
        var au = document.createElement("img")
        au.src = "static/img/arrow-up.svg"
        $("#E5").append(au)
        var al = document.createElement("img")
        al.src = "static/img/arrow-left.svg"
        $("#D4").append(al)
        var ar = document.createElement("img")
        ar.src = "static/img/arrow-right.svg"
        $("#F4").append(ar)
        var ad = document.createElement("img")
        ad.src = "static/img/arrow-down.svg"
        $("#E3").append(ad)
        drawChessboard.handleMouseDown_casella = function () { }
        drawChessboard.handleMouseDown_image = function () { }
    }
}
const page6 = new Page6();
export { page6 };