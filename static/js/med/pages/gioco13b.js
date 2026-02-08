import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { MakeTimerClass } from "../../Utility/Maketimer.js"
import { pieceMove } from "../../Utility/MovePieces.js";

/* global $ */
class Gioco13b {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass()
        var maketimer = new MakeTimerClass()

        maketimer.maketimer(document.getElementsByClassName("timer")[0]);
        maketimer.stopTimerFunction = function () {
            drawChessboard.handleMouseDown_casella = function () { }
            drawChessboard.handleMouseDown_image = function () { }
            $("#ricomincia").prop("disabled", true);
            window.procedi()
        }
        drawChessboard.drawChessboard(document.getElementById("chessboard"))

        drawChessboard.piece_position = {
            "A2": "Knight.svg",
        }

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

        var caselle_colorate = new Array();

        window.enlighted = "";

        var moving_pieces = {
            "Knight": "A2"
        }
        var moving_piece = "";
        var possible_moves = new Array();
        var end_position = "D6";
        var number_of_moves = 0;
        var show_possible_moves = false;

        window.ricomincia = function () {
            $("#chessboard").html("")[0].style.cssText = ""
            drawChessboard.drawChessboard(document.getElementById("chessboard"));
            drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
            moving_pieces = {
                "Knight": "A2"
            }
            window.enlighted = ""
            window.enlight(end_position, "orange", true);
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
                window.move(moving_piece, elem.id);
                moving_piece = "";
                possible_moves = new Array();
                e.stopPropagation();
                e.preventDefault();
            } else {
                //console.log("non sposto" + moving_piece)
            }
        }

        window.move = function (moving_piece, casella) {
            //console.log("sposto "+moving_piece+ " in "+casella);
            var piece = moving_piece.split(";")[0]
            var from = moving_piece.split(";")[1]
            var _to = casella;
            var elem_from = document.getElementById(from);
            window.enlighted = ""
            elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1])
            elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1])
            // var elem_to = document.getElementById(_to);
            var lst = new Object();
            lst[_to] = piece + ".svg";
            window.reset();
            drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
            moving_pieces[piece] = _to;
            number_of_moves += window.dist(from, _to);
            $("#number_of_moves").html(number_of_moves);
            if (_to == end_position) {
                window.goal_reached()
            }
        }

        window.dist = function () {
            return 1;
        }

        window.enlight(end_position, "orange", true);

        drawChessboard.handleMouseDown_image = function (e) {
            //console.log(e.currentTarget);
            var elem = e.currentTarget;
            var casella = elem.getAttribute("data-casella");
            var type = elem.getAttribute("data-type")
            //console.log("Casella e tipo: " + casella+"-"+type)
            if (window.enlighted == casella) {
                return;
            }
            var can_move = false;
            for (var i in moving_pieces) {
                if (i == type && moving_pieces[i] == casella) {
                    can_move = true;
                    moving_piece = i + ";" + moving_pieces[i];
                    break;
                }
            }
            //console.log("Can Move? "+can_move)
            if (can_move) {
                window.calculatePossibleMoves(casella, type);
                window.enlight(casella, "orange");
            }
        }

        window.calculatePossibleMoves = function (casella, type) {
            possible_moves = new Array();
            switch (type) {
                case "Knight": {
                    var x = casella.charCodeAt(0) - 65 + 1;
                    var y = parseInt(casella[1]);
                    //console.log("Partenza: "+x+" - "+y)
                    possible_moves = pieceMove.moveKnight(casella, x, y);
                }
                    break;
            }
            //console.log(possible_moves);
            if (show_possible_moves) {
                for (var i in possible_moves) {
                    var elem = document.getElementById(possible_moves[i]);
                    caselle_colorate.push(possible_moves[i]);
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
            window.myconfirm_2b("Obiettivo raggiunto", "Hai impiegato " + number_of_moves + " mosse. Vuoi riprovare?", "sì", "no",
                function () {
                    $(this).dialog("close");
                    window.ricomincia();
                    $(this).remove();
                }, function () {
                    $(this).dialog("close");
                    clearInterval(maketimer.myt);
                    maketimer.sec = 0;
                    $(this).remove();
                    window.punti -= number_of_moves;
                    window.myalert("Punti", "Il tuo punteggio è di " + window.punti + " punti!");
                    window.updatePoints(-number_of_moves);
                    drawChessboard.handleMouseDown_casella = function () { }
                    drawChessboard.handleMouseDown_image = function () { }
                    $("#ricomincia").prop("disabled", true);
                }, false);
        }

        window.procedi = function () {
            window.punti = window.getPoints();
            window.punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio è " + window.punti + ".");
            maketimer.sec = 0;
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function () { }
            drawChessboard.handleMouseDown_image = function () { }
            $("#ricomincia").prop("disabled", true);
        }

    }
}

var gioco13b = new Gioco13b();
export { gioco13b };
