import { MakeTimerClass } from "./maketimernew.js"
import { getQuiz } from "./myui.js"

class Page3 {
    constructor() { }
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
const page3 = new Page3();
export { page3 };