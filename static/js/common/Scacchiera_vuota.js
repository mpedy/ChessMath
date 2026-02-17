import { DrawChessboard as DrawChessboardClass } from "../Utility/Drawchessboard.js";

class ScacchieraVuota {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass(document.getElementById("chessboard"));
        drawChessboard.drawChessboard();
    }
}
var scacchiera_vuota = new ScacchieraVuota();
export { scacchiera_vuota };