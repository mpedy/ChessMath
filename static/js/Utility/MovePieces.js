/* eslint no-empty: 0 */
/* global $ */
class PieceMove {
    constructor() { }
    moveKing = function (casella, x, y) {
        var possible_moves = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        var newcasella;
        //UP
        newcasella = casella[0] + (y + 1)
        if (y + 1 < dim + 1 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        //DOWN
        newcasella = casella[0] + (y - 1)
        if (y - 1 > 0 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        //DX
        newcasella = String.fromCharCode(65 + x + 1 - 1) + y
        if (x + 1 < dim + 1 && (
            $("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        //SX
        newcasella = String.fromCharCode(65 + x - 1 - 1) + y
        if (x - 1 > 0 && (
            $("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        //UP SX
        newcasella = String.fromCharCode(x - 1 + 65 - 1) + (y + 1)
        if (y + 1 < dim + 1 && x - 1 > 0 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }

        //UP DX
        newcasella = String.fromCharCode(x + 1 + 65 - 1) + (y + 1)
        if (y + 1 < dim + 1 && x + 1 < dim + 1 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }

        //DOWN DX
        newcasella = String.fromCharCode(x + 1 + 65 - 1) + (y - 1)
        if (y - 1 > 0 && x + 1 < dim + 1 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }

        //DOWN SX
        newcasella = String.fromCharCode(x - 1 + 65 - 1) + (y - 1)
        if (y - 1 > 0 && x - 1 > 0 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        return possible_moves;
    }
    moveRook = function (casella, x, y) {
        var possible_moves = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        var newcasella;
        for (let i = 1; i < dim + 1; i++) {//up
            newcasella = casella[0] + (y + i)
            if (y + i < dim + 1 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                possible_moves.push(newcasella)
            }
            try {
                if (y + i >= dim || window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                    break;
                }
            } catch {
                continue;
            }
        }
        for (let i = 1; i < dim + 1; i++) {//down
            //console.log("Down: "+(y-i));
            newcasella = casella[0] + (y - i)
            if (y - i > 0 && ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                possible_moves.push(newcasella)
            }
            try {
                if (y - i <= 1 || window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                    break;
                }
            } catch {
                continue;
            }
        }
        for (let i = 1; i < dim + 1; i++) {//dx
            //console.log("Dx: "+(x+i));
            newcasella = String.fromCharCode(65 + x + i - 1) + y
            //console.log("Newcasella: "+newcasella)
            if (x + i < dim + 1 && (
                $("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                possible_moves.push(newcasella)
            }
            try {
                if (x + i >= dim || window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                    break;
                }
            } catch {
                continue;
            }
        }
        for (let i = 1; i < dim + 1; i++) {//sx
            //console.log("Sx: "+(x-i));
            newcasella = String.fromCharCode(65 + x - i - 1) + y
            //console.log("Newcasella: "+newcasella)
            if (x - i > 0 && (
                $("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                possible_moves.push(newcasella)
            }
            try {
                if (x - i <= 1 || window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                    break;
                }
            } catch {
                continue;
            }
        }
        return possible_moves;
    }

    moveBishop = function (casella, x, y) {
        var possible_moves = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        var newcasella;
        for (let i = 1; i < dim + 1; i++) {//sx up
            if (x - i > 0 && y + i < dim + 1) {
                newcasella = String.fromCharCode(x - i + 65 - 1) + (y + i)
                try {
                    if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                        break;
                    }
                } catch { }
                if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                    possible_moves.push(newcasella)
                }
            }
            else {
                break;
            }
        }
        for (let i = 1; i < dim + 1; i++) {//sx down
            //console.log("Down: "+(y-i));
            if (x - i > 0 && y - i > 0) {
                newcasella = String.fromCharCode(x - i + 65 - 1) + (y - i)
                try {
                    if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                        break;
                    }
                } catch { }
                if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                    possible_moves.push(newcasella)
                }
            } else {
                break;
            }
        }
        for (let i = 1; i < dim + 1; i++) {//dx up
            //console.log("Dx: "+(x+i));
            if (x + i < dim + 1 && y + i < dim + 1) {
                newcasella = String.fromCharCode(x + i + 65 - 1) + (y + i)
                try {
                    if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                        break;
                    }
                } catch { }
                if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                    possible_moves.push(newcasella)
                }
            } else {
                break;
            }
        }
        for (let i = 1; i < dim + 1; i++) {//dx down
            //console.log("Sx: "+(x-i));
            if (x + i < dim + 1 && y - i > 0) {
                newcasella = String.fromCharCode(x + i + 65 - 1) + (y - i)
                try {
                    if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                        break;
                    }
                } catch { }
                if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                    possible_moves.push(newcasella)
                }
            } else {
                break;
            }
        }
        return possible_moves;
    }

    moveKnight = function (casella, x, y) {
        var possible_moves = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        var newcasella;
        if (y + 2 < dim + 1) {
            if (x - 1 > 0) {
                newcasella = String.fromCharCode(x - 1 + 65 - 1) + (y + 2)
                if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                    possible_moves.push(newcasella)
                }
            }
            if (x + 1 < dim + 1) {
                newcasella = String.fromCharCode(x + 1 + 65 - 1) + (y + 2)
                if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                    possible_moves.push(newcasella)
                }
            }
        }
        if (y - 2 > 0) {
            if (x - 1 > 0) {
                newcasella = String.fromCharCode(x - 1 + 65 - 1) + (y - 2)
                if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                    possible_moves.push(newcasella)
                }
            }
            if (x + 1 < dim + 1) {
                newcasella = String.fromCharCode(x + 1 + 65 - 1) + (y - 2)
                if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                    possible_moves.push(newcasella)
                }
            }
        }
        if (x + 2 < dim + 1) {
            if (y - 1 > 0) {
                newcasella = String.fromCharCode(x + 2 + 65 - 1) + (y - 1)
                if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                    possible_moves.push(newcasella)
                }
            }
            if (y + 1 < dim + 1) {
                newcasella = String.fromCharCode(x + 2 + 65 - 1) + (y + 1)
                if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                    possible_moves.push(newcasella)
                }
            }
        }
        if (x - 2 > 0) {
            if (y - 1 > 0) {
                newcasella = String.fromCharCode(x - 2 + 65 - 1) + (y - 1)
                if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                    possible_moves.push(newcasella)
                }
            }
            if (y + 1 < dim + 1) {
                newcasella = String.fromCharCode(x - 2 + 65 - 1) + (y + 1)
                if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                    possible_moves.push(newcasella)
                }
            }
        }

        return possible_moves;
    }


    toro_moveRook = function (casella, x, y) {
        var possible_moves = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        var newcasella;
        for (let i = 1; i < dim * 2 + 1; i++) {//up
            newcasella = casella[0] + ((y + i - 1) % dim + 1)
            if (newcasella == casella) {
                break;
            }
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                possible_moves.push(newcasella)
            }
            try {
                if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                    break;
                }
            } catch {
                continue;
            }
        }
        for (let i = 1; i < dim * 2 + 1; i++) {//down
            var _y = y - i;
            while (_y <= 0) {
                _y += dim;
            }
            newcasella = casella[0] + ((_y - 1) % dim + 1)
            if (newcasella == casella) {
                break;
            }
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                possible_moves.push(newcasella)
            }
            try {
                if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                    break;
                }
            } catch {
                continue;
            }
        }
        for (let i = 1; i < dim * 2 + 1; i++) {//dx
            newcasella = String.fromCharCode(65 + ((x + i - 1) % dim + 1) - 1) + y
            if (newcasella == casella) {
                break;
            }
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                possible_moves.push(newcasella)
            }
            try {
                if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                    break;
                }
            } catch {
                continue;
            }
        }
        for (let i = 1; i < dim * 2 + 1; i++) {//sx
            var _x = x - i
            while (_x <= 0) {
                _x += dim;
            }
            newcasella = String.fromCharCode(65 + ((_x - 1) % dim + 1) - 1) + y
            if (newcasella == casella) {
                break;
            }
            if ($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                possible_moves.push(newcasella)
            }
            try {
                if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                    break;
                }
            } catch {
                continue;
            }
        }
        return possible_moves;
    }


    toro_moveBishop = function (casella, x, y) {
        var possible_moves = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        var newcasella;
        for (let i = 1; i < 2 * dim + 1; i++) {//sx up
            let _x = x - i
            while (_x <= 0) {
                _x += dim;
            }
            newcasella = String.fromCharCode(65 + ((_x - 1) % dim + 1) - 1) + ((y + i - 1) % dim + 1)
            if (newcasella == casella) {
                break;
            }
            try {
                if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                    break;
                }
            } catch { }
            if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                possible_moves.push(newcasella)
            }
        }
        for (let i = 1; i < dim + 1; i++) {//sx down
            let _x = x - i
            while (_x <= 0) {
                _x += dim;
            }
            let _y = y - i
            while (_y <= 0) {
                _y += dim;
            }
            newcasella = String.fromCharCode(65 + ((_x - 1) % dim + 1) - 1) + ((_y - 1) % dim + 1)
            if (newcasella == casella) {
                break;
            }
            try {
                if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                    break;
                }
            } catch { }
            if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                possible_moves.push(newcasella)
            }
        }
        for (let i = 1; i < dim + 1; i++) {//dx up
            newcasella = String.fromCharCode(65 + ((x + i - 1) % dim + 1) - 1) + ((y + i - 1) % dim + 1)
            if (newcasella == casella) {
                break;
            }
            try {
                if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                    break;
                }
            } catch { }
            if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                possible_moves.push(newcasella)
            }
        }
        for (let i = 1; i < dim + 1; i++) {//dx down
            let _y = y - i
            while (_y <= 0) {
                _y += dim;
            }
            newcasella = String.fromCharCode(65 + ((x + i - 1) % dim + 1) - 1) + ((_y - 1) % dim + 1)
            if (newcasella == casella) {
                break;
            }
            try {
                if (window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type"))) {
                    break;
                }
            } catch { }
            if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
                possible_moves.push(newcasella)
            }
        }
        return possible_moves;
    }

    toro_moveKnight = function (casella, x, y) {
        var possible_moves = new Array();
        var dim = parseInt(document.getElementById("chessboard").getAttribute("data-number-caselle"));
        var newcasella;
        var _xa = x - 1;
        if (_xa <= 0) {
            _xa += dim;
        }
        var _xb = x - 2;
        if (_xb <= 0) {
            _xb += dim;
        }
        var _ya = y - 1;
        if (_ya <= 0) {
            _ya += dim;
        }
        var _yb = y - 2;
        if (_yb <= 0) {
            _yb += dim;
        }
        newcasella = String.fromCharCode(65 + ((_xa - 1) % dim + 1) - 1) + ((y + 2 - 1) % dim + 1)
        if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        newcasella = String.fromCharCode(65 + ((x + 1 - 1) % dim + 1) - 1) + ((y + 2 - 1) % dim + 1)
        if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        newcasella = String.fromCharCode(65 + ((_xa - 1) % dim + 1) - 1) + ((_yb - 1) % dim + 1)
        if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        newcasella = String.fromCharCode(65 + ((x + 1 - 1) % dim + 1) - 1) + ((_yb - 1) % dim + 1)
        if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        newcasella = String.fromCharCode(65 + ((x + 2 - 1) % dim + 1) - 1) + ((_ya - 1) % dim + 1)
        if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        newcasella = String.fromCharCode(65 + ((x + 2 - 1) % dim + 1) - 1) + ((y + 1 - 1) % dim + 1)
        if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        newcasella = String.fromCharCode(65 + ((_xb - 1) % dim + 1) - 1) + ((_ya - 1) % dim + 1)
        if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        newcasella = String.fromCharCode(65 + ((_xb - 1) % dim + 1) - 1) + ((y + 1 - 1) % dim + 1)
        if (($("#" + newcasella).children().length == 0 || !window.obstacles.includes($("#" + newcasella).children()[0].getAttribute("data-type")))) {
            possible_moves.push(newcasella)
        }
        return possible_moves;
    }
}

export var pieceMove = new PieceMove()