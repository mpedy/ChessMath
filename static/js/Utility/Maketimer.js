export class MakeTimerClass {
	constructor() {
		this.sec = 0;
		this.stopTimerFunction = function () { }
		this.myt;
		this.expired = true
		this.hash;
		this.clessidra;
		this.totsec = 0;
		this.txt;
		this.time_restarted = 0;
	}
	clearTimer() {
		clearInterval(this.myt);
	}
	calculateHash() {
		return window.codice + "_" + window.page
	}
	maketimer = function (elem) {
		elem.innerHTML = "";
		this.hash = this.calculateHash()
		var timer = elem
		this.totsec = parseInt(timer.getAttribute("data-second"))
		var height = timer.getAttribute("data-height") || "50px";
		var width = timer.getAttribute("data-width") || "100%";
		this.sec = this.totsec
		this.txt = document.createElement("span")
		this.txt.innerText = "Tempo rimanente: " + this.sec + " secondi"
		this.txt.style.margin = "40px"
		this.txt.style.fontSize = "16px"
		timer.appendChild(this.txt)
		var box = document.createElement("div")
		box.style.width = width
		box.style.height = height
		box.style.background = "black"
		box.style.position = "relative"
		box.style.margin = "auto"
		this.clessidra = document.createElement("div")
		this.clessidra.style.width = "100%"
		this.clessidra.style.height = "100%"
		this.clessidra.style.background = "white"
		this.clessidra.style.position = "absolute"
		box.appendChild(this.clessidra)
		box.style.border = "2px solid white"
		timer.appendChild(box)
		this.myt = this.startTimer();
	}
	startTimer() {
		var self = this;
		return setInterval(function(){
			self.sec -= 1;
			console.log("active", self.hash)
			if (self.calculateHash() != self.hash) {
				clearInterval(self.myt)
				return
			}
			if (self.sec <= 0) {
				clearInterval(self.myt);
				self.clessidra.style.width = "0px";
				self.stopTimerFunction();
			} else {
				self.clessidra.style.width = (self.sec * 100 / self.totsec) + "%";
			}
			self.txt.innerText = "Tempo rimanente: " + self.sec + " secondi"
		}, 1000)
	}
	pauseTimer() {
		clearInterval(this.myt);
	}
	restartTimer() {
		this.expired = false;
		this.maketimer(document.getElementsByClassName("timer")[0]);
		this.time_restarted += 1;
	}
}