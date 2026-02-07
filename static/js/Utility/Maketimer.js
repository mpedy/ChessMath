export class MakeTimerClass {
	constructor() {
		this.sec = 0;
		this.stopTimerFunction = function () { }
		this.myt;
		this.expired = true
		this.hash;
	}
	calculateHash() {
		return window.codice + "_" + window.page
	}
	maketimer = function (elem) {
		this.hash = this.calculateHash()
		var timer = elem
		var totsec = parseInt(timer.getAttribute("data-second"))
		var height = timer.getAttribute("data-height") || "50px";
		var width = timer.getAttribute("data-width") || "100%";
		this.sec = totsec
		var txt = document.createElement("span")
		txt.innerText = "Tempo rimanente: " + this.sec + " secondi"
		txt.style.margin = "40px"
		txt.style.fontSize = "16px"
		timer.appendChild(txt)
		var box = document.createElement("div")
		box.style.width = width
		box.style.height = height
		box.style.background = "black"
		box.style.position = "relative"
		box.style.margin = "auto"
		var clessidra = document.createElement("div")
		clessidra.style.width = "100%"
		clessidra.style.height = "100%"
		clessidra.style.background = "white"
		clessidra.style.position = "absolute"
		box.appendChild(clessidra)
		box.style.border = "2px solid white"
		timer.appendChild(box)
		this.myt = setInterval(() => {
			this.sec -= 1;
			console.log("active", this.hash)
			if (this.calculateHash() != this.hash) {
				clearInterval(this.myt)
				return
			}
			if (this.sec <= 0) {
				clearInterval(this.myt);
				clessidra.style.width = "0px";
				this.stopTimerFunction();
			} else {
				clessidra.style.width = (this.sec * 100 / totsec) + "%";
			}
			txt.innerText = "Tempo rimanente: " + this.sec + " secondi"
		}, 1000)
	}
}