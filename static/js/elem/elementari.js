import { Prototipo } from "../prototipo.js";
import { ascolta } from "../ascolta.js";
import { attesa } from "../attesa.js";
import { Quiz } from "../Quiz.js";

import { page4  as scacchiera_vuota} from "./pages/elem_page4.js";
import { page5 as battaglia_navale} from "./pages/elem_page5.js";
import { page6 as torre_help} from "./pages/elem_page6.js";
import { page7 as gioco1} from "./pages/elem_page7.js";
import { page8 as img_gioco1 } from "./pages/elem_page8.js";


import { page14 as gioco2 } from "./pages/elem_page14.js";
import { page15 as gioco3 } from "./pages/elem_page15.js";
import { page16 as gioco4 } from "./pages/elem_page16.js";

import { page18 as gioco5 } from "./pages/elem_page18.js";
import { page19 as img_gioco5 } from "./pages/elem_page19.js";
import { page20 as gioco6 } from "./pages/elem_page20.js";
import { page21 as img_gioco6 } from "./pages/elem_page21.js";
import { page22 as gioco7 } from "./pages/elem_page22.js";
import { page23 as img_gioco7 } from "./pages/elem_page23.js";

import { page26 as quiz11 } from "./pages/elem_page26.js";
import { page27 as quiz12 } from "./pages/elem_page27.js";
import { page28 as quiz13 } from "./pages/elem_page28.js";
import { page29 as gioco8 } from "./pages/elem_page29.js";
import { page30 as gioco9 } from "./pages/elem_page30.js";
import { page31 as quiz14 } from "./pages/elem_page31.js";
import { page32 as gioco10 } from "./pages/elem_page32.js";
import { page33 as img_gioco10 } from "./pages/elem_page33.js";
import { page34 as gioco11 } from "./pages/elem_page34.js";
import { page35 as img_gioco11 } from "./pages/elem_page35.js";
import { page36 as img_allsquare } from "./pages/elem_page36.js";

import { classifica } from "../classifica.js";
import { endpage } from "../endpage.js";


class Elementari extends Prototipo {
    constructor() {
        super();
        this.pages = [ attesa, new Quiz("quiz1") , new Quiz("quiz2"), ascolta, new Quiz("quiz3"), scacchiera_vuota, battaglia_navale, ascolta, torre_help, gioco1, img_gioco1, new Quiz("quiz4"), new Quiz("quiz5"), new Quiz("quiz6"), new Quiz("quiz7"), attesa,
            gioco2, gioco3, gioco4, new Quiz("quiz8"), ascolta,
            gioco5, img_gioco5, gioco6, img_gioco6, ascolta, gioco7, img_gioco7, new Quiz("quiz9"), new Quiz("quiz10"), quiz11, quiz12, quiz13, gioco8, gioco9, ascolta,
            quiz14, gioco10, img_gioco10, gioco11, img_gioco11, img_allsquare, new Quiz("quiz15"), ascolta, new Quiz("quiz16"), classifica, endpage];
    }
    setPage(index) {
        debugger;
        this.currentPageIndex = index;
        this.currentPage = this.pages[index];
        this.currentPage.start();
    }
}

const elementari = new Elementari();

export { elementari };