import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { MakeTimerClass } from "../../Utility/Maketimer.js"

class Gioco5 {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass()
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

        drawChessboard.drawChessboard(document.getElementById("chessboard"))

        drawChessboard.piece_position = {
            "D5": "Rook.svg",
        }

        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

        var caselle_colorate = new Array();
        var caselle_corrette = ["D6", "E5", "D4", "C5"]

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
                if (caselle_corrette.includes(caselle_colorate[i])) {
                    points += 1;
                } else {
                    points -= 1;
                }
            }
            window.myalert("Risultato", "Hai guadagnato " + points + " punti.");
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
var gioco5 = new Gioco5();
export { gioco5 };