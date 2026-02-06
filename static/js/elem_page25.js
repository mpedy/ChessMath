import { MakeTimerClass } from "./maketimernew.js"
import { getQuiz } from "./myui.js"

class Page25 {
    constructor() { }
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
const page25 = new Page25();
export { page25 };