import { DrawChessboard as DrawChessboardClass } from "../Utility/Drawchessboard.js";
import { ImgGioco } from "./ImgGioco.js";

class ScacchieraVuota extends ImgGioco {
    constructor(name) { super(undefined,undefined, "La Scacchiera", name);}
    start() {
        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"));
        drawChessboard.drawChessboard();
    }
}
var scacchiera_vuota = new ScacchieraVuota("IMG Scacchiera vuota");
export { scacchiera_vuota };