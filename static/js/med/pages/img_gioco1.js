import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco1 extends ImgGioco {
    constructor() {
        debugger;
        super(
            { D5: "Rook.svg" },
            [C5, B5, A5, E5, F5, G5, H5, D4, D3, D2, D1, D6, D7, D8]
        );
    }
}

const img_gioco1 = new ImgGioco1();
export { img_gioco1 };