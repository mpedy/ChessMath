import { MakeTimerClass } from "../Utility/Maketimer";

class PrototipoGame {
    constructor() {
        this.maketimer = new MakeTimerClass();
    }
    dismount() {
        this.maketimer.clearTimer();
    }
    mount() { }
}

export { PrototipoGame };