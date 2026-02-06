import { MakeTimerClass } from "./maketimernew.js"
import { getQuiz } from "./myui.js"

class Page11 {
    constructor() { }
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
const page11 = new Page11();
export { page11 };