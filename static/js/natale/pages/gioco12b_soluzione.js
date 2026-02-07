import { DrawChessboard as DrawChessboardClass } from "../../drawchessboardnewnew.js";

class Gioco12bSoluzione {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass()
        drawChessboard.drawChessboard(document.getElementById("chessboard"))

        drawChessboard.piece_position = {
            "D5": "Knight.svg",
        }

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

        window.enlighted = "";

        window.enwrite("F6", 1, "white", "rgb(200,0,0)")
        window.enwrite("D7", 2, "white", "rgb(200,0,0)")
        window.enwrite("E5", 3, "black", "yellow")



    }
}

const gioco12b_soluzione = new Gioco12bSoluzione();
export { gioco12b_soluzione };