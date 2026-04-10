import { ImgGioco } from "../../common/ImgGioco.js";

class ImgSpirit extends ImgGioco {
    constructor(name) {
        super(
            { "D5": "Knight.svg" },
            ["B4", "B6", "C3", "C7", "E3", "E7", "F4", "F6"]
        );
        this.name = name;
    }
}

var img_spirit = new ImgSpirit("IMG Risposta");
export { img_spirit };