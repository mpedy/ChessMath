import { PrototipoQuiz } from "../../common/PrototipoQuiz.js";
import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { getQuiz } from "../../Utility/MyUI.js"

/* global $ */
class Quiz11 extends PrototipoQuiz {
    constructor(id = 11) {
        super("Q Alfiere caselle cfr 1", "title.question.chessboard.answers");
        this.id = id;
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
        getQuiz(this.maketimer, this.id);

    }
}

var quiz11 = new Quiz11(11);
export { quiz11 };
