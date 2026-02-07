import { MakeTimerClass } from "../../maketimernew.js"
import { DrawChessboard as DrawChessboardClass } from "../../drawchessboardnewnew.js";
import { getQuiz } from "../../myui.js";

/* global $ */
class Quiz11 {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass()
        var maketimer = new MakeTimerClass()

        drawChessboard.drawChessboard($("#chessboard")[0])

        drawChessboard.drawPieces($("#chessboard")[0], { D5: "Bishop.svg" })
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

const quiz11 = new Quiz11();
export { quiz11 };