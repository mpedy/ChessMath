import { MakeTimerClass } from "../Utility/Maketimer";

/* global $ */
class PrototipoGame {
    constructor(html = undefined) {
        this.maketimer = new MakeTimerClass();
        this.html = html;
    }
    dismount() {
        this.maketimer.clearTimer();
    }
    mount() {
        $("#mydialog_opened").dialog("close").remove();
        if (this.html) {
            $("#content_page").html(this.html);
        }
    }
}

export { PrototipoGame };