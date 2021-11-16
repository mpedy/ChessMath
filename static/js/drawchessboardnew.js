handleMouseDown_casella = function(){}
handleMouseDown_image = function(){}
var obstacles = ["rock-golem-1", "rock-golem","obstacle"]

redraw = function(elem){
    var _w = Math.min(window.innerWidth, window.outerWidth == 0 ? window.innerWidth : window.outerWidth)
    var w = Math.min(_w,600)
    elem.style.height=w+"px";
    elem.style.width=w+"px";
    elem.setAttribute("width",w)
    elem.setAttribute("height",w)
    w = _w-40;
    w = Math.min(w,600-40)
    const squareSize = parseInt(w/8);
    var boardTopx = 20;
    var boardTopy = 20;
    elem.setAttribute("data-square-size",squareSize);
    elem.setAttribute("data-boardtop-x",boardTopx);
    elem.setAttribute("data-boardtop-y",boardTopy);
    for(var i=0; i< elem.childElementCount; i++){
        elem.children[i].style.width=squareSize+"px";
        elem.children[i].style.height=squareSize+"px";
    }
    /*boardTopy += elem.getClientRects()[0].top;
    boardTopx += elem.getClientRects()[0].left;*/
}

drawChessboard = function(elem){
    var _redraw = function(){
        redraw.apply(this,[elem])
    }
    window.addEventListener("resize",_redraw)
    var _w = Math.min(window.innerWidth, window.outerWidth==0? window.innerWidth : window.outerWidth)
    var w = Math.min(_w,600)
    elem.style.background="black";
    elem.style.height=w+"px";
    elem.style.width=w+"px";
    elem.style.margin="auto";
    elem.setAttribute("width",w)
    elem.setAttribute("height",w)
    elem.style.padding="20px";
    w = _w-40;
    w = Math.min(w,600-40)
    const squareSize = parseInt(w/8);
    var boardTopx = 20;
    var boardTopy = 20;
    elem.setAttribute("data-square-size",squareSize);
    elem.setAttribute("data-boardtop-x",boardTopx);
    elem.setAttribute("data-boardtop-y",boardTopy);
    elem.setAttribute("data-number-caselle",8)

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
            if("ontouchstart" in document){
                div.addEventListener("touchstart",function (e){
                    handleMouseDown_casella(e);
                });
            }else{
                $(div).mousedown(function (e) {
                    handleMouseDown_casella(e);
                });
            }
            elem.appendChild(div)
        }
    }
    $('<style>'+
        'div#A8:before{content:"'+8+'"; position: absolute; top: '+(squareSize/2-5)+'px; left: -14px;font-size: 12px;}'+
        'div#A7:before{content:"'+7+'"; position: absolute; top: '+(squareSize/2-5)+'px; left: -14px;font-size: 12px;}'+
        'div#A6:before{content:"'+6+'"; position: absolute; top: '+(squareSize/2-5)+'px; left: -14px;font-size: 12px;}'+
        'div#A5:before{content:"'+5+'"; position: absolute; top: '+(squareSize/2-5)+'px; left: -14px;font-size: 12px;}'+
        'div#A4:before{content:"'+4+'"; position: absolute; top: '+(squareSize/2-5)+'px; left: -14px;font-size: 12px;}'+
        'div#A3:before{content:"'+3+'"; position: absolute; top: '+(squareSize/2-5)+'px; left: -14px;font-size: 12px;}'+
        'div#A2:before{content:"'+2+'"; position: absolute; top: '+(squareSize/2-5)+'px; left: -14px;font-size: 12px;}'+
        'div#A1:before{content:"'+1+'"; position: absolute; top: '+(squareSize/2-5)+'px; left: -14px;font-size: 12px;}'+

        'div#A1:after{content:"A"; position: absolute; top: 100%;font-size: 12px;margin:auto;}'+
        'div#B1:after{content:"B"; position: absolute; top: 100%;font-size: 12px;margin:auto;}'+
        'div#C1:after{content:"C"; position: absolute; top: 100%;font-size: 12px;margin:auto;}'+
        'div#D1:after{content:"D"; position: absolute; top: 100%;font-size: 12px;margin:auto;}'+
        'div#E1:after{content:"E"; position: absolute; top: 100%;font-size: 12px;margin:auto;}'+
        'div#F1:after{content:"F"; position: absolute; top: 100%;font-size: 12px;margin:auto;}'+
        'div#G1:after{content:"G"; position: absolute; top: 100%;font-size: 12px;margin:auto;}'+
        'div#H1:after{content:"H"; position: absolute; top: 100%;font-size: 12px;margin:auto;}'+

    '</style>').appendTo('head');
    boardTopy += elem.getClientRects()[0].top;
    boardTopx += elem.getClientRects()[0].left;
    /*for(var i=1; i<9; i++){
        var div = document.createElement("div");
        div.innerText=9-i;//                                                           5 per i 10px del font-size
        div.style="position: absolute; top: "+(boardTopy+squareSize/2+squareSize*(i-1)-5)+"px; left: "+boardTopx/2+"px; color: white; font-size: 10px";
        elem.appendChild(div)
        div = document.createElement("div")
        div.innerText = String.fromCharCode(65+i-1)
        div.style="position: absolute; top: "+(w+boardTopy)+"px; left: "+(boardTopx+squareSize/2+squareSize*(i-1)-5)+"px; color: white; font-size: 10px";
        elem.appendChild(div)
    }*/
}


