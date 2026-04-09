import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco11b extends ImgGioco {
    constructor(name) {
        super(
            { "F5": "Bishop.svg" },
            ["D7", "F7", "H7", "D5", "H5", "D3", "F3", "H3"],
            undefined,
            name
        );
    }
}

var img_gioco11b = new ImgGioco11b("IMG risposta");
export { img_gioco11b };