import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco6 extends ImgGioco {
    constructor(name = "img_gioco6") {
        super(
            { "D5": "Rook.svg" },
            ["D3", "D7", "C4", "C6", "B5", "E4", "E6", "F5"],
            "Risposta corretta:",
            name
        );
    }
}

var img_gioco6 = new ImgGioco6("IMG risposta");
export { img_gioco6 };