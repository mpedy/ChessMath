import { DrawChessboard as DrawChessboardClass } from "../../drawchessboardnewnew.js";
import { getQuiz } from "../../myui.js"
import { MakeTimerClass } from "../../maketimernew.js"

/* global $ */
class Quiz12 {
    constructor() { }
    start() {

        var maketimer = new MakeTimerClass()
        var drawChessboard = new DrawChessboardClass()

        drawChessboard.drawChessboard($("#chessboard")[0])

        drawChessboard.drawPieces($("#chessboard")[0], { "D6": "Bishop.svg" })

        window.enlighted = "";
        window.enlight("F6", "orange", true)
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
        getQuiz();
    }
}
const quiz12 = new Quiz12();
export { quiz12 };