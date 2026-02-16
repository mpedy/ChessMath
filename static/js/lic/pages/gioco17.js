import { MakeTimerClass } from "../../Utility/Maketimer.js"
import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { pieceMove } from "../../Utility/MovePieces.js";

class Gioco17 {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"))
        var maketimer = new MakeTimerClass()
        maketimer.maketimer(document.getElementsByClassName("timer")[0]);
        maketimer.stopTimerFunction = function () {
            // var dis = document.getElementById("gobtn").disabled;
            document.getElementById("gobtn").disabled = true;
            document.getElementById("reset").disabled = true;
            drawChessboard.handleMouseDown_casella = function () { }
            if (maketimer.expired) {
                window.myalert("Tempo scaduto", "Il tuo punteggio è " + window.getPoints())
            } else {
                window.procedi(document.getElementById("gobtn"))
            }
        }
        var dim_queens = 8;
        drawChessboard.drawChessboard(dim_queens)

        var caselle_colorate = new Array();
        var possible_moves = new Array();

        var handleMouseDown_casella = function (e) {
            var elem = e.currentTarget;
            var casella = elem.getAttribute("casella");
            if (caselle_colorate.includes(casella)) {
                caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
                elem.removeChild(elem.children[elem.childElementCount - 1]);
            } else {
                caselle_colorate.push(casella);
                var img = document.createElement("img")
                img.src = "static/img/Queen.svg";
                img.style.width = "100%";
                img.style.zIndex = "2";
                img.style.position = "absolute";
                img.style.left = "0px";
                img.style.top = "0px";
                elem.appendChild(img);
            }
        }

        drawChessboard.handleMouseDown_casella = handleMouseDown_casella;

        window.reset = function () {
            var i;
            for (i in caselle_colorate) {
                var elem = document.getElementById(caselle_colorate[i])
                elem.removeChild(elem.children[elem.childElementCount - 1]);
            }
            caselle_colorate = new Array();
        }

        window.controllaRegine = function (casella) {
            var x = casella.charCodeAt(0) - 65 + 1;
            var y = parseInt(casella[1]);
            possible_moves = pieceMove.moveRook(casella, x, y);
            var pm = possible_moves;
            possible_moves = pieceMove.moveBishop(casella, x, y);
            for (i = 0; i < pm.length; i++) {
                possible_moves.push(pm[i]);
            }
            for (i = 0; i < possible_moves.length; i++) {
                var c = document.getElementById(possible_moves[i]);
                if (c == undefined) {
                    continue;
                }
                if (c.childElementCount > 0 && c.children[0].tagName == "IMG") {
                    window.myalert("Attenzione", "Le regine in " + casella + " e " + c.id + " si guardano");
                    return -1;
                }
            }
            return 0;

        }

        window.procedi = function (btn) {
            btn.disabled = true;
            var correct_answer = false;
            var points = 0;
            if (maketimer.sec > 0) {
                var chess = document.getElementById("chessboard");
                var queens_position = new Array();
                for (var i = 0; i < chess.childElementCount; i++) {
                    if (chess.children[i].childElementCount > 0 && chess.children[i].children[0].tagName == "IMG") {
                        queens_position.push(chess.children[i].id);
                    }
                }
                if (queens_position.length != dim_queens) {
                    window.myalert("Attenzione", "Hai inserito " + queens_position.length + " regine");
                    maketimer.pauseTimer();
                    // maketimer.sec = 0
                    // maketimer.expired = false
                } else {
                    var okpos = 0;
                    for (var q = 0; q < queens_position.length; q++) {
                        var isok = window.controllaRegine(queens_position[q]);
                        okpos = okpos + isok
                        if (isok == -1) {
                            break;
                        }
                    }
                    if (okpos == 0 && maketimer.sec > 0) {
                        points = 50;
                        if (maketimer.time_restarted > 0) {
                            points = parseInt(points / (maketimer.time_restarted + 1));
                        }
                        window.myalert("Risposta Corretta", "Hai guadagnato " + points + " punti");
                        correct_answer = true;
                        maketimer.pauseTimer();
                        // maketimer.sec = 0
                        // maketimer.expired = false
                    }
                }
            }
            window.updatePoints(points);
            window.punti = window.getPoints();
            clearInterval(maketimer.myt);
            // maketimer.sec = 0;
            maketimer.pauseTimer();
            document.getElementById("gobtn").disabled = true;
            document.getElementById("reset").disabled = true;
            drawChessboard.handleMouseDown_casella = function () { }
            drawChessboard.handleMouseDown_image = function () { }
            if (!correct_answer) {
                var gobtn = document.getElementById("gobtn");
                gobtn.disabled = false;
                gobtn.innerText = "Ritenta";
                gobtn.classList.add("retrybtn");
                gobtn.onclick = function () {
                    document.getElementById("reset").disabled = false;
                    gobtn.innerText = "Conferma";
                    gobtn.classList.remove("retrybtn");
                    gobtn.setAttribute("onclick", "procedi(this)");
                    drawChessboard.handleMouseDown_casella = handleMouseDown_casella;
                    window.reset();
                    maketimer.restartTimer();
                }
            }
        }

    }
}

var gioco17 = new Gioco17();
export { gioco17 };