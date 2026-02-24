import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { getQuiz } from "../../Utility/MyUI.js"
import { PrototipoQuiz } from "../../common/PrototipoQuiz.js";

/* global $ */
class Quiz14 extends PrototipoQuiz {
    constructor() {
        super("quiz14", "title.question.chessboard.answers");
    }
    start() {
        var drawChessboard = new DrawChessboardClass($("#chessboard")[0])
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ D5: "Bishop.svg" })

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
var quiz14 = new Quiz14();
export { quiz14 };