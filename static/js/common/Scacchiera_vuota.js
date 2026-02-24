import { DrawChessboard as DrawChessboardClass } from "../Utility/Drawchessboard.js";
import { ImgGioco } from "./ImgGioco.js";

class ScacchieraVuota extends ImgGioco {
    constructor() { super(undefined,undefined, "La Scacchiera");}
    start() {
        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"));
        drawChessboard.drawChessboard();
    }
}
var scacchiera_vuota = new ScacchieraVuota();
export { scacchiera_vuota };