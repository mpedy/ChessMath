import { Prototipo } from "../common/Prototipo.js";

import { attesa } from "../common/Attesa.js";
import { ascolta } from "../common/Ascolta.js";
import { classifica } from "../common/Classifica.js";
import { endpage } from "../common/Endpage.js";

import { gioco1 } from "./pages/gioco1.js";
import { gioco2 } from "./pages/gioco2.js";
import { gioco3 } from "./pages/gioco3.js";
import { gioco4 } from "./pages/gioco4.js";

class Alien extends Prototipo {
    constructor() {
        super();
        this.pages = [attesa, ascolta, gioco1, gioco2, gioco3, gioco4, ascolta, ascolta, classifica, endpage];
    }
    setPage(index) {
        this.currentPageIndex = index;
        this.currentPage = this.pages[index];
        this.currentPage.start();
    }
}


var alien = new Alien();

export { alien };