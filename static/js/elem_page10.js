import { MakeTimerClass } from "./maketimernew.js"
import { getQuiz } from "./myui.js"

class Page10 {
    constructor() { }
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
const page10 = new Page10();
export { page10 };