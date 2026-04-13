import { PrototipoQuiz } from "../../common/PrototipoQuiz.js";
import { DrawChessboard as DrawChessboardClass } from "../../Utility/Drawchessboard.js";
import { getQuiz } from "../../Utility/MyUI.js"

/* global $ */
class Quiz9 extends PrototipoQuiz {
    constructor(id = 9) {
        super("Q Alfiere distanza 2", "title.question.chessboard.answers");
        this.id = id;
    }
    start() {
        var drawChessboard = new DrawChessboardClass($("#chessboard")[0])
        drawChessboard.drawChessboard()
        drawChessboard.drawPieces({ "D6": "Bishop.svg" })

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
        getQuiz(this.maketimer, this.id);

    }
}

var quiz9 = new Quiz9(9);
export { quiz9 };
