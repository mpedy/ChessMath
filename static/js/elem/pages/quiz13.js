import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { getQuiz } from "../../Utility/MyUI.js"
import { PrototipoQuiz } from "../../common/PrototipoQuiz.js";

/* global $ */
class Quiz13 extends PrototipoQuiz {
    constructor(id = 13) {
        super("Q Alfiere quanta distanza 3", "title.question.chessboard.answers");
        this.id = id;
    }
    start() {
        var drawChessboard = new DrawChessboardClass($("#chessboard")[0])
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ "D5": "Bishop.svg" })

        window.enlighted = "";
        window.enlight("E5", "orange", true)
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
        getQuiz(this.maketimer, this.id);
    }
}
var quiz13 = new Quiz13(13);
export { quiz13 };