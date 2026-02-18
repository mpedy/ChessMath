import { MakeTimerClass } from "./Maketimer.js"
import { DrawChessboard as DrawChessboardClass } from "./Drawchessboard.js";


class DrawGame {
    constructor({
        piece_position = {},
        caselle_corrette = [],
        with_timer = true,
        chessboard_dim = 8
    }) {
        this.piece_position = piece_position;
        this.caselle_corrette = caselle_corrette;
        this.with_timer = with_timer;
        this.chessboard_dim = chessboard_dim;
    }
    start() {
        var self = this;
        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"))
        if (this.with_timer) {
            var maketimer = new MakeTimerClass()

            maketimer.maketimer(document.getElementsByClassName("timer")[0]);
            maketimer.stopTimerFunction = function () {
                var dis = document.getElementById("gobtn").disabled;
                document.getElementById("gobtn").disabled = true;
                document.getElementById("reset").disabled = true;
                drawChessboard.handleMouseDown_casella = function () { }
                if (!dis) {
                    window.procedi(document.getElementById("gobtn"))
                }
            }
        }

        drawChessboard.drawChessboard(this.chessboard_dim);

        if (Object.keys(this.piece_position).length > 0) {
            drawChessboard.piece_position = this.piece_position;
            drawChessboard.drawPieces();
        }

        var caselle_colorate = new Array();

        drawChessboard.handleMouseDown_casella = function (e) {
            var elem = e.currentTarget;
            var casella = elem.getAttribute("casella");
            if (caselle_colorate.includes(casella)) {
                caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
                elem.removeChild(elem.children[elem.childElementCount - 1]);
            } else {
                caselle_colorate.push(casella);
                var div = document.createElement("div");
                div.style.background = "red"
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
        drawChessboard.handleMouseDown_image = function () { }

        window.reset = function () {
            for (var i in caselle_colorate) {
                var elem = document.getElementById(caselle_colorate[i])
                elem.removeChild(elem.children[elem.childElementCount - 1]);
            }
            caselle_colorate = new Array();
        }

        window.procedi = function (btn) {
            btn.disabled = true;
            var points = 0;
            for (var i in caselle_colorate) {
                if (self.caselle_corrette.includes(caselle_colorate[i])) {
                    points += 1;
                } else {
                    points -= 1;
                }
            }
            window.myalert("Punti", "Hai guadagnato " + points + " punti.");
            window.updatePoints(points);
            window.punti = window.getPoints();
            clearInterval(maketimer.myt)
            maketimer.sec = 0;
            document.getElementById("gobtn").disabled = true;
            document.getElementById("reset").disabled = true;
            drawChessboard.handleMouseDown_casella = function () { }
            drawChessboard.handleMouseDown_image = function () { }
        }

    }
}

export { DrawGame };