import { PrototipoStory } from "../common/PrototipoStory.js";
import { ascolta_animatore, ascolta_torre, ascolta_alfiere } from "../common/Ascolta.js";
import { Quiz } from "../common/Quiz.js";
import { classifica } from "../common/Classifica.js";
import { endpage } from "../common/Endpage.js";


import { scacchiera_vuota } from "../common/Scacchiera_vuota.js";
import { battaglia_navale } from "../common/BattagliaNavale.js";
import { torre_help } from "../common/TorreHelp.js";
import { gioco1 } from "./pages/gioco1.js";
import { img_gioco1 } from "./pages/img_gioco1.js";


import { gioco2 } from "./pages/gioco2.js";
import { gioco3 } from "./pages/gioco3.js";
import { gioco4 } from "./pages/gioco4.js";

import { gioco5 } from "./pages/gioco5.js";
import { img_gioco5 } from "./pages/img_gioco5.js";
import { gioco6 } from "./pages/gioco6.js";
import { img_gioco6 } from "./pages/img_gioco6.js";
import { gioco7 } from "./pages/gioco7.js";
import { img_gioco7 } from "./pages/img_gioco7.js";

import { quiz11 } from "./pages/quiz11.js";
import { quiz12 } from "./pages/quiz12.js";
import { quiz13 } from "./pages/quiz13.js";
import { gioco8 } from "./pages/gioco8.js";
import { gioco9 } from "./pages/gioco9.js";
import { quiz14 } from "./pages/quiz14.js";
import { gioco10 } from "./pages/gioco10.js";
import { img_gioco10 } from "./pages/img_gioco10.js";
import { gioco11 } from "./pages/gioco11.js";
import { img_gioco11 } from "./pages/img_gioco11.js";
import { img_allsquares } from "../common/ImgAllSquares.js";

class Elementari extends PrototipoStory {
    constructor() {
        super();
        this.pages = [
            ascolta_animatore,
            new Quiz("quiz1"),
            new Quiz("quiz2"),
            ascolta_animatore,
            new Quiz("quiz3"),
            scacchiera_vuota,
            battaglia_navale,
            ascolta_torre,
            torre_help,
            gioco1,
            img_gioco1,
            new Quiz("quiz4"),
            new Quiz("quiz5"),
            new Quiz("quiz6"),
            new Quiz("quiz7"),
            ascolta_animatore,
            gioco2,
            gioco3,
            gioco4,
            new Quiz("quiz8"),
            ascolta_animatore,
            gioco5,
            img_gioco5,
            gioco6,
            img_gioco6,
            ascolta_alfiere,
            gioco7,
            img_gioco7,
            new Quiz("quiz9"),
            new Quiz("quiz10"),
            quiz11,
            quiz12,
            quiz13,
            gioco8,
            gioco9,
            ascolta_animatore,
            quiz14,
            gioco10,
            img_gioco10,
            gioco11,
            img_gioco11,
            img_allsquares,
            new Quiz("quiz15"),
            ascolta_animatore,
            new Quiz("quiz16"),
            classifica,
            endpage];
    }
    setPage(index) {
        if (this.currentPage && this.currentPage.dismount) {
            this.currentPage.dismount();
        }
        this.currentPageIndex = index;
        this.currentPage = this.pages[index];
        if (this.currentPage && this.currentPage.mount) {
            this.currentPage.mount();
        }
        this.currentPage.start();
    }
}

var elementari = new Elementari();

export { elementari };