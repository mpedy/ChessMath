
class CalculateFEN {
    constructor() {
        this.fen = "";
    }
    calculateFen(chessboard) {
        var piece_position = {};
        for(let p in chessboard.pieces){
            piece_position[chessboard.pieces[p].casella] = chessboard.pieces[p].immagine;
        }
        console.log("PIECE POSITION IN FEN: ", piece_position);
        var fen = "";
        for (var i = 8; i >= 1; i--) {
            var empty_squares = 0;
            for (var j = 1; j <= 8; j++) {
                var casella = String.fromCharCode(64 + j) + i;
                if (piece_position[casella]) {
                    if (empty_squares > 0) {
                        fen += empty_squares;
                        empty_squares = 0;
                    }
                    var piece = piece_position[casella];
                    var piece_type = piece.split(".svg")[0].toLowerCase();
                    var piece_color = "white";
                    if(piece_type.indexOf("_b")>=0){
                        piece_color = "black";
                        console.log("PEZZO NERO: " + piece);
                        piece_type = piece_type.split("_b")[0];
                    }
                    var piece_fen;
                    console.log("PIECE TYPE: " + piece_type);
                    switch (piece_type) {
                        case "king":
                            piece_fen = "k";
                            break;
                        case "queen":
                            piece_fen = "q";
                            break;
                        case "rook":
                            piece_fen = "r";
                            break;
                        case "bishop":
                            piece_fen = "b";
                            break;
                        case "knight":
                            piece_fen = "n";
                            break;
                        case "pawn":
                            piece_fen = "p";
                            break;
                    }
                    if (piece_color == "white") {
                        console.log(piece_fen)
                        piece_fen = piece_fen.toUpperCase();
                    }
                    fen += piece_fen;
                } else {
                    empty_squares++;
                }
            }
            if (empty_squares > 0) {
                fen += empty_squares;
            }
            if (i > 1) {
                fen += "/";
            }
        }
        return fen;
    }
}

var calculateFen = new CalculateFEN();
export { calculateFen };