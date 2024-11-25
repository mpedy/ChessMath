import { MakeTimerClass } from "../maketimernew.js"
import { DrawChessboard as DrawChessboardClass } from "../drawchessboardnewnew.js";
import { getQuiz } from "../myui.js";

var drawChessboard = new DrawChessboardClass()
var maketimer = new MakeTimerClass()

drawChessboard.drawChessboard($("#chessboard")[0])

drawChessboard.drawPieces($("#chessboard")[0], { D3: "Bishop.svg" })

enlighted = "";
enlight(B5, "orange", true)
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