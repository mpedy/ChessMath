import { DrawChessboard as DrawChessboardClass } from "./drawchessboardnewnew.js";

class Page4 {
    constructor() { }
    start() {
        var drawChessboard = new DrawChessboardClass()
        drawChessboard.drawChessboard(document.getElementById("chessboard"));
    }
}
const page4 = new Page4();
export { page4 };