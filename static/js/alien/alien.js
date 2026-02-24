import { PrototipoStory } from "../common/PrototipoStory.js";

import { ascolta_animatore, ascolta_torre, ascolta_alfiere, ascolta_cavallo, ascolta_regina } from "../common/Ascolta.js";
import { classifica } from "../common/Classifica.js";
import { endpage } from "../common/Endpage.js";

import { gioco1 } from "./pages/gioco1.js";
import { gioco2 } from "./pages/gioco2.js";
import { gioco3 } from "./pages/gioco3.js";
import { gioco4 } from "./pages/gioco4.js";

class Alien extends PrototipoStory {
    constructor() {
        super();
        this.pages = [ascolta_animatore, ascolta_torre, gioco1, gioco2, gioco3, gioco4, ascolta_alfiere, ascolta_regina, classifica, endpage];
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


var alien = new Alien();

export { alien };