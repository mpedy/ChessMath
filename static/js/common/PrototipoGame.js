import { MakeTimerClass } from "../Utility/Maketimer";

/* global $ */
class PrototipoGame {
    constructor(html = undefined, name = "PrototipoGame") {
        this.maketimer = new MakeTimerClass();
        this.html = html;
        this.name = name;
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