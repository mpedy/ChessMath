import { ImgGioco } from "../../common/ImgGioco.js";

class ImgSpirit extends ImgGioco {
    constructor(name = "ImgSpirit") {
        super(
            { "D5": "Knight.svg" },
            ["B4", "B6", "C3", "C7", "E3", "E7", "F4", "F6"],
            undefined,
            name
        );
    }
}

var img_spirit = new ImgSpirit("IMG risposta");
export { img_spirit };