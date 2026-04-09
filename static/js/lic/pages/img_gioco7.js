import { ImgGioco } from "../../common/ImgGioco.js";

class ImgGioco7 extends ImgGioco {
    constructor(name = "img_gioco7") {
        super(
            { "D5": "Bishop.svg" },
            ["A2", "A8", "B3", "B7", "C4", "C6", "E4", "E6", "F3", "F7", "G2", "G8", "H1"],
            "Una mossa dell'Alfiere:",
            name
        );
    }
}

var img_gioco7 = new ImgGioco7("IMG Mossa Alfiere");
export { img_gioco7 };