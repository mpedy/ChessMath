import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { getQuiz } from "../../Utility/MyUI.js";
import { PrototipoQuiz } from "../../common/PrototipoQuiz.js";

/* global $ */
class Quiz10 extends PrototipoQuiz {
    constructor(name = "quiz10", id = 10) {
        super(name, "title.question.chessboard.answers");
        this.id = id;
    }
    start() {
        var drawChessboard = new DrawChessboardClass($("#chessboard")[0])
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ D6: "Bishop.svg" })

        window.enlighted = ""
        window.enlight("E6", "orange", true)
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

var quiz10 = new Quiz10("Q Alfiere distanza 3", 10);
export { quiz10 };