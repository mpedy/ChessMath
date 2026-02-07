import { DrawChessboard as DrawChessboardClass } from "../../drawchessboardnewnew.js";
import { MakeTimerClass } from "../../maketimernew.js"
import { pieceMove } from "../../movePiecesnew.js";

class Gioco13b_soluzione {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass()

        drawChessboard.drawChessboard(document.getElementById("chessboard"))

        drawChessboard.piece_position = {
            A2: "Knight.svg",
        }

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)




        var caselle_colorate = new Array();

        window.enlighted = "";

        var moving_pieces = {
            "Knight": D5
        }
        var moving_piece = "";
        var possible_moves = new Array();
        var obstacles = ["rock-golem-1", "rock-golem", "obstacle"]
        var end_position = E5;
        var number_of_moves = 0;
        var show_possible_moves = false;

        window.enwrite(C3, 1, "white", "rgb(200,0,0)")
        window.enwrite(B5, 2, "white", "rgb(200,0,0)")
        window.enwrite(D6, 3, "black", "yellow")
    }
}

const gioco13b_soluzione = new Gioco13b_soluzione();
export { gioco13b_soluzione };
