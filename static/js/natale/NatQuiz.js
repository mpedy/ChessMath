import { PrototipoGame } from "../common/PrototipoGame.js";
import { MakeTimerClass } from "../Utility/Maketimer.js"
import { getQuiz } from "../Utility/MyUI.js"

/* global $ */
class NatQuiz extends PrototipoGame {
    constructor(name) {
        super();
        this.name = name;
    }
    start() {
        window.can_answer = true
        this.maketimer.stopTimerFunction = function (pressed) {
            try {
                if (pressed == undefined) {
                    pressed = false;
                }
            } catch {
                pressed = false;
            }
            if (!pressed) {
                window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
            }
            window.can_answer = false
            $(".risposta").toggleClass("disabled")
        }
        getQuiz(this.maketimer);
    }
}

export { NatQuiz };