import { DrawChessboard as DrawChessboardClass } from "../../drawchessboardnewnew.js";
import { MakeTimerClass } from "../../maketimernew.js"
import { getQuiz } from "../../myui.js"

class Quiz9 {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass()
        var maketimer = new MakeTimerClass()

        drawChessboard.drawChessboard($("#chessboard")[0])

        drawChessboard.drawPieces($("#chessboard")[0], { D6: "Bishop.svg" })

        window.enlighted = "";
        window.enlight(F6, "orange", true)
        window.can_answer = true
        maketimer.stopTimerFunction = function (pressed) {
            try {
                if (pressed == undefined) {
                    pressed = false;
                }
            } catch (errore) {
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

const quiz9 = new Quiz9();
export { quiz9 };
