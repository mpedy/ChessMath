import { MakeTimerClass } from "../../Utility/Maketimer.js"
import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { getQuiz } from "../../Utility/MyUI.js";

/* global $ */
class Quiz9 {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass($("#chessboard")[0])
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ D6: "Bishop.svg" })

        var maketimer = new MakeTimerClass()

        window.enlighted = "";
        window.enlight("F6", "orange", true)
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
        getQuiz(maketimer);
    }
}

var quiz9 = new Quiz9();
export { quiz9 };