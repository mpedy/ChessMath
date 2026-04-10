import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco10 extends ImgGioco {
    constructor(name) {
        super(
            { "D5": "Bishop.svg" },
            ["C4", "C6", "E4", "E6"]
        );
        this.name = name;
    }
}

var img_gioco10 = new ImgGioco10("IMG Risposta");
export { img_gioco10 };