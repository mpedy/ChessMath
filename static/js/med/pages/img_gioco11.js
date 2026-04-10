import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco11 extends ImgGioco {
    constructor(name) {
        super(
            { "F5": "Bishop.svg" },
            ["D7", "F7", "H7", "D5", "H5", "D3", "F3", "H3"]
        );
        this.name = name;
    }
}

var img_gioco11 = new ImgGioco11("IMG Risposta");
export { img_gioco11 };