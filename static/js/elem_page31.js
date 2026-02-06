import { DrawChessboard as DrawChessboardClass } from "./drawchessboardnewnew.js";
import { getQuiz } from "./myui.js"
import { MakeTimerClass } from "./maketimernew.js"

class Page31 {
    constructor() { }
    start() {
        var maketimer = new MakeTimerClass()
        var drawChessboard = new DrawChessboardClass()

        drawChessboard.drawChessboard($("#chessboard")[0])

        drawChessboard.drawPieces($("#chessboard")[0], { D5: "Bishop.svg" })
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
const page31 = new Page31();
export { page31 };