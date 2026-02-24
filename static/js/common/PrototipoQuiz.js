import { PrototipoGame } from "./PrototipoGame.js";

class PrototipoQuiz extends PrototipoGame {
    constructor(name, options, img_source = undefined) {
        super();
        this.name = name;
        this.options = options.split(".");
        this.html = `<div id="quiz">`;
        for (let i = 0; i < this.options.length; i++) {
            switch (this.options[i]) {
                case "title": this.html += `<span id="title"></span>`; break;
                case "question": this.html += `<div id="question"></div>`; break;
                case "img": this.html += `<img src="${img_source}" />`; break;
                case "answers": this.html += `<ul id="answers"></ul>`; break;
                case "chessboard": this.html += `<div id="chessboard"></div>`; break;
            }
        }
        this.html += `</div>`;
    }
}

export { PrototipoQuiz };