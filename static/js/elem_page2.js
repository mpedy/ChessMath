import { MakeTimerClass } from "./maketimernew.js"
import { getQuiz } from "./myui.js"

class Page2 {
    constructor() { }
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
const page2 = new Page2();
export { page2 };