drawPieces = function(elem, lst){
    var squareSize = parseInt(elem.getAttribute("data-square-size"));
    var boardTopx  = parseInt(elem.getAttribute("data-boardtop-x"));
    var boardTopy  = parseInt(elem.getAttribute("data-boardtop-y"));
    for(var i in lst){
        casella = i.toUpperCase();
        var image = new Image();
        image.src = "static/img/"+lst[i]
        image.style.width="100%"
        image.style.zIndex="2"
        image.style.position="absolute"
        image.style.left="0"
        image.style.top="0"
        image.setAttribute("data-casella",casella)
        image.setAttribute("data-type",lst[i].replace(".svg",""))
        document.getElementById(casella).appendChild(image)
        $(image).mousedown(function (e) {
            handleMouseDown_image(e);
        })
    }
}


redraw_bis = function(elem,dim){
    var _w = Math.min(window.innerWidth, window.outerWidth == 0 ? window.innerWidth : window.outerWidth)
    var w = Math.min(_w,600)
    elem.style.height=w+"px";
    elem.style.width=w+"px";
    elem.setAttribute("width",w)
    elem.setAttribute("height",w)
    w = _w-40;
    w = Math.min(w,600-40)
    const squareSize = parseInt(w/dim);
    var boardTopx = 20;
    var boardTopy = 20;
    elem.setAttribute("data-square-size",squareSize);
    elem.setAttribute("data-boardtop-x",boardTopx);
    elem.setAttribute("data-boardtop-y",boardTopy);
    for(var i=0; i< elem.childElementCount; i++){
        elem.children[i].style.width=squareSize+"px";
        elem.children[i].style.height=squareSize+"px";
    }
    /*boardTopy += elem.getClientRects()[0].top;
    boardTopx += elem.getClientRects()[0].left;*/
}

drawChessboard_bis = function(elem,dim){
    var _redraw = function(){
        redraw_bis.apply(this,[elem,dim])
    }
    window.addEventListener("resize",_redraw)
    var _w = Math.min(window.innerWidth, window.outerWidth==0? window.innerWidth : window.outerWidth)
    var w = Math.min(_w,600)
    elem.style.background="black";
    elem.style.height=w+"px";
    elem.style.width=w+"px";
    elem.style.margin="auto";
    elem.setAttribute("width",w)
    elem.setAttribute("height",w)
    elem.style.padding="20px";
    w = _w-40;
    w = Math.min(w,600-40)
    const squareSize = parseInt(w/dim);
    var boardTopx = 20;
    var boardTopy = 20;
    elem.setAttribute("data-square-size",squareSize);
    elem.setAttribute("data-boardtop-x",boardTopx);
    elem.setAttribute("data-boardtop-y",boardTopy);
    elem.setAttribute("data-number-caselle",dim)

    for(var i=0; i<dim; i++){
        for(var j=0; j<dim; j++){
            var div = document.createElement("div")
            div.style.background = ((i+j)%2==0) ? "#eeeed2" : "#769656";
            div.style.width=squareSize+"px";
            div.style.height=squareSize+"px";
            div.style.display="inline-block";
            div.style.position="relative"
            div.setAttribute("casella",String.fromCharCode(65+j)+""+(dim-i))
            div.id = String.fromCharCode(65+j)+""+(dim-i)
            if("ontouchstart" in document){
                div.addEventListener("touchstart",function (e){
                    handleMouseDown_casella(e);
                });
            }else{
                $(div).mousedown(function (e) {
                    handleMouseDown_casella(e);
                });
            }
            elem.appendChild(div)
        }
    }
    var css_str = "<style>";
    for(var i=0; i<dim; i++){
        css_str = css_str+"div#A"+(i+1)+":before{content:\""+(i+1)+"\"; position: absolute; top: "+(squareSize/2-5)+"px; left: -14px;font-size: 12px;}";
        css_str = css_str+"div#"+String.fromCharCode(i+65)+"1:after{content:\""+String.fromCharCode(i+65)+"\"; position: absolute; top: 100%;font-size: 12px;margin:auto;}";
    }
    css_str = css_str+ "</style>";
    $(css_str).appendTo("head");
    boardTopy += elem.getClientRects()[0].top;
    boardTopx += elem.getClientRects()[0].left;
}