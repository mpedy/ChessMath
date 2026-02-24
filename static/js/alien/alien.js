import { PrototipoStory } from "../common/PrototipoStory.js";

import { ascolta_animatore, ascolta_torre, ascolta_alfiere, ascolta_cavallo, ascolta_regina, Ascolta } from "../common/Ascolta.js";
import { classifica } from "../common/Classifica.js";
import { endpage } from "../common/Endpage.js";

import { gioco1 } from "./pages/gioco1.js";
import { gioco2 } from "./pages/gioco2.js";
import { gioco3 } from "./pages/gioco3.js";
import { gioco4 } from "./pages/gioco4.js";

var transition1 = new Ascolta(`<div>
    <img src="static/img/Earth.png" width="100%" class="transitioning-img transition-stopped" />
</div>
<script>
    setTimeout(function () {
        document.getElementsByClassName("transitioning-img")[0].classList.toggle("transition-stopped");
    }, 100);
</script>`);

var transition2 = new Ascolta(`<div>
    <img src="static/img/alien1.png" width="100%" class="transitioning-img transition-stopped" />
</div>
<script>
    setTimeout(function () {
        document.getElementsByClassName("transitioning-img")[0].classList.toggle("transition-stopped");
    }, 100);
</script>`);

var transition3 = new Ascolta(`<div>
    <img src="static/img/alien2.png" width="100%" class="transitioning-img transition-stopped" />
</div>
<script>
    setTimeout(function () {
        document.getElementsByClassName("transitioning-img")[0].classList.toggle("transition-stopped");
    }, 100);
</script>`);

class Alien extends PrototipoStory {
    constructor() {
        super();
        this.pages = [ascolta_animatore, transition1, gioco1, gioco2, gioco3, gioco4, transition2, transition3, classifica, endpage];
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