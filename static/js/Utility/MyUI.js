import { MakeTimerClass } from "./Maketimer";

/* eslint no-empty: "off" */
/* global $ */
export var myconfirm = function (title, text, yes_btn, no_btn, f1, f2, closable) {
	try {
		if (closable == undefined) {
			closable = true;
		}
	} catch {
		closable = true;
	}
	window.updatePoints(0);
	var div = document.createElement("div");
	div.setAttribute("title", title);
	div.id = "mydialog_opened"
	div.innerHTML = "<span>" + text + "</span>";
	document.body.appendChild(div);
	$(div).dialog({
		autoOpen: false, modal: true, show: "blind", hide: "blind", dialogClass: closable ? 'mainClassDialog' : 'no-close', buttons: [
			{
				text: yes_btn,
				icon: "ui-icon-check",
				click: f1
			}/*,
      	{
      		text: no_btn,
      		icon: "ui-icon-closethick",
      		click: f2
      	}*/]
	});
	$(div).dialog("open");
}

window.myconfirm = myconfirm;

window.myconfirm_2b = function (title, text, yes_btn, no_btn, f1, f2, closable) {
	try {
		if (closable == undefined) {
			closable = true;
		}
	} catch {
		closable = true;
	}
	var _f2 = function () {
		f2.apply(this, arguments);
		window.updatePoints(0);
	}
	var div = document.createElement("div");
	div.setAttribute("title", title);
	div.id = "mydialog_opened"
	div.innerHTML = "<span>" + text + "</span>";
	document.body.appendChild(div);
	$(div).dialog({
		autoOpen: false, modal: true, show: "blind", hide: "blind", dialogClass: closable ? 'mainClassDialog' : 'no-close', buttons: [
			{
				text: yes_btn,
				icon: "ui-icon-check",
				click: f1
			},
			{
				text: no_btn,
				icon: "ui-icon-closethick",
				click: _f2
			}]
	});
	$(div).dialog("open");
}

window.myalert = function (title, text) {
	window.updatePoints(0);
	var div = document.createElement("div");
	div.setAttribute("title", title);
	div.id = "mydialog_opened"
	div.innerHTML = "<span>" + text + "</span>";
	document.body.appendChild(div);
	$(div).dialog({
		autoOpen: false, modal: true, show: "blind", hide: "blind", buttons: [
			{
				text: "Ok",
				icon: "ui-icon-check",
				click: function () {
					$(this).dialog("close");
					$(this).remove();
				}
			}]
	});
	$(div).dialog("open");
}

window.updatePoints = function (punti) {
	$("#points").text(parseInt($("#points").text()) + punti)
	var nome = $("#name").text()
	var pt = parseInt($("#points").text())
	$.ajax({
		url: "addPoints_" + nome + "_" + pt,
		success: function (resp) {
			console.log(resp);
		},
		error: function (err) {
			console.log(err)
		}
	})
}

window.getPoints = function () {
	return parseInt($("#points").text());
}

window.enlight = function (casella, color, end_pos) {
	try {
		if (color == undefined) {
			color = "yellow";
		}
	} catch {
		color = "yellow";
	}
	try {
		if (end_pos == undefined) {
			end_pos = false;
		}
	} catch {
		end_pos = false;
	}
	try {
		if (window.enlighted == casella) {
			return;
		}
		window.enlighted = casella;
	} catch { }
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
}
window.enwrite = function (casella, txt, txt_color, bck_color) {
	try {
		if (txt_color == undefined) {
			txt_color = "white";
		}
	} catch {
		txt_color = "white";
	}
	try {
		if (bck_color == undefined) {
			bck_color = "yellow";
		}
	} catch {
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
}

export var getQuiz = function (maketimer) {
	if (maketimer === undefined) {
		maketimer = new MakeTimerClass();
	}
	$.ajax({
		url: "getquiz", success: function (quiz) {
			//$("#title").html("<span>Domanda da "+quiz["punteggio"]+" punti</span><br></br>");
			$("#title").html("<div class=\"timer\" data-second=\"" + quiz['tempo'] + "\" data-height=\"20px\" data-width=\"80%\"></div>")
			maketimer.maketimer($(".timer")[0])
			$("#question").text(quiz["domanda"]);
			var list = $("#answers")
			list.html("");
			list.css({/*"columns":"2","-webkit-columns": "2", "-moz-columns": "2", */"list-style": "none", "height": "100%", "display": "block" });
			for (var i = 0; i < quiz["risposta"].length; i++) {
				var elem = document.createElement("li");
				if (quiz["risposta"][i] == quiz["corretta"]) {
					elem.className = "corretta";
				}
				//elem.style="padding: 1vw";
				elem.innerHTML = "<div class='risposta'>" + quiz["risposta"][i] + "</div>";
				$(elem).click(function () {
					if (window.can_answer == false) {
						return
					}
					if ($(this).attr("class") != undefined && $(this).attr("class").indexOf("corretta") >= 0) {
						//myalert("risposta corretta!","Hai risposto giusto!");
						window.myconfirm("risposta esatta!", "Hai guadagnato " + (parseInt(quiz['punteggio']) + maketimer.sec) + " punti", "Ok", "Cancel",
							function () {
								$(this).dialog("close");
								window.updatePoints(parseInt(quiz['punteggio']) + maketimer.sec);
							},
							function () {
								$(this).dialog("close");
								window.updatePoints(parseInt(quiz['punteggio']) + maketimer.sec);
							})
					} else {
						window.myalert("risposta sbagliata!", "Hai risposto sbagliato!");
					}
					clearInterval(maketimer.myt);
					maketimer.stopTimerFunction(true);
				})
				list.append(elem);
			}
		}
	});
}

window.sendCodice = function () {
    var code = $("#codice").val();
    var nome = $("#nome").val();
    if (nome.length < 3) {
        window.myalert("Attenzione", "Inserire un nome di almeno 3 caratteri")
        return;
    }
    $.ajax({
        url: "verificacodice_" + code,
        async: false,
        success: function (res_page) {
            console.log(res_page)
            $.ajax(
                {
                    url: "inseriscinome_" + nome,
                    async: false,
                    success: function (result) {
                        nome = result;
                        window.location.href = "/game_" + nome;
                    }
                })
        },
        error: function (err) {
            window.myalert("Attenzione!", "Il codice inserito non è corretto");
            console.error(err)
        }
    })
}