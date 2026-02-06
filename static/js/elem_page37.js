import { MakeTimerClass } from "./maketimernew.js"
import { getQuiz } from "./myui.js"

class Page37 {
    constructor() { }
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
const page37 = new Page37();
export { page37 };