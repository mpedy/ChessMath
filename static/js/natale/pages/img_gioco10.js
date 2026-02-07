import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco10 extends ImgGioco {
    constructor() {
        super(
            { "D5": "Bishop.svg" },
            ["C4", "C6", "E4", "E6"]
        );
    }
}

const img_gioco10 = new ImgGioco10();
export { img_gioco10 };