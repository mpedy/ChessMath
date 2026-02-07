import { MakeTimerClass } from "../maketimernew.js"
import { getQuiz } from "../myui.js"

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
            } catch (errore) {
                pressed = false;
                console.error(errore);
            }
            if (!pressed) {
                window.myalert("Tempo esaurito!", "E' scaduto il tempo!");
            }
            window.can_answer = false
            document.getElementsByClassName(".risposta")[0].classList.toggle("disabled")
        }
        getQuiz(maketimer);
    }
}

export { LicQuiz };