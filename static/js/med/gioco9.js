import { MakeTimerClass } from "../maketimernew.js"
import { pieceMove } from "../movePiecesnew.js";
import { DrawChessboard as DrawChessboardClass } from "../drawchessboardnewnew.js";

var drawChessboard = new DrawChessboardClass()
var maketimer = new MakeTimerClass()

maketimer.maketimer(document.getElementsByClassName("timer")[0]);
maketimer.stopTimerFunction = function () {
	drawChessboard.handleMouseDown_casella = function () { }
	drawChessboard.handleMouseDown_image = function () { }
	$("#ricomincia").prop("disabled", true);
	procedi()
}

drawChessboard.drawChessboard(document.getElementById("chessboard"))

drawChessboard.piece_position = {
	A2: "Bishop.svg",
	D4: "obstacle.svg",
	E5: "obstacle.svg",
	F6: "obstacle.svg",
	G7: "obstacle.svg",
	H3: "obstacle.svg",
	B7: "obstacle.svg",
	A8: "obstacle.svg",
	C6: "obstacle.svg",
	G3: "obstacle.svg"
}

drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

var caselle_colorate = new Array();
var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1]

enlighted = "";

var moving_pieces = {
	"Bishop": A2
}
var moving_piece = "";
var possible_moves = new Array();
var obstacles = ["rock-golem-1", "rock-golem", "obstacle"]
var end_position = H7;
var number_of_moves = 0;
var show_possible_moves = false;

ricomincia = function () {
	$("#chessboard").html("")[0].style = ""
	drawChessboard.drawChessboard(document.getElementById("chessboard"));
	drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
	moving_pieces = {
		"Bishop": A2
	}
	enlighted = ""
	enlight(end_position, "orange", true);
	number_of_moves = 0;
	$("#number_of_moves").html(number_of_moves);
	possible_moves = new Array();
	caselle_colorate = new Array();
}

drawChessboard.handleMouseDown_casella = function (e) {
	var elem = e.currentTarget;
	//console.log(elem)
	casella = elem.getAttribute("casella");
	if (possible_moves.includes(casella)) {
		move(moving_piece, elem.id);
		moving_piece = "";
		possible_moves = new Array();
	} else {
		//console.log("non sposto" + moving_piece)
	}
}

move = function (moving_piece, casella) {
	//console.log("sposto "+moving_piece+ " in "+casella);
	var piece = moving_piece.split(";")[0]
	var from = moving_piece.split(";")[1]
	var _to = casella;
	var elem_from = document.getElementById(from);
	enlighted = ""
	elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1])
	elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1])
	var elem_to = document.getElementById(_to);
	var lst = new Object();
	lst[_to] = piece + ".svg";
	reset();
	drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
	moving_pieces[piece] = _to;
	number_of_moves += dist(from, _to);
	$("#number_of_moves").html(number_of_moves);
	if (_to == end_position) {
		goal_reached()
	}
}

dist = function (from, to) {
	var x1 = from[1]
	var x2 = to[1]
	var y1 = from.charCodeAt(0) - 65 + 1
	var y2 = to.charCodeAt(0) - 65 + 1
	var d = 0;
	if (x1 == x2) {
		d = Math.abs(y2 - y1);
		//console.log("Distanza: "+(y2-y1))
	} else {
		d = Math.abs(x2 - x1);
		//console.log("Distanza: "+(x2-x1))
	}
	return d;
}

enlight(end_position, "orange", true);

drawChessboard.handleMouseDown_image = function (e) {
	//console.log(e.currentTarget);
	var elem = e.currentTarget;
	var casella = elem.getAttribute("data-casella");
	var type = elem.getAttribute("data-type")
	//console.log("Casella e tipo: " + casella+"-"+type)
	if (enlighted == casella) {
		return;
	}
	var can_move = false;
	for (var i in moving_pieces) {
		if (i == type && moving_pieces[i] == casella) {
			can_move = true;
			moving_piece = i + ";" + moving_pieces[i];
			break;
		}
	}
	//console.log("Can Move? "+can_move)
	if (can_move) {
		calculatePossibleMoves(casella, type);
		enlight(casella, "orange");
	}
}

calculatePossibleMoves = function (casella, type) {
	possible_moves = new Array();
	switch (type) {
		case "Bishop": {
			var x = casella.charCodeAt(0) - 65 + 1;
			var y = parseInt(casella[1]);
			possible_moves = pieceMove.moveBishop(casella, x, y);
		}
			break;
	}
	//console.log(possible_moves);
	if (show_possible_moves) {
		for (var i in possible_moves) {
			var elem = document.getElementById(possible_moves[i]);
			caselle_colorate.push(possible_moves[i]);
			var div = document.createElement("div");
			div.style.background = "blue"
			div.style.borderRadius = "50%"
			div.style.position = "absolute"
			div.style.left = "10%"
			div.style.top = "10%"
			div.style.width = "80%"
			div.style.height = "80%"
			div.style.zIndex = "1";
			elem.appendChild(div);
		}
	}
}


reset = function () {
	for (var i in caselle_colorate) {
		var elem = document.getElementById(caselle_colorate[i])
		elem.removeChild(elem.children[elem.childElementCount - 1]);
	}
	caselle_colorate = new Array();
}

goal_reached = function () {
	punti = getPoints();
	myconfirm_2b("Obiettivo raggiunto", "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?", "sì", "no",
		function () {
			$(this).dialog("close");
			ricomincia();
			$(this).remove();
		}, function () {
			$(this).dialog("close");
			clearInterval(window.myt);
			maketimer.sec = 0;
            maketimer.expired = false
			$(this).remove();
			punti -= number_of_moves;
			myalert("Punti", "Il tuo punteggio è di " + punti + " punti!");
			updatePoints(-number_of_moves);
			drawChessboard.handleMouseDown_casella = function () { }
			drawChessboard.handleMouseDown_image = function () { }
			$("#ricomincia").prop("disabled", true);
		}, false);
}

procedi = function () {
	punti = getPoints();
	punti -= number_of_moves;
	myalert("Punti", "Il tuo punteggio è " + punti + ".");
	maketimer.sec = 0;
	updatePoints(-number_of_moves);
	drawChessboard.handleMouseDown_casella = function () { }
	drawChessboard.handleMouseDown_image = function () { }
	$("#ricomincia").prop("disabled", true);
}
