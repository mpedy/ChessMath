import { pieceMove } from "../../movePiecesnew.js";
import { MakeTimerClass } from "../../maketimernew.js"
import { DrawChessboard as DrawChessboardClass } from "../../drawchessboardnewnew.js";

/* global $ */
class Gioco4 {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass()
        var maketimer = new MakeTimerClass()

        maketimer.maketimer(document.getElementsByClassName("timer")[0]);
        maketimer.stopTimerFunction = function () {
            drawChessboard.handleMouseDown_casella = function () { }
            drawChessboard.handleMouseDown_image = function () { }
            $("#ricomincia").prop("disabled", true);
            if (maketimer.expired) {
                window.procedi()
            }
        }

        drawChessboard.drawChessboard(document.getElementById("chessboard"))

        drawChessboard.piece_position = {
            "D5": "Rook.svg",
            "A1": "obstacle.svg",
            "D6": "obstacle.svg",
            "F4": "obstacle.svg",
            "B7": "obstacle.svg",
            "B4": "obstacle.svg",
            "B5": "obstacle.svg",
            "C7": "obstacle.svg",
            "B6": "obstacle.svg",
            "C6": "obstacle.svg"
        }

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

        var caselle_colorate = new Array();

        window.enlighted = "";

        var moving_pieces = {
            "Rook": "D5"
        }
        var moving_piece = "";
        var possible_moves = new Array();
        var end_position = "A8";
        var number_of_moves = 0;
        var show_possible_moves = false;

        window.ricomincia = function () {
            $("#chessboard").html("")[0].style = ""
            drawChessboard.drawChessboard(document.getElementById("chessboard"));
            drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
            moving_pieces = {
                "Rook": "D5"
            }
            window.enlighted = ""
            window.enlight(end_position, "orange", true);
            number_of_moves = 0;
            possible_moves = new Array();
            caselle_colorate = new Array();
            $("#number_of_moves").html(number_of_moves);
        }

        drawChessboard.handleMouseDown_casella = function (e) {
            var elem = e.currentTarget;
            //console.log(elem)
            var casella = elem.getAttribute("casella");
            if (possible_moves.includes(casella)) {
                //possible_moves.splice(possible_moves.indexOf(casella),1);
                //elem.removeChild(elem.children[elem.childElementCount-1]);
                window.move(moving_piece, elem.id);
                moving_piece = "";
                possible_moves = new Array();
                e.preventDefault();
                e.stopPropagation();
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

        window.dist = function (from, to) {
            var x1 = from[1]
            var x2 = to[1]
            var y1 = from.charCodeAt(0) - 65 + 1
            var y2 = to.charCodeAt(0) - 65 + 1
            var d = 0;
            if (x1 == x2) {
                d = Math.abs(y2 - y1);
                //console.log("Distanza: "+(y2-y1))
            } else {
                d = Math.abs(x2 - x1);
                //console.log("Distanza: "+(x2-x1))
            }
            return d;
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
                case "Rook": {
                    var x = casella.charCodeAt(0) - 65 + 1;
                    var y = parseInt(casella[1]);
                    possible_moves = pieceMove.moveRook(casella, x, y);
                }
                    break;
            }
            //console.log(possible_moves);
            if (show_possible_moves) {
                for (var i in possible_moves) {
                    var elem = document.getElementById(possible_moves[i]);
                    caselle_colorate.push(possible_moves[i]);
                    var div = document.createElement("div");
                    div.style.background = "blue";
                    div.style.borderRadius = "50%";
                    div.style.position = "absolute";
                    div.style.left = "20%";
                    div.style.top = "20%";
                    div.style.width = "60%";
                    div.style.height = "60%";
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
            window.myconfirm_2b("Obiettivo raggiunto", "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?", "sì", "no",
                function () {
                    $(this).dialog("close");
                    window.ricomincia();
                    $(this).remove();
                }, function () {
                    $(this).dialog("close");
                    clearInterval(maketimer.myt);
                    maketimer.sec = 0;
                    maketimer.expired = false
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
const gioco4 = new Gioco4();
export { gioco4 };
