import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco5 extends ImgGioco {
    constructor(name = "img_gioco5") {
        super(
            { "D5": "Rook.svg" },
            ["C5", "E5", "D4", "D6"],
            undefined,
            name
        );
    }
}

var img_gioco5 = new ImgGioco5("IMG risposta");
export { img_gioco5 };