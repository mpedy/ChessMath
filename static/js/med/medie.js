import { Prototipo } from "../prototipo.js";
import { ascolta } from "../ascolta.js";
import { attesa } from "../attesa.js";
import { Quiz } from "../Quiz.js";
import { classifica } from "../classifica.js";
import { endpage } from "../endpage.js";

import { scacchiera_vuota } from "../common/Scacchiera_vuota.js";
import { torre_help } from "../common/TorreHelp.js";
import { img_allsquares } from "../common/ImgAllSquares.js";

import { gioco1 } from "./pages/gioco1.js";
import { img_gioco1 } from "./pages/img_gioco1.js";
import { gioco2 } from "./pages/gioco2.js";
import { gioco4 } from "./pages/gioco4.js";
import { gioco5 } from "./pages/gioco5.js";
import { img_gioco5 } from "./pages/img_gioco5.js";
import { gioco6 } from "./pages/gioco6.js";
import { img_gioco6 } from "./pages/img_gioco6.js";
import { gioco7 } from "./pages/gioco7.js";
import { img_gioco7 } from "./pages/img_gioco7.js";
import { gioco8 } from "./pages/gioco8.js";
import { quiz8 } from "./pages/quiz8.js";
import { quiz9 } from "./pages/quiz9.js";
import { quiz10 } from "./pages/quiz10.js";
import { quiz11 } from "./pages/quiz11.js";
import { img_gioco10 } from "./pages/img_gioco10.js";
import { gioco11b } from "./pages/gioco11b.js";
import { img_gioco11 } from "./pages/img_gioco11.js";
import { img_cavallo } from "./pages/img_cavallo.js";
import { gioco_spirit } from "./pages/gioco_spirit.js";
import { img_gioco_spirit } from "./pages/img_gioco_spirit.js";
import { gioco13b } from "./pages/gioco13b.js";
import { gioco13b_soluzione } from "./pages/gioco13b_soluzione.js";
import { gioco12b } from "./pages/gioco12b.js";
import { gioco12b_soluzione } from "./pages/gioco12b_soluzione.js";
import { quiz14 } from "./pages/quiz14.js";


class Medie extends Prototipo {
    constructor() {
        super();
        this.pages = [attesa, new Quiz("quiz1"), ascolta, new Quiz("quiz2"), scacchiera_vuota, ascolta, torre_help, gioco1, img_gioco1, new Quiz("quiz3"), new Quiz("quiz4"), new Quiz("quiz5"), new Quiz("quiz6"), attesa, gioco2, gioco4, new Quiz("quiz7"), ascolta,
            gioco5, img_gioco5, gioco6, img_gioco6, ascolta, gioco7, img_gioco7, gioco8, quiz8, quiz9, quiz10, ascolta,
            quiz11, img_gioco10, gioco11b, img_gioco11, img_allsquares, ascolta, img_cavallo, gioco_spirit, img_gioco_spirit, gioco13b, gioco13b_soluzione, gioco12b, gioco12b_soluzione, ascolta,
            quiz14, ascolta, new Quiz("quiz16"),
            classifica, endpage];
    }
    setPage(index) {
        this.currentPageIndex = index;
        this.currentPage = this.pages[index];
        this.currentPage.start();
    }
}

const medie = new Medie();

export { medie };