drawChessboard = function(elem){
    var w = window.innerWidth
    elem.style.background="black";
    elem.style.height=w+"px";
    elem.style.width=w+"px";
    elem.setAttribute("width",w)
    elem.setAttribute("height",w)
    elem.style.padding="20px";
    w = window.innerWidth-40;
    const squareSize = parseInt(w/8);
    var boardTopx = 20;
    var boardTopy = 20;
    elem.setAttribute("data-square-size",squareSize);
    elem.setAttribute("data-boardtop-x",boardTopx);
    elem.setAttribute("data-boardtop-y",boardTopy);

    for(var i=0; i<8; i++){
        for(var j=0; j<8; j++){
            var div = document.createElement("div")
            div.style.background = ((i+j)%2==0) ? "#eeeed2" : "#769656";
            div.style.width=squareSize+"px";
            div.style.height=squareSize+"px";
            div.style.display="inline-block";
            div.style.position="relative"
            div.setAttribute("casella",String.fromCharCode(65+j)+""+(8-i))
            div.id = String.fromCharCode(65+j)+""+(8-i)
            $(div).mousedown(function (e) {
                handleMouseDown_casella(e);
            });
            elem.appendChild(div)
        }
    }
    boardTopy += elem.getClientRects()[0].top;
    boardTopx += elem.getClientRects()[0].left;
    for(var i=1; i<9; i++){
        var div = document.createElement("div");
        div.innerText=9-i;//                                                           5 per i 10px del font-size
        div.style="position: absolute; top: "+(boardTopy+squareSize/2+squareSize*(i-1)-5)+"px; left: "+boardTopx/2+"px; color: white; font-size: 10px";
        elem.appendChild(div)
        div = document.createElement("div")
        div.innerText = String.fromCharCode(65+i-1)
        div.style="position: absolute; top: "+(w+boardTopy)+"px; left: "+(boardTopx+squareSize/2+squareSize*(i-1)-5)+"px; color: white; font-size: 10px";
        elem.appendChild(div)
    }
}


drawPieces = function(elem, lst){
    var squareSize = parseInt(elem.getAttribute("data-square-size"));
    var boardTopx  = parseInt(elem.getAttribute("data-boardtop-x"));
    var boardTopy  = parseInt(elem.getAttribute("data-boardtop-y"));
    for(var i in lst){
        casella = i.toUpperCase();
        //var x = casella[0].charCodeAt(0)-65;
        //var y = 8-parseInt(casella[1]);
        var image = new Image();
        image.src = "static/img/"+lst[i]
        image.style="width: 100%;z-index: 2; position: absolute; left: 0; top: 0;";
        document.getElementById(casella).appendChild(image)
    }
}