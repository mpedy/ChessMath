import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { MakeTimerClass } from "../../Utility/Maketimer.js"
import { getQuiz } from "../../Utility/MyUI.js"

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
            } catch {
                pressed = false;
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
