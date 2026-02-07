import { MakeTimerClass } from "../../maketimernew.js"
import { DrawChessboard as DrawChessboardClass } from "../../drawchessboardnewnew.js";
import { getQuiz } from "../../myui.js";

/* global $ */
class Quiz10 {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass()
        var maketimer = new MakeTimerClass()

        drawChessboard.drawChessboard($("#chessboard")[0])

        drawChessboard.drawPieces($("#chessboard")[0], { D6: "Bishop.svg" })
        window.enlighted = ""
        window.enlight("E6", "orange", true)
        window.can_answer = true
        maketimer.stopTimerFunction = function (pressed) {
            try {
                if (pressed == undefined) {
                    pressed = false;
                }
            } catch (errore) {
                pressed = false;
                console.error(errore);
            }
            if (!pressed) {
                window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
            }
            window.can_answer = false
            $(".risposta").toggleClass("disabled")
        }
        getQuiz(maketimer);
    }
}

const quiz10 = new Quiz10();
export { quiz10 };