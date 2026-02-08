import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGiocoSpirit extends ImgGioco {
    constructor() {
        super(
            { "D5": "Knight.svg" },
            ["B4", "B6", "C3", "C7", "E3", "E7", "F4", "F6"]
        );
    }
}

var img_gioco_spirit = new ImgGiocoSpirit();
export { img_gioco_spirit };