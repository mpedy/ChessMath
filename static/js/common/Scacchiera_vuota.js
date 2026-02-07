import { DrawChessboard as DrawChessboardClass } from "../Utility/Drawchessboard.js";

class ScacchieraVuota {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass()
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
    }
}
const scacchiera_vuota = new ScacchieraVuota();
export { scacchiera_vuota };