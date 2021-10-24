var sec;
maketimer = function(elem){
	var timer = elem
	var totsec = parseInt(timer.getAttribute("data-second"))
	var height = timer.getAttribute("data-height") || "50px";
	var width = timer.getAttribute("data-width") || "100%";
	sec = totsec
	var txt = document.createElement("span")
	txt.innerText="Tempo rimanente: "+sec+" secondi"
	txt.style="margin: 40px; font-size: 16px;"
	timer.appendChild(txt)
	var box = document.createElement("div")
	box.style="width: "+width+"; height: "+height+"; background: black; position: relative; margin: auto;"
	var clessidra = document.createElement("div")
	clessidra.style="width: 100%; height: 100%; background: white; position: absolute;"
	box.appendChild(clessidra)
	box.style.border="2px solid white"
	timer.appendChild(box)
	window.myt = setInterval(function(){
		sec -=1;
		if(sec <= 0){
			clearInterval(window.myt);
			clessidra.style.width="0px";
			stopTimerFunction();
		}else{
			clessidra.style.width=(sec*100 / totsec)+"%";
		}
		txt.innerText="Tempo rimanente: "+sec+" secondi"
	},1000)
}