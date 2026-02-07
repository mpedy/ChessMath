(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // static/js/prototipo.js
  var Prototipo = class {
    constructor() {
    }
    dismount() {
    }
    mount() {
    }
  };

  // static/js/ascolta.js
  var Ascolta = class {
    constructor() {
    }
    start() {
    }
  };
  var ascolta = new Ascolta();

  // static/js/maketimernew.js
  var MakeTimerClass = class {
    constructor() {
      __publicField(this, "maketimer", function(elem) {
        this.hash = this.calculateHash();
        var timer = elem;
        var totsec = parseInt(timer.getAttribute("data-second"));
        var height = timer.getAttribute("data-height") || "50px";
        var width = timer.getAttribute("data-width") || "100%";
        this.sec = totsec;
        var txt = document.createElement("span");
        txt.innerText = "Tempo rimanente: " + this.sec + " secondi";
        txt.style.margin = "40px";
        txt.style.fontSize = "16px";
        timer.appendChild(txt);
        var box = document.createElement("div");
        box.style.width = width;
        box.style.height = height;
        box.style.background = "black";
        box.style.position = "relative";
        box.style.margin = "auto";
        var clessidra = document.createElement("div");
        clessidra.style.width = "100%";
        clessidra.style.height = "100%";
        clessidra.style.background = "white";
        clessidra.style.position = "absolute";
        box.appendChild(clessidra);
        box.style.border = "2px solid white";
        timer.appendChild(box);
        this.myt = setInterval(() => {
          this.sec -= 1;
          console.log("active", this.hash);
          if (this.calculateHash() != this.hash) {
            clearInterval(this.myt);
            return;
          }
          if (this.sec <= 0) {
            clearInterval(this.myt);
            clessidra.style.width = "0px";
            this.stopTimerFunction();
          } else {
            clessidra.style.width = this.sec * 100 / totsec + "%";
          }
          txt.innerText = "Tempo rimanente: " + this.sec + " secondi";
        }, 1e3);
      });
      this.sec = 0;
      this.stopTimerFunction = function() {
      };
      this.myt;
      this.expired = true;
      this.hash;
    }
    calculateHash() {
      return codice + "_" + page;
    }
  };

  // static/js/myui.js
  var myconfirm = function(title, text, yes_btn, no_btn, f1, f2, closable) {
    try {
      if (closable == void 0) {
        closable = true;
      }
    } catch (errore) {
      closable = true;
    }
    updatePoints(0);
    var div = document.createElement("div");
    div.setAttribute("title", title);
    div.id = "mydialog_opened";
    div.innerHTML = "<span>" + text + "</span>";
    document.body.appendChild(div);
    $(div).dialog({
      autoOpen: false,
      modal: true,
      show: "blind",
      hide: "blind",
      dialogClass: closable ? "mainClassDialog" : "no-close",
      buttons: [
        {
          text: yes_btn,
          icon: "ui-icon-check",
          click: f1
        }
        /*,
          	{
          		text: no_btn,
          		icon: "ui-icon-closethick",
          		click: f2
          	}*/
      ]
    });
    $(div).dialog("open");
  };
  myconfirm_2b = function(title, text, yes_btn, no_btn, f1, f2, closable) {
    try {
      if (closable == void 0) {
        closable = true;
      }
    } catch (errore) {
      closable = true;
    }
    var _f2 = function() {
      f2.apply(this, arguments);
      updatePoints(0);
    };
    var div = document.createElement("div");
    div.setAttribute("title", title);
    div.id = "mydialog_opened";
    div.innerHTML = "<span>" + text + "</span>";
    document.body.appendChild(div);
    $(div).dialog({
      autoOpen: false,
      modal: true,
      show: "blind",
      hide: "blind",
      dialogClass: closable ? "mainClassDialog" : "no-close",
      buttons: [
        {
          text: yes_btn,
          icon: "ui-icon-check",
          click: f1
        },
        {
          text: no_btn,
          icon: "ui-icon-closethick",
          click: _f2
        }
      ]
    });
    $(div).dialog("open");
  };
  myalert = function(title, text) {
    updatePoints(0);
    var div = document.createElement("div");
    div.setAttribute("title", title);
    div.id = "mydialog_opened";
    div.innerHTML = "<span>" + text + "</span>";
    document.body.appendChild(div);
    $(div).dialog({
      autoOpen: false,
      modal: true,
      show: "blind",
      hide: "blind",
      buttons: [
        {
          text: "Ok",
          icon: "ui-icon-check",
          click: function() {
            $(this).dialog("close");
            $(this).remove();
          }
        }
      ]
    });
    $(div).dialog("open");
  };
  updatePoints = function(punti2) {
    $("#points").text(parseInt($("#points").text()) + punti2);
    var nome = $("#name").text();
    var pt = parseInt($("#points").text());
    $.ajax({
      url: "addPoints_" + nome + "_" + pt,
      success: function(resp) {
        console.log(resp);
      },
      error: function(err) {
        console.log(err);
      }
    });
  };
  getPoints = function() {
    return parseInt($("#points").text());
  };
  enlight = function(casella, color, end_pos) {
    try {
      if (color == void 0) {
        color = "yellow";
      }
    } catch (errore) {
      color = "yellow";
    }
    try {
      if (end_pos == void 0) {
        end_pos = false;
      }
    } catch (errore) {
      end_pos = false;
    }
    try {
      if (enlighted == casella) {
        return;
      }
      enlighted = casella;
    } catch (errore) {
    }
    var elem = document.getElementById(casella);
    if (elem.childElementCount > 1) {
      elem.removeChild(elem.children[elem.childElementCount - 1]);
    } else {
      var div = document.createElement("div");
      if (end_pos) {
        div.style.width = "70%";
        div.style.height = "70%";
        div.style.background = color;
        div.style.zIndex = "1";
        div.style.position = "relative";
        div.style.left = "15%";
        div.style.top = "15%";
        div.style.borderRadius = "6px";
        div.style.border = "1px solid black";
      } else {
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.background = color;
        div.style.zIndex = "1";
      }
      elem.appendChild(div);
    }
  };
  enwrite = function(casella, txt, txt_color, bck_color) {
    try {
      if (txt_color == void 0) {
        txt_color = "white";
      }
    } catch (errore) {
      txt_color = "white";
    }
    try {
      if (bck_color == void 0) {
        bck_color = "yellow";
      }
    } catch (errore) {
      bck_color = "yellow";
    }
    var elem = document.getElementById(casella);
    if (elem.childElementCount > 1) {
      elem.removeChild(elem.children[elem.childElementCount - 1]);
    } else {
      var div = document.createElement("div");
      div.style.width = "70%";
      div.style.height = "70%";
      div.style.background = bck_color;
      div.style.zIndex = "1";
      div.style.display = "table";
      div.style.left = "15%";
      div.style.top = "15%";
      div.style.position = "relative";
      div.style.borderRadius = "6px;";
      div.innerHTML = "<span style='display: table-cell; vertical-align: middle; color: " + txt_color + "; font-size: initial'>" + txt + "</span>";
      elem.appendChild(div);
    }
  };
  var getQuiz = function(maketimer) {
    if (maketimer === void 0) {
      maketimer = new MakeTimerClass();
    }
    $.ajax({
      url: "getquiz",
      success: function(quiz) {
        $("#title").html('<div class="timer" data-second="' + quiz["tempo"] + '" data-height="20px" data-width="80%"></div>');
        maketimer.maketimer($(".timer")[0]);
        $("#question").text(quiz["domanda"]);
        var list = $("#answers");
        list.html("");
        list.css({
          /*"columns":"2","-webkit-columns": "2", "-moz-columns": "2", */
          "list-style": "none",
          "height": "100%",
          "display": "block"
        });
        for (var i = 0; i < quiz["risposta"].length; i++) {
          var elem = document.createElement("li");
          if (quiz["risposta"][i] == quiz["corretta"]) {
            elem.className = "corretta";
          }
          elem.innerHTML = "<div class='risposta'>" + quiz["risposta"][i] + "</div>";
          $(elem).click(function() {
            if (can_answer == false) {
              return;
            }
            if ($(this).attr("class") != void 0 && $(this).attr("class").indexOf("corretta") >= 0) {
              myconfirm(
                "risposta esatta!",
                "Hai guadagnato " + (parseInt(quiz["punteggio"]) + maketimer.sec) + " punti",
                "Ok",
                "Cancel",
                function() {
                  $(this).dialog("close");
                  updatePoints(parseInt(quiz["punteggio"]) + maketimer.sec);
                },
                function() {
                  $(this).dialog("close");
                  updatePoints(parseInt(quiz["punteggio"]) + maketimer.sec);
                }
              );
            } else {
              myalert("risposta sbagliata!", "Hai risposto sbagliato!");
            }
            clearInterval(maketimer.myt);
            maketimer.stopTimerFunction(true);
          });
          list.append(elem);
        }
      }
    });
  };

  // static/js/attesa.js
  var Attesa = class {
    constructor() {
    }
    start() {
    }
  };
  var attesa = new Attesa();

  // static/js/Quiz.js
  var Quiz = class {
    constructor(name) {
      this.name = name;
    }
    start() {
      window.maketimer = new MakeTimerClass();
      window.can_answer = true;
      getQuiz();
    }
  };

  // static/js/classifica.js
  var Classifica = class {
    constructor() {
    }
    start() {
    }
  };
  var classifica = new Classifica();

  // static/js/endpage.js
  var Endpage = class {
    constructor() {
    }
    start() {
    }
  };
  var endpage = new Endpage();

  // static/js/drawchessboardnewnew.js
  var DrawChessboard = class {
    constructor() {
      __publicField(this, "handleClick_casella", function(event) {
        return this.handleMouseDown_casella(event);
      });
      __publicField(this, "handleClick_image", function(event) {
        return this.handleMouseDown_image(event);
      });
      __publicField(this, "redraw", function(elem) {
        if (this.elem == void 0) {
          this.elem = elem;
        }
        elem = this.elem;
        var _w = Math.min(window.innerWidth, window.outerWidth == 0 ? window.innerWidth : window.outerWidth);
        var w = Math.min(_w, 600);
        elem.style.height = w + "px";
        elem.style.width = w + "px";
        elem.setAttribute("width", w);
        elem.setAttribute("height", w);
        w = _w - 40;
        w = Math.min(w, 600 - 40);
        const squareSize = parseInt(w / 8);
        var boardTopx = 20;
        var boardTopy = 20;
        elem.setAttribute("data-square-size", squareSize);
        elem.setAttribute("data-boardtop-x", boardTopx);
        elem.setAttribute("data-boardtop-y", boardTopy);
        for (var i = 0; i < elem.childElementCount; i++) {
          elem.children[i].style.width = squareSize + "px";
          elem.children[i].style.height = squareSize + "px";
        }
      });
      __publicField(this, "drawChessboard", function(elem) {
        if (this.elem == void 0) {
          this.elem = elem;
        }
        var _redraw = () => {
          this.redraw.apply(this, [elem]);
        };
        window.addEventListener("resize", _redraw);
        var _w = Math.min(window.innerWidth, window.outerWidth == 0 ? window.innerWidth : window.outerWidth);
        var w = Math.min(_w, 600);
        this.elem.style.background = "black";
        this.elem.style.height = w + "px";
        this.elem.style.width = w + "px";
        this.elem.style.margin = "auto";
        this.elem.setAttribute("width", w);
        this.elem.setAttribute("height", w);
        this.elem.style.padding = "20px";
        w = _w - 40;
        w = Math.min(w, 600 - 40);
        const squareSize = parseInt(w / 8);
        var boardTopx = 20;
        var boardTopy = 20;
        this.elem.setAttribute("data-square-size", squareSize);
        this.elem.setAttribute("data-boardtop-x", boardTopx);
        this.elem.setAttribute("data-boardtop-y", boardTopy);
        this.elem.setAttribute("data-number-caselle", 8);
        for (var i = 0; i < 8; i++) {
          for (var j = 0; j < 8; j++) {
            var div = document.createElement("div");
            div.style.background = (i + j) % 2 == 0 ? "#eeeed2" : "#769656";
            div.style.width = squareSize + "px";
            div.style.height = squareSize + "px";
            div.style.display = "inline-block";
            div.style.position = "relative";
            div.setAttribute("casella", String.fromCharCode(65 + j) + "" + (8 - i));
            div.id = String.fromCharCode(65 + j) + "" + (8 - i);
            if ("ontouchstart" in document) {
              div.addEventListener("touchstart", (e) => {
                this.handleClick_casella(e);
              });
            } else {
              $(div).mousedown((e) => {
                this.handleClick_casella(e);
              });
            }
            this.elem.appendChild(div);
          }
        }
        $('<style>div#A8:before{content:"8"; position: absolute; top: ' + (squareSize / 2 - 5) + 'px; left: -14px;font-size: 12px;}div#A7:before{content:"7"; position: absolute; top: ' + (squareSize / 2 - 5) + 'px; left: -14px;font-size: 12px;}div#A6:before{content:"6"; position: absolute; top: ' + (squareSize / 2 - 5) + 'px; left: -14px;font-size: 12px;}div#A5:before{content:"5"; position: absolute; top: ' + (squareSize / 2 - 5) + 'px; left: -14px;font-size: 12px;}div#A4:before{content:"4"; position: absolute; top: ' + (squareSize / 2 - 5) + 'px; left: -14px;font-size: 12px;}div#A3:before{content:"3"; position: absolute; top: ' + (squareSize / 2 - 5) + 'px; left: -14px;font-size: 12px;}div#A2:before{content:"2"; position: absolute; top: ' + (squareSize / 2 - 5) + 'px; left: -14px;font-size: 12px;}div#A1:before{content:"1"; position: absolute; top: ' + (squareSize / 2 - 5) + 'px; left: -14px;font-size: 12px;}div#A1:after{content:"A"; position: absolute; top: 100%;font-size: 12px;margin:auto;}div#B1:after{content:"B"; position: absolute; top: 100%;font-size: 12px;margin:auto;}div#C1:after{content:"C"; position: absolute; top: 100%;font-size: 12px;margin:auto;}div#D1:after{content:"D"; position: absolute; top: 100%;font-size: 12px;margin:auto;}div#E1:after{content:"E"; position: absolute; top: 100%;font-size: 12px;margin:auto;}div#F1:after{content:"F"; position: absolute; top: 100%;font-size: 12px;margin:auto;}div#G1:after{content:"G"; position: absolute; top: 100%;font-size: 12px;margin:auto;}div#H1:after{content:"H"; position: absolute; top: 100%;font-size: 12px;margin:auto;}</style>').appendTo("head");
        boardTopy += this.elem.getClientRects()[0].top;
        boardTopx += this.elem.getClientRects()[0].left;
      });
      __publicField(this, "drawPieces", function(elem, lst) {
        for (var i in lst) {
          this.casella = i.toUpperCase();
          var image = new Image();
          image.src = "static/img/" + lst[i];
          image.style.width = "100%";
          image.style.zIndex = "2";
          image.style.position = "absolute";
          image.style.left = "0";
          image.style.top = "0";
          image.setAttribute("data-casella", this.casella);
          image.setAttribute("data-type", lst[i].replace(".svg", ""));
          document.getElementById(this.casella).appendChild(image);
          if ("ontouchstart" in document) {
            image.addEventListener("touchstart", (e) => {
              this.handleClick_image(e);
            });
          } else {
            $(image).mousedown((e) => {
              this.handleClick_image(e);
            });
          }
        }
      });
      __publicField(this, "drawHints", function(cas, style) {
        if (!style) {
          style = "background: red; border-radius: 50%; position: absolute; left: 10%; width: 80%; height: 80%; z-index: 1";
        }
        for (var i in cas) {
          var elem = $("#" + cas[i])[0];
          var div = document.createElement("div");
          div.style = style;
          div.style.borderRadius = "2px";
          elem.appendChild(div);
        }
      });
      __publicField(this, "redraw_bis", function(elem, dim) {
        var _w = Math.min(window.innerWidth, window.outerWidth == 0 ? window.innerWidth : window.outerWidth);
        var w = Math.min(_w, 600);
        elem.style.height = w + "px";
        elem.style.width = w + "px";
        elem.setAttribute("width", w);
        elem.setAttribute("height", w);
        w = _w - 40;
        w = Math.min(w, 600 - 40);
        const squareSize = parseInt(w / dim);
        var boardTopx = 20;
        var boardTopy = 20;
        elem.setAttribute("data-square-size", squareSize);
        elem.setAttribute("data-boardtop-x", boardTopx);
        elem.setAttribute("data-boardtop-y", boardTopy);
        for (var i = 0; i < elem.childElementCount; i++) {
          elem.children[i].style.width = squareSize + "px";
          elem.children[i].style.height = squareSize + "px";
        }
      });
      __publicField(this, "drawChessboard_bis", function(elem, dim) {
        var _redraw = function() {
          this.redraw_bis.apply(this, [elem, dim]);
        };
        window.addEventListener("resize", _redraw);
        var _w = Math.min(window.innerWidth, window.outerWidth == 0 ? window.innerWidth : window.outerWidth);
        var w = Math.min(_w, 600);
        elem.style.background = "black";
        elem.style.height = w + "px";
        elem.style.width = w + "px";
        elem.style.margin = "auto";
        elem.setAttribute("width", w);
        elem.setAttribute("height", w);
        elem.style.padding = "20px";
        w = _w - 40;
        w = Math.min(w, 600 - 40);
        const squareSize = parseInt(w / dim);
        var boardTopx = 20;
        var boardTopy = 20;
        elem.setAttribute("data-square-size", squareSize);
        elem.setAttribute("data-boardtop-x", boardTopx);
        elem.setAttribute("data-boardtop-y", boardTopy);
        elem.setAttribute("data-number-caselle", dim);
        for (var i = 0; i < dim; i++) {
          for (var j = 0; j < dim; j++) {
            var div = document.createElement("div");
            div.style.background = (i + j) % 2 == 0 ? "#eeeed2" : "#769656";
            div.style.width = squareSize + "px";
            div.style.height = squareSize + "px";
            div.style.display = "inline-block";
            div.style.position = "relative";
            div.setAttribute("casella", String.fromCharCode(65 + j) + "" + (dim - i));
            div.id = String.fromCharCode(65 + j) + "" + (dim - i);
            if ("ontouchstart" in document) {
              div.addEventListener("touchstart", (e) => {
                this.handleClick_casella(e);
              });
            } else {
              $(div).mousedown((e) => {
                this.handleClick_casella(e);
              });
            }
            elem.appendChild(div);
          }
        }
        var css_str = "<style>";
        for (var i = 0; i < dim; i++) {
          css_str = css_str + "div#A" + (i + 1) + ':before{content:"' + (i + 1) + '"; position: absolute; top: ' + (squareSize / 2 - 5) + "px; left: -14px;font-size: 12px;}";
          css_str = css_str + "div#" + String.fromCharCode(i + 65) + '1:after{content:"' + String.fromCharCode(i + 65) + '"; position: absolute; top: 100%;font-size: 12px;margin:auto;}';
        }
        css_str = css_str + "</style>";
        $(css_str).appendTo("head");
        boardTopy += elem.getClientRects()[0].top;
        boardTopx += elem.getClientRects()[0].left;
      });
      this.handleMouseDown_casella = function(e) {
      };
      this.handleMouseDown_image = function(e) {
      };
      this.casella;
      this.piece_position;
      this.pieces = new Array();
      this.createObstacles();
    }
    createObstacles() {
      window.obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
    }
  };

  // static/js/common/Scacchiera_vuota.js
  var ScacchieraVuota = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
    }
  };
  var scacchiera_vuota = new ScacchieraVuota();

  // static/js/common/BattagliaNavale.js
  var BattagliaNavale = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      var caselle_colorate = new Array();
      var caselle_corrette = [A3, E8, F4, B5];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
        e.preventDefault();
        e.stopPropagation();
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        myalert("Risultato", "Hai guadagnato " + points + " punti.");
        updatePoints(points);
        punti = getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var battaglia_navale = new BattagliaNavale();

  // static/js/common/TorreHelp.js
  var TorreHelp = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.drawPieces(document.getElementById("chessboard"), { E4: "Rook.svg" });
      var au = document.createElement("img");
      au.src = "static/img/arrow-up.svg";
      $("#E5").append(au);
      var al = document.createElement("img");
      al.src = "static/img/arrow-left.svg";
      $("#D4").append(al);
      var ar = document.createElement("img");
      ar.src = "static/img/arrow-right.svg";
      $("#F4").append(ar);
      var ad = document.createElement("img");
      ad.src = "static/img/arrow-down.svg";
      $("#E3").append(ad);
      drawChessboard.handleMouseDown_casella = function() {
      };
      drawChessboard.handleMouseDown_image = function() {
      };
    }
  };
  var torre_help = new TorreHelp();

  // static/js/elem/pages/gioco1.js
  var Gioco1 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [C5, B5, A5, E5, F5, G5, H5, D4, D3, D2, D1, D6, D7, D8];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
        e.preventDefault();
        e.stopPropagation();
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        myalert("Risultato", "Hai guadaganto " + points + " punti.");
        updatePoints(points);
        punti = getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco1 = new Gioco1();

  // static/js/elem/pages/img_gioco1.js
  var ImgGioco1 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var cas = [C5, B5, A5, E5, F5, G5, H5, D4, D3, D2, D1, D6, D7, D8];
      for (var i in cas) {
        var elem = $("#" + cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "red";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "10%";
        div.style.top = "10%";
        div.style.width = "80%";
        div.style.height = "80%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
      drawChessboard.handleMouseDown_casella = function() {
      };
      drawChessboard.handleMouseDown_image = function() {
      };
    }
  };
  var img_gioco1 = new ImgGioco1();

  // static/js/movePiecesnew.js
  var PieceMove = class {
    constructor() {
      __publicField(this, "moveKing", function(casella, x, y) {
        var possible_moves2 = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        var newcasella = casella[0] + (y + 1);
        if (y + 1 < dim + 1 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = casella[0] + (y - 1);
        if (y - 1 > 0 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(65 + x + 1 - 1) + y;
        if (x + 1 < dim + 1 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(65 + x - 1 - 1) + y;
        if (x - 1 > 0 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(x - 1 + 65 - 1) + (y + 1);
        if (y + 1 < dim + 1 && x - 1 > 0 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(x + 1 + 65 - 1) + (y + 1);
        if (y + 1 < dim + 1 && x + 1 < dim + 1 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(x + 1 + 65 - 1) + (y - 1);
        if (y - 1 > 0 && x + 1 < dim + 1 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(x - 1 + 65 - 1) + (y - 1);
        if (y - 1 > 0 && x - 1 > 0 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
          possible_moves2.push(newcasella);
        }
        return possible_moves2;
      });
      __publicField(this, "moveRook", function(casella, x, y) {
        var possible_moves2 = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        for (var i = 1; i < dim + 1; i++) {
          var newcasella = casella[0] + (y + i);
          if (y + i < dim + 1 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves2.push(newcasella);
          }
          try {
            if (y + i >= dim || window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              break;
            }
          } catch (errore) {
            continue;
          }
        }
        for (var i = 1; i < dim + 1; i++) {
          var newcasella = casella[0] + (y - i);
          if (y - i > 0 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves2.push(newcasella);
          }
          try {
            if (y - i <= 1 || window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              break;
            }
          } catch (errore) {
            continue;
          }
        }
        for (var i = 1; i < dim + 1; i++) {
          var newcasella = String.fromCharCode(65 + x + i - 1) + y;
          if (x + i < dim + 1 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves2.push(newcasella);
          }
          try {
            if (x + i >= dim || window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              break;
            }
          } catch (errore) {
            continue;
          }
        }
        for (var i = 1; i < dim + 1; i++) {
          var newcasella = String.fromCharCode(65 + x - i - 1) + y;
          if (x - i > 0 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves2.push(newcasella);
          }
          try {
            if (x - i <= 1 || window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              break;
            }
          } catch (errore) {
            continue;
          }
        }
        return possible_moves2;
      });
      __publicField(this, "moveBishop", function(casella, x, y) {
        var possible_moves2 = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        for (var i = 1; i < dim + 1; i++) {
          if (x - i > 0 && y + i < dim + 1) {
            var newcasella = String.fromCharCode(x - i + 65 - 1) + (y + i);
            try {
              if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                break;
              }
            } catch (errore) {
            }
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              possible_moves2.push(newcasella);
            }
          } else {
            break;
          }
        }
        for (var i = 1; i < dim + 1; i++) {
          if (x - i > 0 && y - i > 0) {
            var newcasella = String.fromCharCode(x - i + 65 - 1) + (y - i);
            try {
              if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                break;
              }
            } catch (errore) {
            }
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              possible_moves2.push(newcasella);
            }
          } else {
            break;
          }
        }
        for (var i = 1; i < dim + 1; i++) {
          if (x + i < dim + 1 && y + i < dim + 1) {
            var newcasella = String.fromCharCode(x + i + 65 - 1) + (y + i);
            try {
              if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                break;
              }
            } catch (errore) {
            }
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              possible_moves2.push(newcasella);
            }
          } else {
            break;
          }
        }
        for (var i = 1; i < dim + 1; i++) {
          if (x + i < dim + 1 && y - i > 0) {
            var newcasella = String.fromCharCode(x + i + 65 - 1) + (y - i);
            try {
              if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                break;
              }
            } catch (errore) {
            }
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              possible_moves2.push(newcasella);
            }
          } else {
            break;
          }
        }
        return possible_moves2;
      });
      __publicField(this, "moveKnight", function(casella, x, y) {
        var possible_moves2 = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        if (y + 2 < dim + 1) {
          if (x - 1 > 0) {
            var newcasella = String.fromCharCode(x - 1 + 65 - 1) + (y + 2);
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              possible_moves2.push(newcasella);
            }
          }
          if (x + 1 < dim + 1) {
            var newcasella = String.fromCharCode(x + 1 + 65 - 1) + (y + 2);
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              possible_moves2.push(newcasella);
            }
          }
        }
        if (y - 2 > 0) {
          if (x - 1 > 0) {
            var newcasella = String.fromCharCode(x - 1 + 65 - 1) + (y - 2);
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              possible_moves2.push(newcasella);
            }
          }
          if (x + 1 < dim + 1) {
            var newcasella = String.fromCharCode(x + 1 + 65 - 1) + (y - 2);
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              possible_moves2.push(newcasella);
            }
          }
        }
        if (x + 2 < dim + 1) {
          if (y - 1 > 0) {
            var newcasella = String.fromCharCode(x + 2 + 65 - 1) + (y - 1);
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              possible_moves2.push(newcasella);
            }
          }
          if (y + 1 < dim + 1) {
            var newcasella = String.fromCharCode(x + 2 + 65 - 1) + (y + 1);
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              possible_moves2.push(newcasella);
            }
          }
        }
        if (x - 2 > 0) {
          if (y - 1 > 0) {
            var newcasella = String.fromCharCode(x - 2 + 65 - 1) + (y - 1);
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              possible_moves2.push(newcasella);
            }
          }
          if (y + 1 < dim + 1) {
            var newcasella = String.fromCharCode(x - 2 + 65 - 1) + (y + 1);
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              possible_moves2.push(newcasella);
            }
          }
        }
        return possible_moves2;
      });
      __publicField(this, "toro_moveRook", function(casella, x, y) {
        var possible_moves2 = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        for (var i = 1; i < dim * 2 + 1; i++) {
          var newcasella = casella[0] + ((y + i - 1) % dim + 1);
          if (newcasella == casella) {
            break;
          }
          if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
            possible_moves2.push(newcasella);
          }
          try {
            if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              break;
            }
          } catch (errore) {
            continue;
          }
        }
        for (var i = 1; i < dim * 2 + 1; i++) {
          var _y = y - i;
          while (_y <= 0) {
            _y += dim;
          }
          var newcasella = casella[0] + ((_y - 1) % dim + 1);
          if (newcasella == casella) {
            break;
          }
          if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
            possible_moves2.push(newcasella);
          }
          try {
            if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              break;
            }
          } catch (errore) {
            continue;
          }
        }
        for (var i = 1; i < dim * 2 + 1; i++) {
          var newcasella = String.fromCharCode(65 + ((x + i - 1) % dim + 1) - 1) + y;
          if (newcasella == casella) {
            break;
          }
          if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
            possible_moves2.push(newcasella);
          }
          try {
            if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              break;
            }
          } catch (errore) {
            continue;
          }
        }
        for (var i = 1; i < dim * 2 + 1; i++) {
          var _x = x - i;
          while (_x <= 0) {
            _x += dim;
          }
          var newcasella = String.fromCharCode(65 + ((_x - 1) % dim + 1) - 1) + y;
          if (newcasella == casella) {
            break;
          }
          if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
            possible_moves2.push(newcasella);
          }
          try {
            if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              break;
            }
          } catch (errore) {
            continue;
          }
        }
        return possible_moves2;
      });
      __publicField(this, "toro_moveBishop", function(casella, x, y) {
        var possible_moves2 = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        for (var i = 1; i < 2 * dim + 1; i++) {
          var _x = x - i;
          while (_x <= 0) {
            _x += dim;
          }
          var newcasella = String.fromCharCode(65 + ((_x - 1) % dim + 1) - 1) + ((y + i - 1) % dim + 1);
          if (newcasella == casella) {
            break;
          }
          try {
            if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              break;
            }
          } catch (errore) {
          }
          if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
            possible_moves2.push(newcasella);
          }
        }
        for (var i = 1; i < dim + 1; i++) {
          var _x = x - i;
          while (_x <= 0) {
            _x += dim;
          }
          var _y = y - i;
          while (_y <= 0) {
            _y += dim;
          }
          var newcasella = String.fromCharCode(65 + ((_x - 1) % dim + 1) - 1) + ((_y - 1) % dim + 1);
          if (newcasella == casella) {
            break;
          }
          try {
            if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              break;
            }
          } catch (errore) {
          }
          if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
            possible_moves2.push(newcasella);
          }
        }
        for (var i = 1; i < dim + 1; i++) {
          var newcasella = String.fromCharCode(65 + ((x + i - 1) % dim + 1) - 1) + ((y + i - 1) % dim + 1);
          if (newcasella == casella) {
            break;
          }
          try {
            if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              break;
            }
          } catch (errore) {
          }
          if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
            possible_moves2.push(newcasella);
          }
        }
        for (var i = 1; i < dim + 1; i++) {
          var _y = y - i;
          while (_y <= 0) {
            _y += dim;
          }
          var newcasella = String.fromCharCode(65 + ((x + i - 1) % dim + 1) - 1) + ((_y - 1) % dim + 1);
          if (newcasella == casella) {
            break;
          }
          try {
            if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
              break;
            }
          } catch (errore) {
          }
          if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
            possible_moves2.push(newcasella);
          }
        }
        return possible_moves2;
      });
      __publicField(this, "toro_moveKnight", function(casella, x, y) {
        var possible_moves2 = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        var _xa = x - 1;
        if (_xa <= 0) {
          _xa += dim;
        }
        var _xb = x - 2;
        if (_xb <= 0) {
          _xb += dim;
        }
        var _ya = y - 1;
        if (_ya <= 0) {
          _ya += dim;
        }
        var _yb = y - 2;
        if (_yb <= 0) {
          _yb += dim;
        }
        var newcasella = String.fromCharCode(65 + ((_xa - 1) % dim + 1) - 1) + ((y + 2 - 1) % dim + 1);
        if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(65 + ((x + 1 - 1) % dim + 1) - 1) + ((y + 2 - 1) % dim + 1);
        if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(65 + ((_xa - 1) % dim + 1) - 1) + ((_yb - 1) % dim + 1);
        if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(65 + ((x + 1 - 1) % dim + 1) - 1) + ((_yb - 1) % dim + 1);
        if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(65 + ((x + 2 - 1) % dim + 1) - 1) + ((_ya - 1) % dim + 1);
        if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(65 + ((x + 2 - 1) % dim + 1) - 1) + ((y + 1 - 1) % dim + 1);
        if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(65 + ((_xb - 1) % dim + 1) - 1) + ((_ya - 1) % dim + 1);
        if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
          possible_moves2.push(newcasella);
        }
        var newcasella = String.fromCharCode(65 + ((_xb - 1) % dim + 1) - 1) + ((y + 1 - 1) % dim + 1);
        if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
          possible_moves2.push(newcasella);
        }
        return possible_moves2;
      });
    }
  };
  var pieceMove = new PieceMove();

  // static/js/elem/pages/gioco2.js
  var Gioco2 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        E2: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      window.enlighted = "";
      var moving_pieces = {
        "Rook": E2
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = B7;
      var number_of_moves = 0;
      var show_possible_moves = true;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Rook": E2
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        possible_moves2 = new Array();
        caselle_colorate = new Array();
        $("#number_of_moves").html(number_of_moves);
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.preventDefault();
          e.stopPropagation();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        var x1 = from[1];
        var x2 = to[1];
        var y1 = from.charCodeAt(0) - 65 + 1;
        var y2 = to.charCodeAt(0) - 65 + 1;
        var d = 0;
        if (x1 == x2) {
          d = Math.abs(y2 - y1);
        } else {
          d = Math.abs(x2 - x1);
        }
        return d;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Rook":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveRook(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "20%";
            div.style.top = "20%";
            div.style.width = "60%";
            div.style.height = "60%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco2 = new Gioco2();

  // static/js/elem/pages/gioco3.js
  var Gioco3 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        A2: "Rook.svg",
        D4: "obstacle.svg",
        E5: "obstacle.svg",
        F6: "obstacle.svg",
        G7: "obstacle.svg",
        H3: "obstacle.svg",
        B7: "obstacle.svg",
        A8: "obstacle.svg",
        C6: "obstacle.svg",
        G3: "obstacle.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Rook": A2
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = H7;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Rook": A2
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        possible_moves2 = new Array();
        caselle_colorate = new Array();
        $("#number_of_moves").html(number_of_moves);
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.preventDefault();
          e.stopPropagation();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        var x1 = from[1];
        var x2 = to[1];
        var y1 = from.charCodeAt(0) - 65 + 1;
        var y2 = to.charCodeAt(0) - 65 + 1;
        var d = 0;
        if (x1 == x2) {
          d = Math.abs(y2 - y1);
        } else {
          d = Math.abs(x2 - x1);
        }
        return d;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Rook":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveRook(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "20%";
            div.style.top = "20%";
            div.style.width = "60%";
            div.style.height = "60%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco3 = new Gioco3();

  // static/js/elem/pages/gioco4.js
  var Gioco4 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg",
        A1: "obstacle.svg",
        D6: "obstacle.svg",
        F4: "obstacle.svg",
        B7: "obstacle.svg",
        B4: "obstacle.svg",
        B5: "obstacle.svg",
        C7: "obstacle.svg",
        B6: "obstacle.svg",
        C6: "obstacle.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Rook": D5
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = A8;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Rook": D5
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        possible_moves2 = new Array();
        caselle_colorate = new Array();
        $("#number_of_moves").html(number_of_moves);
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.preventDefault();
          e.stopPropagation();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        var x1 = from[1];
        var x2 = to[1];
        var y1 = from.charCodeAt(0) - 65 + 1;
        var y2 = to.charCodeAt(0) - 65 + 1;
        var d = 0;
        if (x1 == x2) {
          d = Math.abs(y2 - y1);
        } else {
          d = Math.abs(x2 - x1);
        }
        return d;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Rook":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveRook(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "20%";
            div.style.top = "20%";
            div.style.width = "60%";
            div.style.height = "60%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco4 = new Gioco4();

  // static/js/elem/pages/gioco5.js
  var Gioco5 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [D6, E5, D4, C5];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Risultato", "Hai guadagnato " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco5 = new Gioco5();

  // static/js/elem/pages/img_gioco5.js
  var ImgGioco5 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var cas = [C5, E5, D4, D6];
      for (var i in cas) {
        var elem = $("#" + cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "red";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "10%";
        div.style.top = "10%";
        div.style.width = "80%";
        div.style.height = "80%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
      drawChessboard.handleMouseDown_casella = function() {
      };
      drawChessboard.handleMouseDown_image = function() {
      };
    }
  };
  var img_gioco5 = new ImgGioco5();

  // static/js/elem/pages/gioco6.js
  var Gioco6 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [D3, D7, C4, C6, B5, E4, E6, F5];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Risultato", "Hai guadagnato " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco6 = new Gioco6();

  // static/js/elem/pages/img_gioco6.js
  var ImgGioco6 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var cas = [D3, D7, C4, C6, B5, E4, E6, F5];
      for (var i in cas) {
        var elem = $("#" + cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "red";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "10%";
        div.style.top = "10%";
        div.style.width = "80%";
        div.style.height = "80%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
      drawChessboard.handleMouseDown_casella = function() {
      };
      drawChessboard.handleMouseDown_image = function() {
      };
    }
  };
  var img_gioco6 = new ImgGioco6();

  // static/js/elem/pages/gioco7.js
  var Gioco7 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Bishop.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A2, A8, B3, B7, C4, C6, E4, E6, F3, F7, G2, G8, H1];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Risultato", "Hai guadaganto " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco7 = new Gioco7();

  // static/js/elem/pages/img_gioco7.js
  var ImgGioco7 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Bishop.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var cas = [A2, A8, B3, B7, C4, C6, E4, E6, F3, F7, G2, G8, H1];
      for (var i in cas) {
        var elem = $("#" + cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "red";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "10%";
        div.style.top = "10%";
        div.style.width = "80%";
        div.style.height = "80%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
      drawChessboard.handleMouseDown_casella = function() {
      };
      drawChessboard.handleMouseDown_image = function() {
      };
    }
  };
  var img_gioco7 = new ImgGioco7();

  // static/js/elem/pages/quiz11.js
  var Quiz11 = class {
    constructor() {
    }
    start() {
      var maketimer = new MakeTimerClass();
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      drawChessboard.drawPieces($("#chessboard")[0], { D3: "Bishop.svg" });
      window.enlighted = "";
      window.enlight(B5, "orange", true);
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz();
    }
  };
  var quiz11 = new Quiz11();

  // static/js/elem/pages/quiz12.js
  var Quiz12 = class {
    constructor() {
    }
    start() {
      var maketimer = new MakeTimerClass();
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      drawChessboard.drawPieces($("#chessboard")[0], { D6: "Bishop.svg" });
      window.enlighted = "";
      window.enlight(F6, "orange", true);
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz();
    }
  };
  var quiz12 = new Quiz12();

  // static/js/elem/pages/quiz13.js
  var Quiz13 = class {
    constructor() {
    }
    start() {
      var maketimer = new MakeTimerClass();
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      drawChessboard.drawPieces($("#chessboard")[0], { D5: "Bishop.svg" });
      window.enlighted = "";
      window.enlight(E5, "orange", true);
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz();
    }
  };
  var quiz13 = new Quiz13();

  // static/js/elem/pages/gioco8.js
  var Gioco8 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        window.procedi();
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
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
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Bishop": A2
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = H7;
      var number_of_moves = 0;
      var show_possible_moves = true;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Bishop": A2
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.preventDefault();
          e.stopPropagation();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        var x1 = from[1];
        var x2 = to[1];
        var y1 = from.charCodeAt(0) - 65 + 1;
        var y2 = to.charCodeAt(0) - 65 + 1;
        var d = 0;
        if (x1 == x2) {
          d = Math.abs(y2 - y1);
        } else {
          d = Math.abs(x2 - x1);
        }
        return d;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Bishop":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveBishop(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "20%";
            div.style.top = "20%";
            div.style.width = "60%";
            div.style.height = "60%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco8 = new Gioco8();

  // static/js/elem/pages/gioco9.js
  var Gioco9 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        window.procedi();
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        A4: "Bishop.svg",
        A2: "obstacle.svg",
        D8: "obstacle.svg",
        D6: "obstacle.svg",
        D4: "obstacle.svg",
        D2: "obstacle.svg",
        F5: "obstacle.svg",
        F7: "obstacle.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Bishop": A4
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = H7;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Bishop": A4
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.preventDefault();
          e.stopPropagation();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        var x1 = from[1];
        var x2 = to[1];
        var y1 = from.charCodeAt(0) - 65 + 1;
        var y2 = to.charCodeAt(0) - 65 + 1;
        var d = 0;
        if (x1 == x2) {
          d = Math.abs(y2 - y1);
        } else {
          d = Math.abs(x2 - x1);
        }
        return d;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Bishop":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveBishop(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "20%";
            div.style.top = "20%";
            div.style.width = "60%";
            div.style.height = "60%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco9 = new Gioco9();

  // static/js/elem/pages/quiz14.js
  var Quiz14 = class {
    constructor() {
    }
    start() {
      var maketimer = new MakeTimerClass();
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      drawChessboard.drawPieces($("#chessboard")[0], { D5: "Bishop.svg" });
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz();
    }
  };
  var quiz14 = new Quiz14();

  // static/js/elem/pages/gioco10.js
  var Gioco10 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Bishop.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [C4, C6, E4, E6];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Risultato", "Hai guadagnato " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco10 = new Gioco10();

  // static/js/elem/pages/img_gioco10.js
  var ImgGioco10 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Bishop.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var cas = [C4, C6, E4, E6];
      for (var i in cas) {
        var elem = $("#" + cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "red";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "10%";
        div.style.top = "10%";
        div.style.width = "80%";
        div.style.height = "80%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
      drawChessboard.handleMouseDown_casella = function() {
      };
      drawChessboard.handleMouseDown_image = function() {
      };
    }
  };
  var img_gioco10 = new ImgGioco10();

  // static/js/elem/pages/gioco11.js
  var Gioco11 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        F5: "Bishop.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [D7, F7, H7, D5, H5, D3, F3, H3];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Risultato", "Hai guadagnato " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco11 = new Gioco11();

  // static/js/elem/pages/img_gioco11.js
  var ImgGioco11 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        F5: "Bishop.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var cas = [D7, F7, H7, D5, H5, D3, F3, H3];
      for (var i in cas) {
        var elem = $("#" + cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "red";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "10%";
        div.style.top = "10%";
        div.style.width = "80%";
        div.style.height = "80%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
      drawChessboard.handleMouseDown_casella = function() {
      };
      drawChessboard.handleMouseDown_image = function() {
      };
    }
  };
  var img_gioco11 = new ImgGioco11();

  // static/js/common/ImgAllSquares.js
  var ImgAllSquares = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.drawPieces(
        document.getElementById("chessboard"),
        { F5: "Bishop.svg", C5: "Rook.svg" }
      );
      var cas = [D7, F7, H7, D5, H5, D3, F3, H3];
      for (var i in cas) {
        var elem = $("#" + cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "red";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "10%";
        div.style.top = "10%";
        div.style.width = "80%";
        div.style.height = "80%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
      cas = [C7, D6, E5, D4, C3, B4, A5, B6];
      for (var i in cas) {
        var elem = $("#" + cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "blue";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "10%";
        div.style.top = "10%";
        div.style.width = "80%";
        div.style.height = "80%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
    }
  };
  var img_allsquares = new ImgAllSquares();

  // static/js/elem/elementari.js
  var Elementari = class extends Prototipo {
    constructor() {
      super();
      this.pages = [
        attesa,
        new Quiz("quiz1"),
        new Quiz("quiz2"),
        ascolta,
        new Quiz("quiz3"),
        scacchiera_vuota,
        battaglia_navale,
        ascolta,
        torre_help,
        gioco1,
        img_gioco1,
        new Quiz("quiz4"),
        new Quiz("quiz5"),
        new Quiz("quiz6"),
        new Quiz("quiz7"),
        attesa,
        gioco2,
        gioco3,
        gioco4,
        new Quiz("quiz8"),
        ascolta,
        gioco5,
        img_gioco5,
        gioco6,
        img_gioco6,
        ascolta,
        gioco7,
        img_gioco7,
        new Quiz("quiz9"),
        new Quiz("quiz10"),
        quiz11,
        quiz12,
        quiz13,
        gioco8,
        gioco9,
        ascolta,
        quiz14,
        gioco10,
        img_gioco10,
        gioco11,
        img_gioco11,
        img_allsquares,
        new Quiz("quiz15"),
        ascolta,
        new Quiz("quiz16"),
        classifica,
        endpage
      ];
    }
    setPage(index) {
      debugger;
      this.currentPageIndex = index;
      this.currentPage = this.pages[index];
      this.currentPage.start();
    }
  };
  var elementari = new Elementari();

  // static/js/med/pages/gioco1.js
  var Gioco12 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [C5, B5, A5, E5, F5, G5, H5, D4, D3, D2, D1, D6, D7, D8];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Risultato", "Hai guadagnato " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco12 = new Gioco12();

  // static/js/common/ImgGioco.js
  var ImgGioco = class {
    constructor(piece_position, cas) {
      this.piece_position = piece_position;
      this.cas = cas;
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = this.piece_position;
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      for (var i in this.cas) {
        var elem = $("#" + this.cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "red";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "10%";
        div.style.top = "10%";
        div.style.width = "80%";
        div.style.height = "80%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
      drawChessboard.handleMouseDown_casella = function() {
      };
      drawChessboard.handleMouseDown_image = function() {
      };
    }
  };

  // static/js/med/pages/img_gioco1.js
  var ImgGioco12 = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Rook.svg" },
        [C5, B5, A5, E5, F5, G5, H5, D4, D3, D2, D1, D6, D7, D8]
      );
    }
  };
  var img_gioco12 = new ImgGioco12();

  // static/js/med/pages/gioco2.js
  var Gioco22 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        window.procedi();
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        E2: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      window.enlighted = "";
      var moving_pieces = {
        "Rook": E2
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = "A8";
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Rook": E2
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        var x1 = from[1];
        var x2 = to[1];
        var y1 = from.charCodeAt(0) - 65 + 1;
        var y2 = to.charCodeAt(0) - 65 + 1;
        var d = 0;
        if (x1 == x2) {
          d = Math.abs(y2 - y1);
        } else {
          d = Math.abs(x2 - x1);
        }
        return d;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Rook":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveRook(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco22 = new Gioco22();

  // static/js/med/pages/gioco4.js
  var Gioco42 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        window.procedi();
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg",
        A1: "obstacle.svg",
        D6: "obstacle.svg",
        F4: "obstacle.svg",
        B7: "obstacle.svg",
        B4: "obstacle.svg",
        B5: "obstacle.svg",
        C7: "obstacle.svg",
        B6: "obstacle.svg",
        C6: "obstacle.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Rook": D5
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = "A8";
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Rook": "D5"
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        var x1 = from[1];
        var x2 = to[1];
        var y1 = from.charCodeAt(0) - 65 + 1;
        var y2 = to.charCodeAt(0) - 65 + 1;
        var d = 0;
        if (x1 == x2) {
          d = Math.abs(y2 - y1);
        } else {
          d = Math.abs(x2 - x1);
        }
        return d;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Rook":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveRook(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco42 = new Gioco42();

  // static/js/med/pages/gioco5.js
  var Gioco52 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [D6, E5, D4, C5];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      drawChessboard.handleMouseDown_image = function() {
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Punti", "Hai guadagnato " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco52 = new Gioco52();

  // static/js/med/pages/img_gioco5.js
  var ImgGioco52 = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Rook.svg" },
        [C5, E5, D4, D6]
      );
    }
  };
  var img_gioco52 = new ImgGioco52();

  // static/js/med/pages/gioco6.js
  var Gioco62 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [D3, D7, C4, C6, B5, E4, E6, F5];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      drawChessboard.handleMouseDown_image = function() {
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Punti", "Hai guadagnato " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco62 = new Gioco62();

  // static/js/med/pages/img_gioco6.js
  var ImgGioco62 = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Rook.svg" },
        [D3, D7, C4, C6, B5, E4, E6, F5]
      );
    }
  };
  var img_gioco62 = new ImgGioco62();

  // static/js/med/pages/gioco7.js
  var Gioco72 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Bishop.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A2, A8, B3, B7, C4, C6, E4, E6, F3, F7, G2, G8, H1];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      drawChessboard.handleMouseDown_image = function() {
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Punti", "Hai guadagnato " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco72 = new Gioco72();

  // static/js/med/pages/img_gioco7.js
  var ImgGioco72 = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Bishop.svg" },
        [A2, A8, B3, B7, C4, C6, E4, E6, F3, F7, G2, G8, H1]
      );
    }
  };
  var img_gioco72 = new ImgGioco72();

  // static/js/med/pages/gioco8.js
  var Gioco82 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        window.procedi();
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
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
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Bishop": A2
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = H7;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Bishop": A2
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        var x1 = from[1];
        var x2 = to[1];
        var y1 = from.charCodeAt(0) - 65 + 1;
        var y2 = to.charCodeAt(0) - 65 + 1;
        var d = 0;
        if (x1 == x2) {
          d = Math.abs(y2 - y1);
        } else {
          d = Math.abs(x2 - x1);
        }
        return d;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Bishop":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveBishop(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco82 = new Gioco82();

  // static/js/med/pages/quiz8.js
  var Quiz8 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      drawChessboard.drawPieces($("#chessboard")[0], { D3: "Bishop.svg" });
      window.enlighted = "";
      window.enlight(B5, "orange", true);
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz();
    }
  };
  var quiz8 = new Quiz8();

  // static/js/med/pages/quiz9.js
  var Quiz9 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      drawChessboard.drawPieces($("#chessboard")[0], { D6: "Bishop.svg" });
      window.enlighted = "";
      window.enlight(F6, "orange", true);
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz();
    }
  };
  var quiz9 = new Quiz9();

  // static/js/med/pages/quiz10.js
  var Quiz10 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      drawChessboard.drawPieces($("#chessboard")[0], { D6: "Bishop.svg" });
      window.enlighted = "";
      window.enlight(E6, "orange", true);
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz();
    }
  };
  var quiz10 = new Quiz10();

  // static/js/med/pages/quiz11.js
  var Quiz112 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      drawChessboard.drawPieces($("#chessboard")[0], { D5: "Bishop.svg" });
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz();
    }
  };
  var quiz112 = new Quiz112();

  // static/js/med/pages/img_gioco10.js
  var ImgGioco102 = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Bishop.svg" },
        [C4, C6, E4, E6]
      );
    }
  };
  var img_gioco102 = new ImgGioco102();

  // static/js/med/pages/gioco11b.js
  var Gioco11b = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        F5: "Bishop.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [D7, F7, H7, D5, H5, D3, F3, H3];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Punti", "Hai guadaganto " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco11b = new Gioco11b();

  // static/js/med/pages/img_gioco11.js
  var ImgGioco112 = class extends ImgGioco {
    constructor() {
      super(
        { F5: "Bishop.svg" },
        [D7, F7, H7, D5, H5, D3, F3, H3]
      );
    }
  };
  var img_gioco112 = new ImgGioco112();

  // static/js/med/pages/img_cavallo.js
  var ImgCavallo = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Knight.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var cas = [E7];
      for (var i in cas) {
        var elem = $("#" + cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "red";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "10%";
        div.style.top = "10%";
        div.style.width = "80%";
        div.style.height = "80%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
      cas = [D6, D7];
      for (var i in cas) {
        var elem = $("#" + cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "rgba(255,0,0,0.5)";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "30%";
        div.style.top = "30%";
        div.style.width = "40%";
        div.style.height = "40%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
      drawChessboard.handleMouseDown_casella = function() {
      };
      drawChessboard.handleMouseDown_image = function() {
      };
    }
  };
  var img_cavallo = new ImgCavallo();

  // static/js/med/pages/gioco_spirit.js
  var GiocoSpirit = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Knight.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [B4, B6, C3, C7, E3, E7, F4, F6];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        var possible_moves2 = new Array();
        switch (type) {
          case "Rook":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveRook(casella, x, y);
            }
            break;
        }
        for (var i in possible_moves2) {
          var elem = document.getElementById(possible_moves2[i]);
          caselle_colorate.push(possible_moves2[i]);
          var div = document.createElement("div");
          div.style.background = "blue";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Punti", "Hai totalizzato " + points + " punti.");
        window.updatePoints(points);
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco_spirit = new GiocoSpirit();

  // static/js/med/pages/img_gioco_spirit.js
  var ImgGiocoSpirit = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Knight.svg" },
        [B4, B6, C3, C7, E3, E7, F4, F6]
      );
    }
  };
  var img_gioco_spirit = new ImgGiocoSpirit();

  // static/js/med/pages/gioco13b.js
  var Gioco13b = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        procedi();
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        A2: "Knight.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      window.enlighted = "";
      var moving_pieces = {
        "Knight": A2
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = D6;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Knight": A2
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        return 1;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Knight":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveKnight(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai impiegato " + number_of_moves + " mosse. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco13b = new Gioco13b();

  // static/js/med/pages/gioco13b_soluzione.js
  var Gioco13b_soluzione = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        A2: "Knight.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      window.enlighted = "";
      var moving_pieces = {
        "Knight": D5
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = E5;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.enwrite(C3, 1, "white", "rgb(200,0,0)");
      window.enwrite(B5, 2, "white", "rgb(200,0,0)");
      window.enwrite(D6, 3, "black", "yellow");
    }
  };
  var gioco13b_soluzione = new Gioco13b_soluzione();

  // static/js/med/pages/gioco12b.js
  var Gioco12b = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        window.procedi();
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Knight.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      window.enlighted = "";
      var moving_pieces = {
        "Knight": D5
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = E5;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Knight": D5
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        return 1;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Knight":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveKnight(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai impiegato " + number_of_moves + " mosse. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco12b = new Gioco12b();

  // static/js/med/pages/gioco12b_soluzione.js
  var Gioco12b_soluzione = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Knight.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      window.enlighted = "";
      var moving_pieces = {
        "Knight": D5
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = E5;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.enwrite(F6, 1, "white", "rgb(200,0,0)");
      window.enwrite(D7, 2, "white", "rgb(200,0,0)");
      window.enwrite(E5, 3, "black", "yellow");
    }
  };
  var gioco12b_soluzione = new Gioco12b_soluzione();

  // static/js/med/pages/quiz14.js
  var Quiz142 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      window.enlighted = "";
      window.enlight(C3, "orange", true);
      window.enlight(F5, "orange", true);
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz();
    }
  };
  var quiz142 = new Quiz142();

  // static/js/med/medie.js
  var Medie = class extends Prototipo {
    constructor() {
      super();
      this.pages = [
        attesa,
        new Quiz("quiz1"),
        ascolta,
        new Quiz("quiz2"),
        scacchiera_vuota,
        ascolta,
        torre_help,
        gioco12,
        img_gioco12,
        new Quiz("quiz3"),
        new Quiz("quiz4"),
        new Quiz("quiz5"),
        new Quiz("quiz6"),
        attesa,
        gioco22,
        gioco42,
        new Quiz("quiz7"),
        ascolta,
        gioco52,
        img_gioco52,
        gioco62,
        img_gioco62,
        ascolta,
        gioco72,
        img_gioco72,
        gioco82,
        quiz8,
        quiz9,
        quiz10,
        ascolta,
        quiz112,
        img_gioco102,
        gioco11b,
        img_gioco112,
        img_allsquares,
        ascolta,
        img_cavallo,
        gioco_spirit,
        img_gioco_spirit,
        gioco13b,
        gioco13b_soluzione,
        gioco12b,
        gioco12b_soluzione,
        ascolta,
        quiz142,
        ascolta,
        new Quiz("quiz16"),
        classifica,
        endpage
      ];
    }
    setPage(index) {
      debugger;
      this.currentPageIndex = index;
      this.currentPage = this.pages[index];
      this.currentPage.start();
    }
  };
  var medie = new Medie();

  // static/js/lic/LicQuiz.js
  var LicQuiz = class {
    constructor(name) {
      this.name = name;
    }
    start() {
      var maketimer = new MakeTimerClass();
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz(maketimer);
    }
  };

  // static/js/lic/pages/img_gioco1.js
  var ImgGioco13 = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Rook.svg" },
        [C5, B5, A5, E5, F5, G5, H5, D4, D3, D2, D1, D6, D7, D8]
      );
    }
  };
  var img_gioco13 = new ImgGioco13();

  // static/js/lic/pages/gioco2.js
  var Gioco23 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        E2: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      window.enlighted = "";
      var moving_pieces = {
        "Rook": E2
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var end_position = "A8";
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Rook": E2
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        try {
          var elem = e.currentTarget;
          var casella = elem.getAttribute("casella");
          if (possible_moves2.includes(casella)) {
            window.move(moving_piece, elem.id);
            moving_piece = "";
            possible_moves2 = new Array();
            e.stopPropagation();
            e.preventDefault();
          } else {
          }
        } catch (error) {
          alert("Problema in handlemousedown_casella");
          alert(error);
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        var x1 = from[1];
        var x2 = to[1];
        var y1 = from.charCodeAt(0) - 65 + 1;
        var y2 = to.charCodeAt(0) - 65 + 1;
        var d = 0;
        if (x1 == x2) {
          d = Math.abs(y2 - y1);
        } else {
          d = Math.abs(x2 - x1);
        }
        return d;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Rook":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveRook(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco23 = new Gioco23();

  // static/js/lic/pages/gioco4.js
  var Gioco43 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg",
        A1: "obstacle.svg",
        D6: "obstacle.svg",
        F4: "obstacle.svg",
        B7: "obstacle.svg",
        B4: "obstacle.svg",
        B5: "obstacle.svg",
        C7: "obstacle.svg",
        B6: "obstacle.svg",
        C6: "obstacle.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Rook": D5
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var end_position = "A8";
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Rook": "D5"
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        var x1 = from[1];
        var x2 = to[1];
        var y1 = from.charCodeAt(0) - 65 + 1;
        var y2 = to.charCodeAt(0) - 65 + 1;
        var d = 0;
        if (x1 == x2) {
          d = Math.abs(y2 - y1);
        } else {
          d = Math.abs(x2 - x1);
        }
        return d;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Rook":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveRook(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco43 = new Gioco43();

  // static/js/lic/pages/gioco5.js
  var Gioco53 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [D6, E5, D4, C5];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      drawChessboard.handleMouseDown_image = function() {
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Punti", "Hai guadagnato " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco53 = new Gioco53();

  // static/js/lic/pages/img_gioco5.js
  var ImgGioco53 = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Rook.svg" },
        [C5, E5, D4, D6]
      );
    }
  };
  var img_gioco53 = new ImgGioco53();

  // static/js/lic/pages/gioco6.js
  var Gioco63 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      var drawChessboard = new DrawChessboard();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [D3, D7, C4, C6, B5, E4, E6, F5];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      drawChessboard.handleMouseDown_image = function() {
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Punti", "Hai guadagnato " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco63 = new Gioco63();

  // static/js/lic/pages/img_gioco6.js
  var ImgGioco63 = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Rook.svg" },
        [D3, D7, C4, C6, B5, E4, E6, F5]
      );
    }
  };
  var img_gioco63 = new ImgGioco63();

  // static/js/lic/pages/img_gioco7.js
  var ImgGioco73 = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Bishop.svg" },
        [A2, A8, B3, B7, C4, C6, E4, E6, F3, F7, G2, G8, H1]
      );
    }
  };
  var img_gioco73 = new ImgGioco73();

  // static/js/lic/pages/gioco8.js
  var Gioco83 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
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
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Bishop": A2
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = H7;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Bishop": A2
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        var x1 = from[1];
        var x2 = to[1];
        var y1 = from.charCodeAt(0) - 65 + 1;
        var y2 = to.charCodeAt(0) - 65 + 1;
        var d = 0;
        if (x1 == x2) {
          d = Math.abs(y2 - y1);
        } else {
          d = Math.abs(x2 - x1);
        }
        return d;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Bishop":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveBishop(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco83 = new Gioco83();

  // static/js/lic/pages/quiz8.js
  var Quiz82 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      drawChessboard.drawPieces($("#chessboard")[0], { D3: "Bishop.svg" });
      window.enlighted = "";
      window.enlight(B5, "orange", true);
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz(maketimer);
    }
  };
  var quiz82 = new Quiz82();

  // static/js/lic/pages/quiz9.js
  var Quiz92 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      drawChessboard.drawPieces($("#chessboard")[0], { D6: "Bishop.svg" });
      window.enlighted = "";
      window.enlight(F6, "orange", true);
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz(maketimer);
    }
  };
  var quiz92 = new Quiz92();

  // static/js/lic/pages/quiz10.js
  var Quiz102 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      drawChessboard.drawPieces($("#chessboard")[0], { D6: "Bishop.svg" });
      window.enlighted = "";
      window.enlight(E6, "orange", true);
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz(maketimer);
    }
  };
  var quiz102 = new Quiz102();

  // static/js/lic/pages/quiz11.js
  var Quiz113 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      drawChessboard.drawPieces($("#chessboard")[0], { D5: "Bishop.svg" });
      window.can_answer = true;
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz(maketimer);
    }
  };
  var quiz113 = new Quiz113();

  // static/js/lic/pages/img_gioco10.js
  var ImgGioco103 = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Bishop.svg" },
        [C4, C6, E4, E6]
      );
    }
  };
  var img_gioco103 = new ImgGioco103();

  // static/js/lic/pages/gioco11b.js
  var Gioco11b2 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        F5: "Bishop.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [D7, F7, H7, D5, H5, D3, F3, H3];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Punti", "Hai guadaganto " + points + " punti.");
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        maketimer.expired = false;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco11b2 = new Gioco11b2();

  // static/js/lic/pages/img_gioco11b.js
  var ImgGioco11b = class extends ImgGioco {
    constructor() {
      super(
        { F5: "Bishop.svg" },
        [D7, F7, H7, D5, H5, D3, F3, H3]
      );
    }
  };
  var img_gioco11b = new ImgGioco11b();

  // static/js/lic/pages/img_cavallo.js
  var ImgCavallo2 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Knight.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var cas = [E7];
      for (var i in cas) {
        var elem = $("#" + cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "red";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "10%";
        div.style.top = "10%";
        div.style.width = "80%";
        div.style.height = "80%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
      cas = [D6, D7];
      for (var i in cas) {
        var elem = $("#" + cas[i])[0];
        var div = document.createElement("div");
        div.style.background = "rgba(255,0,0,0.5)";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.left = "30%";
        div.style.top = "30%";
        div.style.width = "40%";
        div.style.height = "40%";
        div.style.zIndex = "1";
        elem.appendChild(div);
      }
      drawChessboard.handleMouseDown_casella = function() {
      };
      drawChessboard.handleMouseDown_image = function() {
      };
    }
  };
  var img_cavallo2 = new ImgCavallo2();

  // static/js/lic/pages/gioco_spirit.js
  var GiocoSpirit2 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (!dis) {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Knight.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [B4, B6, C3, C7, E3, E7, F4, F6];
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var div = document.createElement("div");
          div.style.background = "red";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves = new Array();
        switch (type) {
          case "Rook":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves = pieceMove.moveRook(casella, x, y);
            }
            break;
        }
        for (var i in possible_moves) {
          var elem = document.getElementById(possible_moves[i]);
          caselle_colorate.push(possible_moves[i]);
          var div = document.createElement("div");
          div.style.background = "blue";
          div.style.borderRadius = "50%";
          div.style.position = "absolute";
          div.style.left = "10%";
          div.style.top = "10%";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.zIndex = "1";
          elem.appendChild(div);
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        for (var i in caselle_colorate) {
          if (caselle_corrette.includes(caselle_colorate[i])) {
            points += 1;
          } else {
            points -= 1;
          }
        }
        window.myalert("Punti", "Hai totalizzato " + points + " punti.");
        window.updatePoints(points);
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco_spirit2 = new GiocoSpirit2();

  // static/js/lic/pages/img_spirit.js
  var ImgSpirit = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Knight.svg" },
        [B4, B6, C3, C7, E3, E7, F4, F6]
      );
    }
  };
  var img_spirit = new ImgSpirit();

  // static/js/lic/pages/gioco13b.js
  var Gioco13b2 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        A2: "Knight.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      window.enlighted = "";
      var moving_pieces = {
        "Knight": A2
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = D6;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Knight": A2
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        return 1;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Knight":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveKnight(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " caselle. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco13b2 = new Gioco13b2();

  // static/js/lic/pages/gioco13b_soluzione.js
  var Gioco13bSoluzione = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        A2: "Knight.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      window.enlighted = "";
      var moving_pieces = {
        "Knight": D5
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = E5;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.enwrite(C3, 1, "white", "rgb(200,0,0)");
      window.enwrite(B5, 2, "white", "rgb(200,0,0)");
      window.enwrite(D6, 3, "black", "yellow");
    }
  };
  var gioco13b_soluzione2 = new Gioco13bSoluzione();

  // static/js/lic/pages/gioco12b.js
  var Gioco12b2 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Knight.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      window.enlighted = "";
      var moving_pieces = {
        "Knight": D5
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = E5;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Knight": D5
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        return 1;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Knight":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveKnight(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai percorso " + number_of_moves + " mosse. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco12b2 = new Gioco12b2();

  // static/js/lic/pages/gioco12b_soluzione.js
  var Gioco12bSoluzione = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Knight.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      window.enlighted = "";
      var moving_pieces = {
        "Knight": D5
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = E5;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.enwrite(F6, 1, "white", "rgb(200,0,0)");
      window.enwrite(D7, 2, "white", "rgb(200,0,0)");
      window.enwrite(E5, 3, "black", "yellow");
    }
  };
  var gioco12b_soluzione2 = new Gioco12bSoluzione();

  // static/js/lic/pages/quiz14.js
  var Quiz143 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      drawChessboard.drawChessboard($("#chessboard")[0]);
      window.enlighted = "";
      window.enlight(C3, "orange", true);
      window.enlight(F5, "orange", true);
      window.can_answer = true;
      drawChessboard.handleMouseDown_casella = function() {
      };
      drawChessboard.handleMouseDown_image = function() {
      };
      maketimer.stopTimerFunction = function(pressed) {
        try {
          if (pressed == void 0) {
            pressed = false;
          }
        } catch (errore) {
          pressed = false;
        }
        if (!pressed) {
          window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
        }
        window.can_answer = false;
        $(".risposta").toggleClass("disabled");
      };
      getQuiz(maketimer);
    }
  };
  var quiz143 = new Quiz143();

  // static/js/lic/pages/gioco14.js
  var Gioco14 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        G2: "Knight.svg",
        A7: "obstacle.svg",
        B7: "obstacle.svg",
        B8: "obstacle.svg",
        F2: "obstacle.svg",
        F1: "obstacle.svg",
        F3: "obstacle.svg",
        G3: "obstacle.svg",
        G1: "obstacle.svg",
        H3: "obstacle.svg",
        H2: "obstacle.svg",
        H1: "obstacle.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Knight": G2
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = "A8";
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Knight": G2
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        return 1;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Knight":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveKnight(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai impiegato " + number_of_moves + " mosse. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco14 = new Gioco14();

  // static/js/lic/pages/gioco15.js
  var Gioco15 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        H8: "Knight.svg",
        G8: "obstacle.svg",
        G7: "obstacle.svg",
        H7: "obstacle.svg",
        E4: "obstacle.svg",
        G6: "obstacle.svg",
        C2: "obstacle.svg",
        C5: "obstacle.svg",
        B2: "obstacle.svg",
        B3: "obstacle.svg",
        B5: "obstacle.svg",
        D1: "obstacle.svg",
        D3: "obstacle.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Knight": H8
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = C3;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Knight": H8
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        return 1;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Knight":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.moveKnight(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai impiegato " + number_of_moves + " mosse. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco15 = new Gioco15();

  // static/js/lic/pages/img_gioco15.js
  var ImgGioco15 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        H8: "Knight.svg",
        G8: "obstacle.svg",
        G7: "obstacle.svg",
        H7: "obstacle.svg",
        E4: "obstacle.svg",
        G6: "obstacle.svg",
        C2: "obstacle.svg",
        C5: "obstacle.svg",
        B2: "obstacle.svg",
        B3: "obstacle.svg",
        B5: "obstacle.svg",
        D1: "obstacle.svg",
        D3: "obstacle.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      window.enlighted = "";
      var moving_pieces = {
        "Knight": H8
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = E5;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.enwrite(F7, 1, "white", "rgb(200,0,0)");
      window.enwrite(D6, 2, "white", "rgb(200,0,0)");
      window.enwrite(C4, 3, "white", "rgb(200,0,0)");
      window.enwrite(B6, 4, "white", "rgb(200,0,0)");
      window.enwrite(D5, 5, "white", "rgb(200,0,0)");
      window.enwrite(C3, 6, "black", "yellow");
    }
  };
  var img_gioco15 = new ImgGioco15();

  // static/js/lic/pages/img_regina.js
  var ImgRegina = class extends ImgGioco {
    constructor() {
      super(
        { D5: "Queen.svg" },
        [C5, B5, A5, E5, F5, G5, H5, D4, D3, D2, D1, D6, D7, D8, C6, B7, A8, E4, F3, G2, H1, E6, F7, G8, C4, B3, A2]
      );
    }
  };
  var img_regina = new ImgRegina();

  // static/js/lic/pages/gioco16.js
  var Gioco16 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (maketimer.expired) {
          window.myalert("Tempo scaduto", "Il tuo punteggio \xE8 " + getPoints());
        } else {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      drawChessboard.drawChessboard_bis(document.getElementById("chessboard"), 4);
      var caselle_colorate = new Array();
      var possible_moves2 = new Array();
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var img = document.createElement("img");
          img.src = "static/img/Queen.svg";
          img.style.width = "100%";
          img.style.zIndex = "2";
          img.style.position = "absolute";
          img.style.left = "0px";
          img.style.top = "0px";
          elem.appendChild(img);
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.controllaRegine = function(casella) {
        var x = casella.charCodeAt(0) - 65 + 1;
        var y = parseInt(casella[1]);
        possible_moves2 = pieceMove.moveRook(casella, x, y);
        var pm = possible_moves2;
        possible_moves2 = pieceMove.moveBishop(casella, x, y);
        for (var i = 0; i < pm.length; i++) {
          possible_moves2.push(pm[i]);
        }
        for (var i = 0; i < possible_moves2.length; i++) {
          var c = document.getElementById(possible_moves2[i]);
          if (c == void 0) {
            continue;
          }
          if (c.childElementCount > 0 && c.children[0].tagName == "IMG") {
            window.myalert("Attenzione", "Le regine in " + casella + " e " + c.id + " si guardano");
            return -1;
          }
        }
        return 0;
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        if (maketimer.sec > 0) {
          var chess = document.getElementById("chessboard");
          var queens_position = new Array();
          for (var i = 0; i < chess.childElementCount; i++) {
            if (chess.children[i].childElementCount > 0 && chess.children[i].children[0].tagName == "IMG") {
              queens_position.push(chess.children[i].id);
            }
          }
          if (queens_position.length != 4) {
            window.myalert("Attenzione", "Hai inserito " + queens_position.length + " regine");
            maketimer.sec = 0;
            maketimer.expired = false;
          } else {
            var okpos = 0;
            for (var q = 0; q < queens_position.length; q++) {
              var isok = window.controllaRegine(queens_position[q]);
              okpos = okpos + isok;
              if (isok == -1) {
                break;
              }
            }
            if (okpos == 0 && maketimer.sec > 0) {
              points = 50;
              window.myalert("Risposta Corretta", "Hai guadagnato " + points + " punti");
              maketimer.sec = 0;
              maketimer.expired = false;
            }
          }
        }
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco16 = new Gioco16();

  // static/js/lic/pages/img_gioco16.js
  var ImgGioco16 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      drawChessboard.drawChessboard_bis(document.getElementById("chessboard"), 4);
      drawChessboard.piece_position = {
        A2: "Queen.svg",
        B4: "Queen.svg",
        D3: "Queen.svg",
        C1: "Queen.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      drawChessboard.handleMouseDown_casella = function() {
      };
      drawChessboard.handleMouseDown_image = function() {
      };
    }
  };
  var img_gioco16 = new ImgGioco16();

  // static/js/lic/pages/gioco17.js
  var Gioco17 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        var dis = document.getElementById("gobtn").disabled;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        if (maketimer.expired) {
          window.myalert("Tempo scaduto", "Il tuo punteggio \xE8 " + getPoints());
        } else {
          window.procedi(document.getElementById("gobtn"));
        }
      };
      var dim_queens = 8;
      drawChessboard.drawChessboard_bis(document.getElementById("chessboard"), dim_queens);
      var caselle_colorate = new Array();
      var possible_moves2 = new Array();
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (caselle_colorate.includes(casella)) {
          caselle_colorate.splice(caselle_colorate.indexOf(casella), 1);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        } else {
          caselle_colorate.push(casella);
          var img = document.createElement("img");
          img.src = "static/img/Queen.svg";
          img.style.width = "100%";
          img.style.zIndex = "2";
          img.style.position = "absolute";
          img.style.left = "0px";
          img.style.top = "0px";
          elem.appendChild(img);
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.controllaRegine = function(casella) {
        var x = casella.charCodeAt(0) - 65 + 1;
        var y = parseInt(casella[1]);
        possible_moves2 = pieceMove.moveRook(casella, x, y);
        var pm = possible_moves2;
        possible_moves2 = pieceMove.moveBishop(casella, x, y);
        for (var i = 0; i < pm.length; i++) {
          possible_moves2.push(pm[i]);
        }
        for (var i = 0; i < possible_moves2.length; i++) {
          var c = document.getElementById(possible_moves2[i]);
          if (c == void 0) {
            continue;
          }
          if (c.childElementCount > 0 && c.children[0].tagName == "IMG") {
            window.myalert("Attenzione", "Le regine in " + casella + " e " + c.id + " si guardano");
            return -1;
          }
        }
        return 0;
      };
      window.procedi = function(btn) {
        btn.disabled = true;
        var points = 0;
        if (maketimer.sec > 0) {
          var chess = document.getElementById("chessboard");
          var queens_position = new Array();
          for (var i = 0; i < chess.childElementCount; i++) {
            if (chess.children[i].childElementCount > 0 && chess.children[i].children[0].tagName == "IMG") {
              queens_position.push(chess.children[i].id);
            }
          }
          if (queens_position.length != dim_queens) {
            window.myalert("Attenzione", "Hai inserito " + queens_position.length + " regine");
            maketimer.sec = 0;
            maketimer.expired = false;
          } else {
            var okpos = 0;
            for (var q = 0; q < queens_position.length; q++) {
              var isok = window.controllaRegine(queens_position[q]);
              okpos = okpos + isok;
              if (isok == -1) {
                break;
              }
            }
            if (okpos == 0 && maketimer.sec > 0) {
              points = 50;
              window.myalert("Risposta Corretta", "Hai guadagnato " + points + " punti");
              maketimer.sec = 0;
              maketimer.expired = false;
            }
          }
        }
        window.updatePoints(points);
        punti = window.getPoints();
        clearInterval(maketimer.myt);
        maketimer.sec = 0;
        document.getElementById("gobtn").disabled = true;
        document.getElementById("reset").disabled = true;
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
      };
    }
  };
  var gioco17 = new Gioco17();

  // static/js/lic/pages/gioco_training_toro.js
  var GiocoTrainingToro = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        window.procedi();
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        D5: "Rook.svg",
        C4: "obstacle.svg",
        F5: "obstacle.svg",
        D6: "obstacle.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Rook": D5
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = null;
      var number_of_moves = 0;
      var show_possible_moves = true;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Rook": D5
        };
        window.enlighted = "";
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        return 1;
      };
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Rook":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.toro_moveRook(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai impiegato " + number_of_moves + " mosse. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco_training_toro = new GiocoTrainingToro();

  // static/js/lic/pages/gioco_toro.js
  var GiocoToro = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        H8: "Rook.svg",
        G8: "obstacle.svg",
        G7: "obstacle.svg",
        H7: "obstacle.svg",
        E4: "obstacle.svg",
        G6: "obstacle.svg",
        C2: "obstacle.svg",
        C5: "obstacle.svg",
        B2: "obstacle.svg",
        B3: "obstacle.svg",
        B5: "obstacle.svg",
        D1: "obstacle.svg",
        D3: "obstacle.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Rook": H8
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = C3;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Rook": H8
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        return 1;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Rook":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.toro_moveRook(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai impiegato " + number_of_moves + " mosse. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco_toro = new GiocoToro();

  // static/js/lic/pages/gioco_toro1.js
  var GiocoToro1 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        H8: "Bishop.svg",
        G8: "obstacle.svg",
        G7: "obstacle.svg",
        H7: "obstacle.svg",
        E4: "obstacle.svg",
        G6: "obstacle.svg",
        C2: "obstacle.svg",
        C5: "obstacle.svg",
        B2: "obstacle.svg",
        B3: "obstacle.svg",
        B5: "obstacle.svg",
        D1: "obstacle.svg",
        D3: "obstacle.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Bishop": H8
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = C3;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Bishop": H8
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        return 1;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Bishop":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.toro_moveBishop(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai impiegato " + number_of_moves + " mosse. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco_toro1 = new GiocoToro1();

  // static/js/lic/pages/gioco_toro2.js
  var GiocoToro2 = class {
    constructor() {
    }
    start() {
      var drawChessboard = new DrawChessboard();
      var maketimer = new MakeTimerClass();
      maketimer.maketimer(document.getElementsByClassName("timer")[0]);
      maketimer.stopTimerFunction = function() {
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
        if (maketimer.expired) {
          window.procedi();
        }
      };
      drawChessboard.drawChessboard(document.getElementById("chessboard"));
      drawChessboard.piece_position = {
        H8: "Knight.svg",
        G8: "obstacle.svg",
        G7: "obstacle.svg",
        H7: "obstacle.svg",
        E4: "obstacle.svg",
        G6: "obstacle.svg",
        C2: "obstacle.svg",
        C5: "obstacle.svg",
        B2: "obstacle.svg",
        B3: "obstacle.svg",
        B5: "obstacle.svg",
        D1: "obstacle.svg",
        D3: "obstacle.svg"
      };
      drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
      var caselle_colorate = new Array();
      var caselle_corrette = [A5, B5, C5, E5, F5, G5, H5, D4, D3, D2, D1];
      window.enlighted = "";
      var moving_pieces = {
        "Knight": H8
      };
      var moving_piece = "";
      var possible_moves2 = new Array();
      var obstacles = ["rock-golem-1", "rock-golem", "obstacle"];
      var end_position = C3;
      var number_of_moves = 0;
      var show_possible_moves = false;
      window.ricomincia = function() {
        $("#chessboard").html("")[0].style = "";
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
        drawChessboard.drawPieces(document.getElementById("chessboard"), drawChessboard.piece_position);
        moving_pieces = {
          "Knight": H8
        };
        window.enlighted = "";
        window.enlight(end_position, "orange", true);
        number_of_moves = 0;
        $("#number_of_moves").html(number_of_moves);
        possible_moves2 = new Array();
        caselle_colorate = new Array();
      };
      drawChessboard.handleMouseDown_casella = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("casella");
        if (possible_moves2.includes(casella)) {
          window.move(moving_piece, elem.id);
          moving_piece = "";
          possible_moves2 = new Array();
          e.stopPropagation();
          e.preventDefault();
        } else {
        }
      };
      window.move = function(moving_piece2, casella) {
        var piece = moving_piece2.split(";")[0];
        var from = moving_piece2.split(";")[1];
        var _to = casella;
        var elem_from = document.getElementById(from);
        window.enlighted = "";
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        elem_from.removeChild(elem_from.children[elem_from.childElementCount - 1]);
        var elem_to = document.getElementById(_to);
        var lst = new Object();
        lst[_to] = piece + ".svg";
        window.reset();
        drawChessboard.drawPieces(document.getElementById("chessboard"), lst);
        moving_pieces[piece] = _to;
        number_of_moves += window.dist(from, _to);
        $("#number_of_moves").html(number_of_moves);
        if (_to == end_position) {
          window.goal_reached();
        }
      };
      window.dist = function(from, to) {
        return 1;
      };
      window.enlight(end_position, "orange", true);
      drawChessboard.handleMouseDown_image = function(e) {
        var elem = e.currentTarget;
        var casella = elem.getAttribute("data-casella");
        var type = elem.getAttribute("data-type");
        if (window.enlighted == casella) {
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
        if (can_move) {
          window.calculatePossibleMoves(casella, type);
          window.enlight(casella, "orange");
        }
      };
      window.calculatePossibleMoves = function(casella, type) {
        possible_moves2 = new Array();
        switch (type) {
          case "Knight":
            {
              var x = casella.charCodeAt(0) - 65 + 1;
              var y = parseInt(casella[1]);
              possible_moves2 = pieceMove.toro_moveKnight(casella, x, y);
            }
            break;
        }
        if (show_possible_moves) {
          for (var i in possible_moves2) {
            var elem = document.getElementById(possible_moves2[i]);
            caselle_colorate.push(possible_moves2[i]);
            var div = document.createElement("div");
            div.style.background = "blue";
            div.style.borderRadius = "50%";
            div.style.position = "absolute";
            div.style.left = "10%";
            div.style.top = "10%";
            div.style.width = "80%";
            div.style.height = "80%";
            div.style.zIndex = "1";
            elem.appendChild(div);
          }
        }
      };
      window.reset = function() {
        for (var i in caselle_colorate) {
          var elem = document.getElementById(caselle_colorate[i]);
          elem.removeChild(elem.children[elem.childElementCount - 1]);
        }
        caselle_colorate = new Array();
      };
      window.goal_reached = function() {
        punti = window.getPoints();
        window.myconfirm_2b(
          "Obiettivo raggiunto",
          "Hai impiegato " + number_of_moves + " mosse. Vuoi riprovare?",
          "s\xEC",
          "no",
          function() {
            $(this).dialog("close");
            window.ricomincia();
            $(this).remove();
          },
          function() {
            $(this).dialog("close");
            clearInterval(maketimer.myt);
            maketimer.sec = 0;
            maketimer.expired = false;
            $(this).remove();
            punti -= number_of_moves;
            window.myalert("Punti", "Il tuo punteggio \xE8 di " + punti + " punti!");
            window.updatePoints(-number_of_moves);
            drawChessboard.handleMouseDown_casella = function() {
            };
            drawChessboard.handleMouseDown_image = function() {
            };
            $("#ricomincia").prop("disabled", true);
          },
          false
        );
      };
      window.procedi = function() {
        punti = window.getPoints();
        punti -= number_of_moves;
        window.myalert("Punti", "Il tuo punteggio \xE8 " + punti + ".");
        maketimer.sec = 0;
        window.updatePoints(-number_of_moves);
        drawChessboard.handleMouseDown_casella = function() {
        };
        drawChessboard.handleMouseDown_image = function() {
        };
        $("#ricomincia").prop("disabled", true);
      };
    }
  };
  var gioco_toro2 = new GiocoToro2();

  // static/js/lic/liceo.js
  var Liceo = class extends Prototipo {
    constructor() {
      super();
      this.pages = [
        attesa,
        ascolta,
        img_gioco13,
        new LicQuiz("quiz1"),
        new LicQuiz("quiz2"),
        ascolta,
        gioco23,
        gioco43,
        new LicQuiz("quiz7"),
        ascolta,
        gioco53,
        img_gioco53,
        gioco63,
        img_gioco63,
        ascolta,
        img_gioco73,
        gioco83,
        quiz82,
        quiz92,
        quiz102,
        ascolta,
        quiz113,
        img_gioco103,
        gioco11b2,
        img_gioco11b,
        img_allsquares,
        ascolta,
        img_cavallo2,
        gioco_spirit2,
        img_spirit,
        gioco13b2,
        gioco13b_soluzione2,
        gioco12b2,
        gioco12b_soluzione2,
        gioco14,
        gioco15,
        img_gioco15,
        ascolta,
        img_regina,
        gioco16,
        img_gioco16,
        gioco17,
        ascolta,
        gioco_training_toro,
        gioco_toro,
        gioco_toro1,
        gioco_toro2,
        ascolta,
        quiz143,
        classifica,
        endpage
      ];
    }
    setPage(index) {
      debugger;
      this.currentPageIndex = index;
      this.currentPage = this.pages[index];
      this.currentPage.start();
    }
  };
  var liceo = new Liceo();

  // static/js/app.js
  var App = class {
    constructor() {
      this.elementari = elementari;
      this.medie = medie;
      this.liceo = liceo;
      this.currentGame = null;
      this.path = "";
    }
    setPath(path) {
      this.path = path;
      if (this.path.includes("elementari") || this.path == 1) {
        if (this.currentGame != this.elementari) {
          this.loadGame(this.elementari);
        }
      } else if (this.path.includes("medie") || this.path == 2) {
        if (this.currentGame != this.medie) {
          this.loadGame(this.medie);
        }
      } else if (this.path.includes("liceo") || this.path == 3) {
        if (this.currentGame != this.liceo) {
          this.loadGame(this.liceo);
        }
      }
    }
    loadGame(game) {
      if (this.currentGame) {
        this.currentGame.dismount();
        this.currentGame = game;
        this.currentGame.mount();
      } else {
        this.currentGame = game;
        this.currentGame.mount();
      }
    }
  };
  window.app = new App();
})();
//# sourceMappingURL=app.dist.js.map
