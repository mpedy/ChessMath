import { PrototipoGame } from "../../common/PrototipoGame.js";

/* global $ */
class Img1 extends PrototipoGame {
    constructor(name) {
        super(`<div style="padding: 10px; display: block;">
	Diversi percorsi:
</div>
<div>
	<img src="static/img/torre4.png" width="100%" />
</div>`, name);
    }
    start() { }
}

var img_1 = new Img1("Diversi percorsi");
export { img_1 };