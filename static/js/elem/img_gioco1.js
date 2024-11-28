import { DrawChessboard as DrawChessboardClass } from "../drawchessboardnewnew.js";

var drawChessboard = new DrawChessboardClass()

drawChessboard.drawChessboard(document.getElementById("chessboard"))

drawChessboard.piece_position = {
	D5: "Rook.svg",
}

drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

var cas = [C5, B5, A5, E5, F5, G5, H5, D4, D3, D2, D1, D6, D7, D8]

drawChessboard.drawHints(cas)

drawChessboard.handleMouseDown_casella = function () { }
drawChessboard.handleMouseDown_image = function () { }