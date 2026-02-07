import { DrawChessboard as DrawChessboardClass } from "../../drawchessboardnewnew.js";
import { MakeTimerClass } from "../../maketimernew.js"
import { getQuiz } from "../../myui.js"

class Quiz8 {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass()
        var maketimer = new MakeTimerClass()

        drawChessboard.drawChessboard($("#chessboard")[0])

        drawChessboard.drawPieces($("#chessboard")[0], { D3: "Bishop.svg" })

        window.enlighted = "";
        window.enlight(B5, "orange", true)
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

const quiz8 = new Quiz8();
export { quiz8 };
