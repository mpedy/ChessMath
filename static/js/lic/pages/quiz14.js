import { MakeTimerClass } from "../../Utility/Maketimer.js"
import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { getQuiz } from "../../Utility/MyUI.js";

/* global $ */
class Quiz14 {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass($("#chessboard")[0])
        drawChessboard.drawChessboard()

        var maketimer = new MakeTimerClass()

        window.enlighted = "";
        window.enlight("C3", "orange", true);
        window.enlight("F5", "orange", true);
        window.can_answer = true
        drawChessboard.handleMouseDown_casella = function () { }
        drawChessboard.handleMouseDown_image = function () { }
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
        getQuiz(maketimer);
    }
}

var quiz14 = new Quiz14();
export { quiz14 };