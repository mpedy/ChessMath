import {DrawChessboard as DrawChessboardClass } from "../drawchessboardnewnew.js";

var drawChessboard = new DrawChessboardClass()
drawChessboard.drawChessboard(document.getElementById("chessboard"))

drawChessboard.piece_position={
	D5: "Knight.svg",
}

drawChessboard.drawPieces(document.getElementById("chessboard"),drawChessboard.piece_position)

var cas = [B4,B6,C3,C7,E3,E7,F4,F6]

for(var i in cas){
	var elem = $("#"+cas[i])[0]
	var div = document.createElement("div");
	div.style.background="red"
    div.style.borderRadius="50%"
    div.style.position="absolute"
    div.style.left="10%"
    div.style.top="10%"
    div.style.width="80%"
    div.style.height="80%"
    div.style.zIndex="1";
	elem.appendChild(div);
}

drawChessboard.handleMouseDown_casella = function(){}
drawChessboard.handleMouseDown_image = function(){}