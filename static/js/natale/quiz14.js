import { MakeTimerClass } from "../maketimernew.js"
import { getQuiz } from "../myui.js";
import { DrawChessboard as DrawChessboardClass } from "../drawchessboardnewnew.js";

var drawChessboard = new DrawChessboardClass()
var maketimer = new MakeTimerClass()

drawChessboard.drawChessboard($("#chessboard")[0])
enlighted = "";
enlight(C3, "orange", true);
enlight(F5, "orange", true);
can_answer = true
drawChessboard.handleMouseDown_casella = function () { }
drawChessboard.handleMouseDown_image = function () { }
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