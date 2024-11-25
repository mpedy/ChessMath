import { DrawChessboard as DrawChessboardClass } from "../drawchessboardnewnew.js";

var drawChessboard = new DrawChessboardClass()
drawChessboard.drawChessboard(document.getElementById("chessboard"))

drawChessboard.piece_position={
	D5: "Knight.svg",
}

drawChessboard.drawPieces(document.getElementById("chessboard"),drawChessboard.piece_position)

var caselle_colorate = new Array();

enlighted = "";

var moving_pieces = {
	"Knight" : D5
}
var moving_piece = "";
var possible_moves = new Array();
var obstacles = ["rock-golem-1", "rock-golem","obstacle"]
var end_position=E5;
var number_of_moves = 0;
var show_possible_moves = false;

enwrite(F6, 1, "white","rgb(200,0,0)")
enwrite(D7, 2, "white","rgb(200,0,0)")
enwrite(E5, 3, "black","yellow")

