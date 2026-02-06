import { MakeTimerClass } from "../../maketimernew.js"
import { getQuiz } from "../../myui.js"

class Page38 {
    constructor() { }
    start() {
        window.maketimer = new MakeTimerClass()
        window.can_answer = true
        getQuiz();
    }
}
const page38 = new Page38();
export { page38 };