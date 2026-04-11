import { PrototipoGame } from "./PrototipoGame.js";
import { DrawChessboard as DrawChessboardClass } from "../Utility/Drawchessboard.js";
import { pieceMove } from "../Utility/MovePieces.js";
import { PieceClass } from "../Utility/PieceClass.js";
import { calculateFen } from "../Utility/CalculateFEN.js";

/* global $ */
class GiocoStockfish extends PrototipoGame {
    constructor(name) {
        super(`<div id="title">Batti Stockfish</div>
<div id="chessboard"></div>
<div>
	<div style="background: black;">Mosse: <span id="number_of_moves">0</span></div>
</div>
<div id="controls_container">
	<button id="ricomincia" onclick="window.ricomincia()">Ricomincia</button>
</div>`, name);
            this.fen = "";
            this.stockfish = null;
    }
    initStocksih(){
        this.stockfish = new Worker("static/js/stockfish_engine.js");
        window.stockfish = this.stockfish;
        this.stockfish.onmessage = (event) => {
            console.log("Stockfish says: " + event.data);
            if(event.data.startsWith("bestmove")){
                var move = event.data.split(" ")[1];
                var from = move.substring(0, 2);
                var to = move.substring(2, 4);
                var piece;
                for(var p in this.drawChessboard.pieces){
                    if(this.drawChessboard.pieces[p].casella.toUpperCase() == from.toUpperCase()){
                        piece = this.drawChessboard.pieces[p];
                        break;
                    }
                }
                window.move(piece, to.toUpperCase());
            }else if(event.data.indexOf("score mate 0")>=0){
                window.goal_reached();
            }
        }
        this.stockfish.postMessage("uci");
        this.stockfish.postMessage("setoption name Skill Level value 10");
    }
    start() {
        this.drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"))
        //var maketimer = new MakeTimerClass()
        var ROOK1 = new PieceClass("Rook", "A1", "Rook.svg");
        var ROOK2 = new PieceClass("Rook", "H1", "Rook.svg");
        var KINGB = new PieceClass("King", "E8", "King_B.svg");
        this.drawChessboard.pieces = [ROOK1, ROOK2, KINGB]
        var Party = [ROOK1, ROOK2]
        this.initStocksih();
        //var Enemies = [KINGB]

        this.drawChessboard.drawChessboard()


        this.drawChessboard.piece_position = {}
        this.drawChessboard.piece_position[ROOK1.casella] = ROOK1.immagine
        this.drawChessboard.piece_position[ROOK2.casella] = ROOK2.immagine
        this.drawChessboard.piece_position[KINGB.casella] = KINGB.immagine

        this.drawChessboard.drawPieces()

        this.fen = calculateFen.calculateFen(this.drawChessboard);

        var caselle_colorate = new Array();

        window.enlighted = "";

        // var moving_pieces = {}
        // moving_pieces[ROOK1.tipo] = ROOK1.casella
        // moving_pieces[ROOK2.tipo] = ROOK2.casella
        // moving_pieces[KINGB.tipo] = KINGB.casella

        // var moving_piece = "";
        var possible_moves = new Array();
        var number_of_moves = 0;
        var show_possible_moves = false;

        window.ricomincia = () => {
            $("#chessboard").html("")[0].style.cssText = ""
            this.drawChessboard.drawChessboard();
            ROOK1.reset();
            ROOK2.reset();
            KINGB.reset();
            this.drawChessboard.piece_position = {}
            this.drawChessboard.piece_position[ROOK1.casella] = ROOK1.immagine
            this.drawChessboard.piece_position[ROOK2.casella] = ROOK2.immagine
            this.drawChessboard.piece_position[KINGB.casella] = KINGB.immagine
            this.drawChessboard.drawPieces();
            window.enlighted = "";
            number_of_moves = 0;
            $("#number_of_moves").html(number_of_moves);
            possible_moves = new Array();
            caselle_colorate = new Array();
        }

        this.drawChessboard.handleMouseDown_casella = (e) => {
            var elem = e.currentTarget;
            //console.log(elem)
            var casella = elem.getAttribute("casella");
            if (possible_moves.includes(casella)) {
                var piece;
                for (var i in this.drawChessboard.pieces) {
                    if (this.drawChessboard.pieces[i].selected) {
                        piece = this.drawChessboard.pieces[i];
                        break;
                    }
                }
                //move(moving_piece, elem.id);
                window.move(piece, casella)
                number_of_moves += window.dist(piece.casella, casella)
                $("#number_of_moves").html(number_of_moves);
                // moving_piece = "";
                possible_moves = new Array();
                window.enemyTurn()
                e.stopPropagation();
                e.preventDefault();
            } else {
                //console.log("non sposto" + moving_piece)
            }
        }

        window.move = (piece, dest) => {
            document.getElementById(piece.casella).innerHTML = ""
            var lst = new Object()
            lst[dest] = piece.immagine
            this.drawChessboard.drawPieces(lst)
            piece.casella = dest
        }

        window.enemyTurn = () => {
            console.log("Turno del nemico")
            console.log("FEN PRIMA: ", this.fen)
            console.log("STOCKFISH: ", this.stockfish)
            this.fen = calculateFen.calculateFen(this.drawChessboard);
            console.log("FEN DOPO: ", this.fen)
            this.stockfish.postMessage("position fen " + this.fen);
            this.stockfish.postMessage("go movetime 1000");
            /*var pmoves = []
            for (var party in Party) {
                pmoves.push(Party[party].casella)
                var moves = window.calculatePossibleMoves(Party[party].casella, Party[party].tipo)
                for (var m in moves) {
                    pmoves.push(moves[m])
                }
            }
            pmoves.flat()
            var pmoves_king = window.calculatePossibleMoves(KINGB.casella, KINGB.tipo);
            var pmoves_king_excluded = new Array();
            for (let i in pmoves_king) {
                if (pmoves.includes(pmoves_king[i])) {
                    pmoves_king_excluded.push(pmoves_king[i])
                }
            }
            for (let i in pmoves_king_excluded) {
                pmoves_king.splice(pmoves_king.indexOf(pmoves_king_excluded[i]), 1)
            }
            if (pmoves_king.length == 0) {
                window.goal_reached()
                return;
            }
            var random_moves = parseInt(Math.random() * 1000 % pmoves_king.length);
            //move(KINGB.tipo + ";" + KINGB.casella, pmoves_king[random_moves])
            window.move(KINGB, pmoves_king[random_moves])
            //KINGB.casella = pmoves_king[random_moves];
            return pmoves_king;*/
        }

        window.dist = function () {
            return 1;
        }

        this.drawChessboard.handleMouseDown_image = (e) => {
            //console.log(e.currentTarget);
            var elem = e.currentTarget;
            var casella = elem.getAttribute("data-casella");
            var type = elem.getAttribute("data-type")
            //console.log("Casella e tipo: " + casella+"-"+type)
            for (var p in this.drawChessboard.pieces) {
                if (this.drawChessboard.pieces[p].casella == casella) {
                    this.drawChessboard.pieces[p].selected = true
                    window.enlight(this.drawChessboard.pieces[p].casella, "orange")
                    possible_moves = window.calculatePossibleMoves(casella, type);
                    this.drawChessboard.pieces[p].possible_moves = possible_moves;
                } else {
                    this.drawChessboard.pieces[p].selected = false
                }
            }
        }

        window.calculatePossibleMoves = (casella, type) => {
            var pmoves = new Array();
            var x = casella.charCodeAt(0) - 65 + 1;
            var y = parseInt(casella[1]);
            switch (type) {
                case "Rook": {
                    pmoves = pieceMove.moveRook(casella, x, y);
                }
                    break;
                case "King": {
                    pmoves = pieceMove.moveKing(casella, x, y);
                }
                    break;
            }
            for (let i in this.drawChessboard.pieces) {
                if (pmoves.indexOf(this.drawChessboard.pieces[i].casella) >= 0) {
                    pmoves.splice(pmoves.indexOf(this.drawChessboard.pieces[i].casella), 1)
                }
            }
            //console.log(possible_moves);
            if (show_possible_moves) {
                for (let i in pmoves) {
                    var elem = document.getElementById(pmoves[i]);
                    caselle_colorate.push(pmoves[i]);
                    var div = document.createElement("div");
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
            return pmoves;
        }


        window.reset = () => {
            for (var i in caselle_colorate) {
                var elem = document.getElementById(caselle_colorate[i])
                elem.removeChild(elem.children[elem.childElementCount - 1]);
            }
            caselle_colorate = new Array();
        }

        window.goal_reached = () => {
            window.punti = window.getPoints();
            var self = this;
            window.myconfirm_2b("Obiettivo raggiunto", "Hai battuto il Computer in " + number_of_moves + " mosse! Vuoi riprovare?", "sì", "no",
                function () {
                    $(this).dialog("close");
                    window.ricomincia();
                    $(this).remove();
                }, function () {
                    $(this).dialog("close");
                    /*clearInterval(maketimer.myt);
                    maketimer.sec = 0;
                    maketimer.expired = false*/
                    $(this).remove();
                    window.punti += (50 - number_of_moves);
                    window.myalert("Punti", "Il tuo punteggio è di " + window.punti + " punti!");
                    window.updatePoints(50 - number_of_moves);
                    self.drawChessboard.handleMouseDown_casella = function () { }
                    self.drawChessboard.handleMouseDown_image = function () { }
                    $("#ricomincia").prop("disabled", true);
                }, false);
        }

        window.procedi = () => {
            window.punti = window.getPoints();
            window.punti += (50 - number_of_moves);
            window.myalert("Punti", "Il tuo punteggio è " + window.punti + ".");
            //maketimer.sec = 0;
            window.updatePoints(50 - number_of_moves);
            drawChessboard.handleMouseDown_casella = function () { }
            drawChessboard.handleMouseDown_image = function () { }
            $("#ricomincia").prop("disabled", true);
        }


    }
}

var giocoStockfish = new GiocoStockfish("Stockfish");
export { giocoStockfish };