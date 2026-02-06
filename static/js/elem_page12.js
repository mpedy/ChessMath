import { MakeTimerClass } from "./maketimernew.js"
import { getQuiz } from "./myui.js"

class Page12 {
    constructor() { }
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
const page12 = new Page12();
export { page12 };