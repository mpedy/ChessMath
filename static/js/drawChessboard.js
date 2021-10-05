drawChessboard = function (elem) {
  var w = window.innerWidth
  elem.style.height=w+"px";
  elem.style.width=w+"px";
  elem.setAttribute("width",w)
  elem.setAttribute("height",w)
  w = window.innerWidth-40;
  //console.log(w+" - "+h)
  // size of each chess square
  //const squareSize = Math.min(parseInt(w/8), parseInt(h/8));
  const squareSize = parseInt(w/8);
  // position of board's top left
  const boardTopx = 20;
  const boardTopy = 20;
  elem.setAttribute("data-square-size",squareSize);
  elem.setAttribute("data-boardtop-x",boardTopx);
  elem.setAttribute("data-boardtop-y",boardTopy);
  var canvas = elem;
  var context = canvas.getContext("2d");
  context.fillStyle="black";
  context.fillRect(0,0,w+40,w+40);
  for(var i=0; i<8; i++) {
    for(var j=0; j<8; j++) {
      //context.fillStyle = ((i+j)%2==0) ? "white":"black";
      context.fillStyle = ((i+j)%2==0) ? "#eeeed2" : "#769656";
      var xOffset = boardTopx + j*squareSize;
      var yOffset = boardTopy + i*squareSize;
      context.fillRect(xOffset, yOffset, squareSize, squareSize);
    }
  }
  // draw the border around the chessboard
  //context.strokeStyle = "darkred";
  //var old = context.lineWidth;
  //context.lineWidth = "3";
  //context.strokeRect(boardTopx, boardTopy, squareSize*8, squareSize*8);
  context.strokeStyle = "white";
  //context.lineWidth = old;
  context.font = "14px Arial";
  for(var i =1; i<9; i++){
    context.fillText(String.fromCharCode(65+i-1),boardTopx+(i-1)*squareSize+squareSize/2,squareSize*8+boardTopy+squareSize/2);
    context.fillText(9-i, boardTopx/2, i*squareSize+squareSize/4);
  }
  var dpr = window.devicePixelRatio || 1;
  context.scale(dpr, dpr);
  elem.setAttribute("data-dpr",dpr)
}

paint = function(elem, casella, color, sqSize=-1){
  casella = casella.toUpperCase();
  var squareSize = parseInt(elem.getAttribute("data-square-size"));
  var boardTopx  = parseInt(elem.getAttribute("data-boardtop-x"));
  var boardTopy  = parseInt(elem.getAttribute("data-boardtop-y"));
  if(sqSize==-1){
    sqSize = squareSize
    offset = 0;
  }else{
    offset = Math.abs(squareSize-sqSize)/2
  }
  var x = casella[0].charCodeAt(0)-65;
  var y = 8-parseInt(casella[1]);
  var context = elem.getContext("2d");
  context.fillStyle = color;
  context.fillRect(boardTopx+x*squareSize+offset, boardTopy+y*squareSize+offset, sqSize, sqSize);
}

drawPiece = function(elem, casella, img_piece){
  casella = casella.toUpperCase();
  var squareSize = parseInt(elem.getAttribute("data-square-size"));
  var boardTopx  = parseInt(elem.getAttribute("data-boardtop-x"));
  var boardTopy  = parseInt(elem.getAttribute("data-boardtop-y"));
  var x = casella[0].charCodeAt(0)-65;
  var y = 8-parseInt(casella[1]);
  var context = elem.getContext("2d");
  var image = new Image();
  image.onload = function(){
    context.drawImage(image,boardTopx+x*squareSize,boardTopy+y*squareSize, squareSize, squareSize);
  }
  image.src = "static/img/"+img_piece;
}


drawPieces = function(elem, lst){
  var squareSize = parseInt(elem.getAttribute("data-square-size"));
  var boardTopx  = parseInt(elem.getAttribute("data-boardtop-x"));
  var boardTopy  = parseInt(elem.getAttribute("data-boardtop-y"));
  var dpr = parseInt(elem.getAttribute("data-dpr"));
  var context = elem.getContext("2d");
  for(var i in lst){
    //index += 1;
    casella = i.toUpperCase();
    var x = casella[0].charCodeAt(0)-65;
    var y = 8-parseInt(casella[1]);
    var image = document.getElementById("piece_"+lst[i].replaceAll(".svg",""))
    /*
    imgs[index]["img"].onload = function(){
      debugger;
      console.log("Drawing "+i+" - "+ image.src+" "+casella)*/
      context.drawImage(image,(boardTopx+x*squareSize)/dpr,(boardTopy+y*squareSize)/dpr, squareSize/dpr, squareSize/dpr);
    //}
    //imgs[index]["img"].src = "static/img/"+lst[i];
  }
}

originalColor = function(casella){
  var x = casella[0].charCodeAt(0)-65;
  var y = 8-parseInt(casella[1]);
  return ((x+y)%2==0) ? "#eeeed2" : "#769656";
}