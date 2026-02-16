import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";

class Gioco13bSoluzione {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"))
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ "A2": "Knight.svg" })

        window.enlighted = "";

        window.enwrite("C3", 1, "white", "rgb(200,0,0)")
        window.enwrite("B5", 2, "white", "rgb(200,0,0)")
        window.enwrite("D6", 3, "black", "yellow")

    }
}

var gioco13b_soluzione = new Gioco13bSoluzione();
export { gioco13b_soluzione };