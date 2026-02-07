import { ImgGioco } from "../../common/ImgGioco.js";

class ImgSpirit extends ImgGioco {
    constructor() {
        super(
            { "D5": "Knight.svg" },
            ["B4", "B6", "C3", "C7", "E3", "E7", "F4", "F6"]
        );
    }
}

const img_spirit = new ImgSpirit();
export { img_spirit };