import { MakeTimerClass } from "../maketimernew.js"
import { pieceMove } from "../movePiecesnew.js";
import { DrawChessboard as DrawChessboardClass } from "../drawchessboardnewnew.js";

var drawChessboard = new DrawChessboardClass()
var maketimer = new MakeTimerClass()

maketimer.maketimer(document.getElementsByClassName("timer")[0]);
maketimer.stopTimerFunction = function () {
    var dis = document.getElementById("gobtn").disabled;
    document.getElementById("gobtn").disabled = true;
    document.getElementById("reset").disabled = true;
    drawChessboard.handleMouseDown_casella = function () { }
    if (!dis) {
        procedi(document.getElementById("gobtn"))
    }
}
drawChessboard.drawChessboard(document.getElementById("chessboard"))

drawChessboard.piece_position = {
    D5: "Knight.svg",
}

drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position)

var caselle_colorate = new Array();
var caselle_corrette = [B4, B6, C3, C7, E3, E7, F4, F6]

drawChessboard.handleMouseDown_casella = function (e) {
    var elem = e.currentTarget;
    casella = elem.getAttribute("casella");
    if (caselle_colorate.includes(casella)) {
        caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
        elem.removeChild(elem.children[elem.childElementCount - 1]);
    } else {
        caselle_colorate.push(casella);
        var div = document.createElement("div");
        div.style.background = "red"
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

calculatePossibleMoves = function (casella, type) {
    possible_moves = new Array();
    switch (type) {
        case "Rook": {
            var x = casella.charCodeAt(0) - 65 + 1;
            var y = parseInt(casella[1]);
            //console.log("Partenza: "+x+" - "+y)
            possible_moves = pieceMove.moveRook(casella, x, y)
        }
            break;
    }
    //console.log(possible_moves);
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


reset = function () {
    for (var i in caselle_colorate) {
        var elem = document.getElementById(caselle_colorate[i])
        elem.removeChild(elem.children[elem.childElementCount - 1]);
    }
    caselle_colorate = new Array();
}

procedi = function (btn) {
    btn.disabled = true;
    var points = 0;
    for (var i in caselle_colorate) {
        if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
        } else {
            points -= 1;
        }
    }
    myalert("Punti", "Hai totalizzato " + points + " punti.");
    updatePoints(points);
    clearInterval(window.myt);
    maketimer.sec = 0;
    document.getElementById("gobtn").disabled = true;
    document.getElementById("reset").disabled = true;
    drawChessboard.handleMouseDown_casella = function () { }
    drawChessboard.handleMouseDown_image = function () { }
}