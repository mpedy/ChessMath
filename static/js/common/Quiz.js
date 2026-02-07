import { MakeTimerClass } from "../Utility/Maketimer.js"
import { getQuiz } from "../Utility/MyUI.js"

class Quiz {
    constructor(name) {this.name = name}
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
export { Quiz };