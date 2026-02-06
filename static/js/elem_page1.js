import { MakeTimerClass } from "./maketimernew.js"
import { getQuiz } from "./myui.js"

class Page1 {
    constructor() { }
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
const page1 = new Page1();
export { page1 };