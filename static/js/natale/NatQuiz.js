import { PrototipoQuiz } from "../common/PrototipoQuiz.js";
import { getQuiz } from "../Utility/MyUI.js"

/* global $ */
class NatQuiz extends PrototipoQuiz {
    constructor(name, options, img_source = undefined) {
        super(name, options, img_source);
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