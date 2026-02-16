/* global $ */
export class DrawChessboard {
    constructor(elem) {
        this.handleMouseDown_casella = function () { }
        this.handleMouseDown_image = function () { }
        this.casella;
        this.piece_position;
        this.pieces = new Array()
        this.createObstacles();
        if (elem == undefined) {
            throw new Error("L'elemento non è definito: " + elem)
        }
        this.elem = elem;
    }
    createObstacles() {
        window.obstacles = ["rock-golem-1", "rock-golem", "obstacle"]
    }
    handleClick_casella = function (event) {
        return this.handleMouseDown_casella(event)
    }
    handleClick_image = function (event) {
        return this.handleMouseDown_image(event)
    }
    redraw = function (elem, dim = 8) {
        if (this.elem == undefined) {
            this.elem = elem;
        }
        elem = this.elem
        var _w = Math.min(window.innerWidth, window.outerWidth == 0 ? window.innerWidth : window.outerWidth)
        var w = Math.min(_w, 600)
        elem.style.height = w + "px";
        elem.style.width = w + "px";
        elem.setAttribute("width", w)
        elem.setAttribute("height", w)
        w = _w - 40;
        w = Math.min(w, 600 - 40)
        var squareSize = parseInt(w / dim);
        var boardTopx = 20;
        var boardTopy = 20;
        elem.setAttribute("data-square-size", squareSize);
        elem.setAttribute("data-boardtop-x", boardTopx);
        elem.setAttribute("data-boardtop-y", boardTopy);
        for (var i = 0; i < elem.childElementCount; i++) {
            elem.children[i].style.width = squareSize + "px";
            elem.children[i].style.height = squareSize + "px";
        }
    }

    drawChessboard = function (dim = 8) {
        var _redraw = () => {
            this.redraw.apply(this, [this.elem, dim])
        }
        window.addEventListener("resize", _redraw)
        var _w = Math.min(window.innerWidth, window.outerWidth == 0 ? window.innerWidth : window.outerWidth)
        var w = Math.min(_w, 600)
        this.elem.style.background = "black";
        this.elem.style.height = w + "px";
        this.elem.style.width = w + "px";
        this.elem.style.margin = "auto";
        this.elem.setAttribute("width", w)
        this.elem.setAttribute("height", w)
        this.elem.style.padding = "20px";
        w = _w - 40;
        w = Math.min(w, 600 - 40)
        var squareSize = parseInt(w / dim);
        var boardTopx = 20;
        var boardTopy = 20;
        this.elem.setAttribute("data-square-size", squareSize);
        this.elem.setAttribute("data-boardtop-x", boardTopx);
        this.elem.setAttribute("data-boardtop-y", boardTopy);
        this.elem.setAttribute("data-number-caselle", dim)

        for (var i = 0; i < dim; i++) {
            for (var j = 0; j < dim; j++) {
                var div = document.createElement("div")
                div.style.background = ((i + j) % 2 == 0) ? "#eeeed2" : "#769656";
                div.style.width = squareSize + "px";
                div.style.height = squareSize + "px";
                div.style.display = "inline-block";
                div.style.position = "relative"
                div.setAttribute("casella", String.fromCharCode(65 + j) + "" + (dim - i))
                div.id = String.fromCharCode(65 + j) + "" + (dim - i)
                if ("ontouchstart" in document) {
                    div.addEventListener("touchstart", (e) => {
                        //this.handleMouseDown_casella(e);
                        this.handleClick_casella(e)
                    });
                } else {
                    $(div).mousedown((e) => {
                        //this.handleMouseDown_casella(e);
                        this.handleClick_casella(e)
                    });
                }
                this.elem.appendChild(div)
            }
        }
        var sty = document.createElement("style");
        sty.id = "chessboard_style";
        sty.innerHTML = "";
        for (var i = 1; i <= dim; i++) {
            sty.innerHTML += `div#A${i}:before{content:"${i}"; position: absolute; top: ${(squareSize / 2 - 5)}px; left: -14px;font-size: 12px;top:50%;transform:translate(0,-50%);}`
            sty.innerHTML += `div#${String.fromCharCode(65 + i - 1)}1:after{content:"${String.fromCharCode(65 + i - 1)}"; position: absolute; top: 100%;font-size: 12px;margin:auto;transform:translate(-50%,25%);}`
        }
        var chessboardStyle = document.getElementById("chessboard_style");
        if (!chessboardStyle) {
            document.head.appendChild(sty);
        } else {
            chessboardStyle.innerHTML = sty.innerHTML;
        }
        boardTopy += this.elem.getClientRects()[0].top;
        boardTopx += this.elem.getClientRects()[0].left;
    }
    drawPieces = function (lst = undefined) {
        if (lst != undefined) {
            this.piece_position = lst;
        }
        if (this.piece_position == undefined) {
            throw new Error("La posizione dei pezzi non è definita")
        }
        for (var i in this.piece_position) {
            this.casella = i.toUpperCase();
            var image = new Image();
            image.src = "static/img/" + this.piece_position[i]
            image.style.width = "100%"
            image.style.zIndex = "2"
            image.style.position = "absolute"
            image.style.left = "0"
            image.style.top = "0"
            image.setAttribute("data-casella", this.casella)
            image.setAttribute("data-type", this.piece_position[i].replace(".svg", ""))
            document.getElementById(this.casella).appendChild(image)
            if ("ontouchstart" in document) {
                image.addEventListener("touchstart", (e) => {
                    //this.handleMouseDown_image(e);
                    this.handleClick_image(e)
                });
            } else {
                $(image).mousedown((e) => {
                    //this.handleMouseDown_image(e);
                    this.handleClick_image(e)
                })
            }
        }
    }
    drawHints = function (cas, style) {
        if (!style) {
            style = "background: red; border-radius: 50%; position: absolute; left: 10%; width: 80%; height: 80%; z-index: 1"
        }
        for (var i in cas) {
            var elem = $("#" + cas[i])[0]
            var div = document.createElement("div");
            div.style.cssText = style
            div.style.borderRadius = "2px"
            elem.appendChild(div);
        }
    }
}