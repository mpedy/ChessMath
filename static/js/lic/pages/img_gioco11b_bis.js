import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco11b_Bis extends ImgGioco {
    constructor() {
        super(
            { "F5": "Bishop.svg" },
            ["D7", "F7", "H7", "E6", "G6", "D5", "F5", "H5", "E4", "G4", "D3", "F3", "H3"]
        );
    }
}

var img_gioco11b_bis = new ImgGioco11b_Bis();
export { img_gioco11b_bis };