import { MakeTimerClass } from "./maketimernew.js"
import { getQuiz } from "./myui.js"

class Page24 {
    constructor() { }
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
const page24 = new Page24();
export { page24 };