import { DrawChessboard as DrawChessboardClass } from "../drawchessboardnewnew.js";
import { MakeTimerClass } from "../maketimernew.js"
import { getQuiz } from "../myui.js"

var maketimer = new MakeTimerClass()
var drawChessboard = new DrawChessboardClass()

drawChessboard.drawChessboard($("#chessboard")[0])

drawChessboard.drawPieces($("#chessboard")[0], { D5: "Bishop.svg" })
can_answer = true
maketimer.stopTimerFunction = function (pressed) {
	try {
		if (pressed == undefined) {
			pressed = false;
		}
	} catch (errore) {
		pressed = false;
	}
	if (!pressed) {
		myalert("Tempo esaurito!", "E' scaduto il tempo!");
	}
	can_answer = false
	$(".risposta").toggleClass("disabled")
}
getQuiz();