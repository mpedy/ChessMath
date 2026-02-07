import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco11b extends ImgGioco {
    constructor() {
        super(
            { "F5": "Bishop.svg" },
            ["D7", "F7", "H7", "D5", "H5", "D3", "F3", "H3"]
        );
    }
}

const img_gioco11b = new ImgGioco11b();
export { img_gioco11b };