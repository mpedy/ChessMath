import { MakeTimerClass } from "../maketimernew.js"
import { getQuiz } from "../myui.js"

var maketimer = new MakeTimerClass()

can_answer = true
maketimer.stopTimerFunction = function (pressed) {
    try {
        if (pressed == undefined) {
            pressed = false;
        }
    } catch (errore) {
        pressed = false;
    }
    if (!pressed) {
        myalert("Tempo esaurito!", "E' scaduto il tempo!");
    }
    can_answer = false
    $(".risposta").toggleClass("disabled")
}
getQuiz();