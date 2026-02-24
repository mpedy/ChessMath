import { PrototipoGame } from "./PrototipoGame";

class Attesa extends PrototipoGame {
    constructor(html) { super(html); }
    start() {
    }
}
var attesa = new Attesa(`<div>
	<h1 style="margin-top: 40%">Ascolta l'animatore</h1>
</div>`);
export { attesa };