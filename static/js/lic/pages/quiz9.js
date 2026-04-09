import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { getQuiz } from "../../Utility/MyUI.js";
import { PrototipoQuiz } from "../../common/PrototipoQuiz.js";

/* global $ */
class Quiz9 extends PrototipoQuiz {
    constructor(name = "quiz9") {
        super(name, "title.question.chessboard.answers");
    }
    start() {
        var drawChessboard = new DrawChessboardClass($("#chessboard")[0])
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ D6: "Bishop.svg" })

        window.enlighted = "";
        window.enlight("F6", "orange", true)
        window.can_answer = true
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

var quiz9 = new Quiz9("Q Alfiere distanza 2");
export { quiz9 };