import { MakeTimerClass } from "../../Utility/Maketimer.js"
import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { getQuiz } from "../../Utility/MyUI.js";

/* global $ */
class Quiz11 {
    constructor() { }
    start() {

        var drawChessboard = new DrawChessboardClass($("#chessboard")[0])
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ D5: "Bishop.svg" })

        var maketimer = new MakeTimerClass()

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

var quiz11 = new Quiz11();
export { quiz11 };