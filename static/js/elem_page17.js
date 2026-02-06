import { MakeTimerClass } from "./maketimernew.js"
import { getQuiz } from "./myui.js"

class Page17 {
    constructor() { }
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
const page17 = new Page17();
export { page17 };