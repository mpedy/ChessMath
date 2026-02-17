import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { MakeTimerClass } from "../../Utility/Maketimer.js"
import { getQuiz } from "../../Utility/MyUI.js"

/* global $ */
class Quiz10 {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass($("#chessboard")[0])
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ "D6": "Bishop.svg" })

        var maketimer = new MakeTimerClass()

        window.enlighted = ""
        window.enlight("E6", "orange", true)
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

var quiz10 = new Quiz10();
export { quiz10 };
