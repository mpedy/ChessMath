maketimer = function(elem){
	var timer = elem
	var totsec = parseInt(timer.getAttribute("data-second"))
	var height = timer.getAttribute("data-height") || "50px";
	var width = timer.getAttribute("data-width") || "100%";
	var sec = totsec
	var txt = document.createElement("span")
	txt.innerText="Tempo rimanente: "+sec+" secondi"
	txt.style="margin: 40px;"
	timer.appendChild(txt)
	var box = document.createElement("div")
	box.style="width: 100%; height: "+height+"; background: black; position: relative;"
	var clessidra = document.createElement("div")
	clessidra.style="width: 100%; height: 100%; background: white; position: absolute;"
	box.appendChild(clessidra)
	box.style.border="2px solid white"
	timer.appendChild(box)
	var t = setInterval(function(){
		sec -=1;
		if(sec == 0){
			clearInterval(t);
			clessidra.style.width="0px";
			stopTimerFunction();
		}else{
			clessidra.style.width=(sec*100 / totsec)+"%";
		}
		txt.innerText="Tempo rimanente: "+sec+" secondi"
	},1000)
}