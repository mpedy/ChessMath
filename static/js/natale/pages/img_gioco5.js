import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco5 extends ImgGioco {
    constructor(name) {
        super(
            { "D5": "Rook.svg" },
            ["C5", "E5", "D4", "D6"]
        );
        this.name = name;
    }
}

var img_gioco5 = new ImgGioco5("IMG Risposta");
export { img_gioco5 };