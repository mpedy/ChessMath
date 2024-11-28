import { MakeTimerClass } from "../maketimernew.js"
import { getQuiz } from "../myui.js";
import { DrawChessboard as DrawChessboardClass } from "../drawchessboardnewnew.js";

var drawChessboard = new DrawChessboardClass()
var maketimer = new MakeTimerClass()

drawChessboard.drawChessboard($("#chessboard")[0])

drawChessboard.drawPieces($("#chessboard")[0], { D5: "Knight.svg" })
enlighted = "";
enlight(E5, "orange")
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
getQuiz(maketimer);