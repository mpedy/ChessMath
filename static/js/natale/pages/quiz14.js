import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { getQuiz } from "../../Utility/MyUI.js";
import { PrototipoGame } from "../../common/PrototipoGame.js";

/* global $ */
class Quiz14 extends PrototipoGame {
    constructor() {
        super();
    }
    start() {
        var drawChessboard = new DrawChessboardClass($("#chessboard")[0])
        drawChessboard.drawChessboard()

        window.enlighted = "";
        window.enlight("C3", "orange", true);
        window.enlight("F5", "orange", true);
        window.can_answer = true
        drawChessboard.handleMouseDown_casella = function () { }
        drawChessboard.handleMouseDown_image = function () { }
        this.maketimer.stopTimerFunction = function (pressed) {
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
        getQuiz(this.maketimer);
    }
}

var quiz14 = new Quiz14();
export { quiz14 };