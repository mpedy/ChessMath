import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGiocoToro3 extends ImgGioco {
    constructor(name = "ImgGiocoToro3") {
        super(
            { "A1": "Knight.svg" },
            ["B3", "C2", "C8", "B7", "H7", "G8", "G2", "H3"],
            undefined,
            name
        );
    }
}

var img_gioco_toro3 = new ImgGiocoToro3("IMG Risposta");
export { img_gioco_toro3 };