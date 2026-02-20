import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco6Bis extends ImgGioco {
    constructor() {
        super(
            { "D5": "Rook.svg" },
            ["D7","C6","D6","E6","B5","C5","D5","E5","F5","C4","D4","E4","D3"]
        );
    }
}

var img_gioco6bis = new ImgGioco6Bis();
export { img_gioco6bis };