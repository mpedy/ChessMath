import { MakeTimerClass } from "./maketimernew.js"
import { getQuiz } from "./myui.js"

class Page9 {
    constructor() { }
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
const page9 = new Page9();
export { page9 };