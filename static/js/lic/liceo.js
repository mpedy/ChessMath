import { PrototipoStory } from "../common/PrototipoStory.js";
import { ascolta_animatore, ascolta_torre, ascolta_alfiere, ascolta_cavallo, ascolta_regina, Ascolta } from "../common/Ascolta.js";
import { battaglia_navale } from "./pages/BattagliaNavale.js";
import { LicQuiz } from "./LicQuiz.js";
import { classifica } from "../common/Classifica.js";
import { endpage } from "../common/Endpage.js";

/*import { scacchiera_vuota } from "../common/Scacchiera_vuota.js";
import { torre_help } from "../common/TorreHelp.js";*/
import { img_allsquares } from "../common/ImgAllSquares.js";

import { img_gioco1 } from "./pages/img_gioco1.js";
import { img_1 } from "./pages/img_1.js";
import { gioco2 } from "./pages/gioco2.js";
import { gioco3 } from "./pages/gioco3.js";
import { gioco4 } from "./pages/gioco4.js";
import { gioco5 } from "./pages/gioco5.js";
import { img_gioco5 } from "./pages/img_gioco5.js";
import { gioco6 } from "./pages/gioco6.js";
import { img_gioco6 } from "./pages/img_gioco6.js";
import { gioco6bis } from "./pages/gioco6bis.js";
import { img_gioco6bis } from "./pages/img_gioco6bis.js";
import { img_gioco7 } from "./pages/img_gioco7.js";
import { gioco8 } from "./pages/gioco8.js";
import { quiz8 } from "./pages/quiz8.js";
import { quiz9 } from "./pages/quiz9.js";
import { quiz10 } from "./pages/quiz10.js";
import { quiz11 } from "./pages/quiz11.js";
import { img_gioco10 } from "./pages/img_gioco10.js";
import { gioco11b } from "./pages/gioco11b.js";
import { img_gioco11b } from "./pages/img_gioco11b.js";
import { gioco11b_bis } from "./pages/gioco11b_bis.js";
import { img_gioco11b_bis } from "./pages/img_gioco11b_bis.js";
import { img_cavallo } from "./pages/img_cavallo.js";
import { gioco_spirit } from "./pages/gioco_spirit.js";
import { img_spirit } from "./pages/img_spirit.js";
import { gioco13b } from "./pages/gioco13b.js";
import { gioco13b_soluzione } from "./pages/gioco13b_soluzione.js";
import { gioco12b } from "./pages/gioco12b.js";
import { gioco12b_soluzione } from "./pages/gioco12b_soluzione.js";
import { quiz14 } from "./pages/quiz14.js";
import { gioco14 } from "./pages/gioco14.js";
import { gioco15 } from "./pages/gioco15.js";
import { img_gioco15 } from "./pages/img_gioco15.js";
import { img_regina } from "./pages/img_regina.js";
import { gioco16 } from "./pages/gioco16.js";
import { img_gioco16 } from "./pages/img_gioco16.js";
import { gioco17 } from "./pages/gioco17.js";
import { gioco_training_toro } from "./pages/gioco_training_toro.js";
import { gioco_toro } from "./pages/gioco_toro.js";
import { gioco_toro1 } from "./pages/gioco_toro1.js";
import { gioco_toro2 } from "./pages/gioco_toro2.js";
import { gioco_toro3 } from "./pages/gioco_toro3.js";
import { img_gioco_toro3 } from "./pages/img_gioco_toro3.js";

var quiz1 = new LicQuiz("Q Percorso più breve", "title.question.img.answers", "static/img/torre1.png");
var quiz2 = new LicQuiz("Q Quante caselle", "title.question.img.answers", "static/img/torre2.png");
var quiz7 = new LicQuiz("Q Quante caselle cfr 1", "title.question.answers");

var transition_torre = new Ascolta(`<div>
    <img src="static/img/torre.jpg" width="100%" class="transitioning-img transition-stopped" />
</div>
<script>
    setTimeout(function () {
        document.getElementsByClassName("transitioning-img")[0].classList.toggle("transition-stopped");
    }, 100);
</script>`, "Transizione Torre");

var transition_alfiere = new Ascolta(`<div>
    <img src="static/img/alfiere.jpg" width="100%" class="transitioning-img transition-stopped" />
</div>
<script>
    setTimeout(function () {
        document.getElementsByClassName("transitioning-img")[0].classList.toggle("transition-stopped");
    }, 100);
</script>`, "Transizione Alfiere");

var transition_cavallo = new Ascolta(`<div>
    <img src="static/img/cavallo.jpg" width="100%" class="transitioning-img transition-stopped" />
</div>
<script>
    setTimeout(function () {
        document.getElementsByClassName("transitioning-img")[0].classList.toggle("transition-stopped");
    }, 100);
</script>`, "Transizione Cavallo");

var transition_regina = new Ascolta(`<div>
    <img src="static/img/regina.jpg" width="100%" class="transitioning-img transition-stopped" />
</div>
<script>
    setTimeout(function () {
        document.getElementsByClassName("transitioning-img")[0].classList.toggle("transition-stopped");
    }, 100);
</script>`, "Transizione Regina");

class Liceo extends PrototipoStory {
    constructor() {
        super();
        this.pages = [
            ascolta_animatore,
            battaglia_navale,
            transition_torre,
            ascolta_torre,
            img_gioco1,
            quiz1,
            quiz2,
            img_1,
            gioco2,
            gioco3,
            gioco4,
            ascolta_animatore,
            quiz7,
            gioco5,
            img_gioco5,
            gioco6,
            img_gioco6,
            ascolta_animatore,
            gioco6bis,
            img_gioco6bis,
            classifica,
            transition_alfiere,
            ascolta_alfiere,
            img_gioco7,
            gioco8,
            quiz8,
            quiz9,
            quiz10,
            quiz11,
            img_gioco10,
            gioco11b,
            img_gioco11b,
            img_allsquares,
            gioco11b_bis,
            img_gioco11b_bis,
            classifica,
            transition_cavallo,
            ascolta_cavallo,
            img_cavallo,
            gioco_spirit,
            img_spirit,
            gioco13b,
            gioco13b_soluzione,
            gioco12b,
            gioco12b_soluzione,
            gioco14,
            gioco15,
            img_gioco15,
            classifica,
            transition_regina,
            ascolta_regina,
            img_regina,
            gioco16,
            img_gioco16,
            gioco17,
            ascolta_animatore,
            gioco_training_toro,
            gioco_toro,
            gioco_toro1,
            gioco_toro2,
            gioco_toro3,
            img_gioco_toro3,
            ascolta_animatore,
            quiz14,
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


var liceo = new Liceo();

export { liceo };