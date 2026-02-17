import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";

class ImgGioco15 {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"))
        drawChessboard.drawChessboard()
        drawChessboard.piece_position = {
            "H8": "Knight.svg",
            "G8": "obstacle.svg",
            "G7": "obstacle.svg",
            "H7": "obstacle.svg",
            "E4": "obstacle.svg",
            "G6": "obstacle.svg",
            "C2": "obstacle.svg",
            "C5": "obstacle.svg",
            "B2": "obstacle.svg",
            "B3": "obstacle.svg",
            "B5": "obstacle.svg",
            "D1": "obstacle.svg",
            "D3": "obstacle.svg"
        }
        drawChessboard.drawPieces()

        window.enlighted = "";

        window.enwrite("F7", 1, "white", "rgb(200,0,0)")
        window.enwrite("D6", 2, "white", "rgb(200,0,0)")
        window.enwrite("C4", 3, "white", "rgb(200,0,0)")
        window.enwrite("B6", 4, "white", "rgb(200,0,0)")
        window.enwrite("D5", 5, "white", "rgb(200,0,0)")
        window.enwrite("C3", 6, "black", "yellow")

    }
}

var img_gioco15 = new ImgGioco15();
export { img_gioco15 };