import { ImgGioco } from "../../common/ImgGioco.js";

class ImgRegina extends ImgGioco {
    constructor() {
        super(
            { "D5": "Queen.svg" },
            ["C5", "B5", "A5", "E5", "F5", "G5", "H5", "D4", "D3", "D2", "D1", "D6", "D7", "D8", "C6", "B7", "A8", "E4", "F3", "G2", "H1", "E6", "F7", "G8", "C4", "B3", "A2"]
        );
    }
}

const img_regina = new ImgRegina();
export { img_regina };