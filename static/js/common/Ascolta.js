import { PrototipoGame } from "./PrototipoGame";

class Ascolta extends PrototipoGame {
    constructor(html, name) { super(html, name); }
    start() { }
}

var ascolta_animatore = new Ascolta(`<div>
	<h1 style="margin-top: 40%">Ascolta l'animatore</h1>
</div>`, "Ascolta l'animatore");

var ascolta_torre = new Ascolta(`<div>
	<h1 style="margin-top: 40%">Ascolta l'animatore</h1>
	<img src="static/img/Rook.svg" style="width: 60%"/>
</div>`, "Ascolta la torre");
var ascolta_alfiere = new Ascolta(`<div>
	<h1 style="margin-top: 40%">Ascolta l'animatore</h1>
	<img src="static/img/Bishop.svg" style="width: 60%"/>
</div>`, "Ascolta l'alfiere");
var ascolta_cavallo = new Ascolta(`<div>
	<h1 style="margin-top: 40%">Ascolta l'animatore</h1>
	<img src="static/img/Knight.svg" style="width: 60%"/>
</div>`, "Ascolta il cavallo");
var ascolta_regina = new Ascolta(`<div>
	<h1 style="margin-top: 40%">Ascolta l'animatore</h1>
	<img src="static/img/Queen.svg" style="width: 60%"/>
</div>`, "Ascolta la regina")

export { ascolta_animatore, ascolta_torre, ascolta_alfiere, ascolta_cavallo, ascolta_regina, Ascolta };