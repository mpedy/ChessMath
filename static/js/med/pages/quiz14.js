import { DrawChessboard as DrawChessboardClass } from "../../drawchessboardnewnew.js";
import { MakeTimerClass } from "../../maketimernew.js"
import { getQuiz } from "../../myui.js"

/* global $ */
class Quiz14 {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass()
        var maketimer = new MakeTimerClass()

        drawChessboard.drawChessboard($("#chessboard")[0])
        window.enlighted = "";
        window.enlight("C3", "orange", true);
        window.enlight("F5", "orange", true);
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

const quiz14 = new Quiz14();
export { quiz14 };
