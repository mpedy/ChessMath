import { DrawChessboard as DrawChessboardClass } from "../drawchessboardnewnew.js";

var drawChessboard = new DrawChessboardClass()

drawChessboard.drawChessboard_bis(document.getElementById("chessboard"), 4)

drawChessboard.piece_position = {
    A2: "Queen.svg",
    B4: "Queen.svg",
    D3: "Queen.svg",
    C1: "Queen.svg"
}

drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

drawChessboard.handleMouseDown_casella = function () { }
drawChessboard.handleMouseDown_image = function () { }