import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";

class Gioco13b_soluzione {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass()

        drawChessboard.drawChessboard(document.getElementById("chessboard"))

        drawChessboard.piece_position = {
            A2: "Knight.svg",
        }

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

        window.enlighted = "";

        window.enwrite("C3", 1, "white", "rgb(200,0,0)")
        window.enwrite("B5", 2, "white", "rgb(200,0,0)")
        window.enwrite("D6", 3, "black", "yellow")
    }
}

var gioco13b_soluzione = new Gioco13b_soluzione();
export { gioco13b_soluzione };
