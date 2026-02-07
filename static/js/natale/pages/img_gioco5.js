import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco5 extends ImgGioco {
    constructor() {
        super(
            { "D5": "Rook.svg" },
            ["C5", "E5", "D4", "D6"]
        );
    }
}

const img_gioco5 = new ImgGioco5();
export { img_gioco5 };