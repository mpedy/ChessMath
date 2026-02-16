import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { getQuiz } from "../../Utility/MyUI.js"
import { MakeTimerClass } from "../../Utility/Maketimer.js"

/* global $ */
class Quiz11 {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass($("#chessboard")[0])
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ "D3": "Bishop.svg" })

        var maketimer = new MakeTimerClass()

        window.enlighted = "";
        window.enlight("B5", "orange", true)
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
var quiz11 = new Quiz11();
export { quiz11 };
