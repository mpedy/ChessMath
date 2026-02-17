import { MakeTimerClass } from "../Utility/Maketimer.js"
import { getQuiz } from "../Utility/MyUI.js"

/* global $ */
class LicQuiz {
    constructor(name) {
        this.name = name;
    }
    start() {
        var maketimer = new MakeTimerClass()
        window.can_answer = true
        maketimer.stopTimerFunction = function (pressed) {
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
        getQuiz(maketimer);
    }
}

export { LicQuiz };