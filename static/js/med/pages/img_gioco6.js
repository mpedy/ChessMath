import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco6 extends ImgGioco {
    constructor() {
        super(
            { "D5": "Rook.svg" },
            ["D3", "D7", "C4", "C6", "B5", "E4", "E6", "F5"]
        );
    }
}

const img_gioco6 = new ImgGioco6();
export { img_gioco6 };