import { PrototipoGame } from "./PrototipoGame";

class Ascolta extends PrototipoGame {
    constructor(html) { super(html); }
    start() { }
}

var ascolta_animatore = new Ascolta(`<div>
	<h1 style="margin-top: 40%">Ascolta l'animatore</h1>
</div>`)

var ascolta_torre = new Ascolta(`<div>
	<h1 style="margin-top: 40%">Ascolta l'animatore</h1>
	<img src="static/img/Rook.svg" style="width: 60%"/>
</div>`)
var ascolta_alfiere = new Ascolta(`<div>
	<h1 style="margin-top: 40%">Ascolta l'animatore</h1>
	<img src="static/img/Bishop.svg" style="width: 60%"/>
</div>`)
var ascolta_cavallo = new Ascolta(`<div>
	<h1 style="margin-top: 40%">Ascolta l'animatore</h1>
	<img src="static/img/Knight.svg" style="width: 60%"/>
</div>`)
var ascolta_regina = new Ascolta(`<div>
	<h1 style="margin-top: 40%">Ascolta l'animatore</h1>
	<img src="static/img/Queen.svg" style="width: 60%"/>
</div>`)

export { ascolta_animatore, ascolta_torre, ascolta_alfiere, ascolta_cavallo, ascolta_regina };