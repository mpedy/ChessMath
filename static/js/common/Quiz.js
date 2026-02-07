import { MakeTimerClass } from "../maketimernew.js"
import { getQuiz } from "../myui.js"

class Quiz {
    constructor(name) {this.name = name}
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
export { Quiz };