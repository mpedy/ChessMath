import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { pieceMove } from "../../Utility/MovePieces.js";
import { PieceClass } from "../../Utility/PieceClass.js";

/* global $ */
class Gioco19 {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass()
        //var maketimer = new MakeTimerClass()
        var ROOK1 = new PieceClass("Rook", "A1", "Rook.svg");
        var ROOK2 = new PieceClass("Rook", "H1", "Rook.svg");
        var KINGB = new PieceClass("King", "E8", "King_B.svg");
        drawChessboard.pieces = [ROOK1, ROOK2, KINGB]
        var Party = [ROOK1, ROOK2]
        //var Enemies = [KINGB]

        drawChessboard.drawChessboard(document.getElementById("chessboard"))


        drawChessboard.piece_position = {}
        drawChessboard.piece_position[ROOK1.casella] = ROOK1.immagine
        drawChessboard.piece_position[ROOK2.casella] = ROOK2.immagine
        drawChessboard.piece_position[KINGB.casella] = KINGB.immagine

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

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

        window.ricomincia = function () {
            $("#chessboard").html("")[0].style.cssText = ""
            drawChessboard.drawChessboard(document.getElementById("chessboard"));
            drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
            ROOK1.selected = false;
            ROOK2.selected = false;
            KINGB.selected = false;
            ROOK1.casella = ROOK1._casella;
            ROOK2.casella = ROOK2._casella;
            KINGB.casella = KINGB._casella;
            window.enlighted = "";
            number_of_moves = 0;
            $("#number_of_moves").html(number_of_moves);
            possible_moves = new Array();
            caselle_colorate = new Array();
        }

        drawChessboard.handleMouseDown_casella = function (e) {
            var elem = e.currentTarget;
            //console.log(elem)
            var casella = elem.getAttribute("casella");
            if (possible_moves.includes(casella)) {
                var piece;
                for (var i in drawChessboard.pieces) {
                    if (drawChessboard.pieces[i].selected) {
                        piece = drawChessboard.pieces[i];
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

        window.move = function (piece, dest) {
            document.getElementById(piece.casella).innerHTML = ""
            var lst = new Object()
            lst[dest] = piece.immagine
            drawChessboard.drawPieces(document.getElementById("chessboard"), lst)
            piece.casella = dest
        }

        window.enemyTurn = function () {
            var pmoves = []
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
            for (var i in pmoves_king) {
                if (pmoves.includes(pmoves_king[i])) {
                    pmoves_king_excluded.push(pmoves_king[i])
                }
            }
            for (var i in pmoves_king_excluded) {
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
            return pmoves_king;
        }

        window.dist = function () {
            return 1;
        }

        drawChessboard.handleMouseDown_image = function (e) {
            //console.log(e.currentTarget);
            var elem = e.currentTarget;
            var casella = elem.getAttribute("data-casella");
            var type = elem.getAttribute("data-type")
            //console.log("Casella e tipo: " + casella+"-"+type)
            for (var p in drawChessboard.pieces) {
                if (drawChessboard.pieces[p].casella == casella) {
                    drawChessboard.pieces[p].selected = true
                    window.enlight(drawChessboard.pieces[p].casella, "orange")
                    possible_moves = window.calculatePossibleMoves(casella, type);
                    drawChessboard.pieces[p].possible_moves = possible_moves;
                } else {
                    drawChessboard.pieces[p].selected = false
                }
            }
        }

        window.calculatePossibleMoves = function (casella, type) {
            var pmoves = new Array();
            switch (type) {
                case "Rook": {
                    var x = casella.charCodeAt(0) - 65 + 1;
                    var y = parseInt(casella[1]);
                    pmoves = pieceMove.moveRook(casella, x, y);
                }
                    break;
                case "King": {
                    var x = casella.charCodeAt(0) - 65 + 1;
                    var y = parseInt(casella[1]);
                    pmoves = pieceMove.moveKing(casella, x, y);
                }
                    break;
            }
            for (var i in drawChessboard.pieces) {
                if (pmoves.indexOf(drawChessboard.pieces[i].casella) >= 0) {
                    pmoves.splice(pmoves.indexOf(drawChessboard.pieces[i].casella), 1)
                }
            }
            //console.log(possible_moves);
            if (show_possible_moves) {
                for (var i in pmoves) {
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


        window.reset = function () {
            for (var i in caselle_colorate) {
                var elem = document.getElementById(caselle_colorate[i])
                elem.removeChild(elem.children[elem.childElementCount - 1]);
            }
            caselle_colorate = new Array();
        }

        window.goal_reached = function () {
            window.punti = window.getPoints();
            window.myconfirm_2b("Obiettivo raggiunto", "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?", "sì", "no",
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
                    drawChessboard.handleMouseDown_casella = function () { }
                    drawChessboard.handleMouseDown_image = function () { }
                    $("#ricomincia").prop("disabled", true);
                }, false);
        }

        window.procedi = function () {
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

var gioco19 = new Gioco19();
export { gioco19 };