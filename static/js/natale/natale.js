import { Prototipo } from "../common/Prototipo.js";
import { ascolta } from "../common/Ascolta.js";
import { attesa } from "../common/Attesa.js";
import { NatQuiz } from "./NatQuiz.js";
import { classifica } from "../common/Classifica.js";
import { endpage } from "../common/Endpage.js";

/*import { scacchiera_vuota } from "../common/Scacchiera_vuota.js";
import { torre_help } from "../common/TorreHelp.js";*/
import { img_allsquares } from "../common/ImgAllSquares.js";

import { img_gioco1 } from "./pages/img_gioco1.js";
import { gioco2 } from "./pages/gioco2.js";
import { gioco4 } from "./pages/gioco4.js";
import { gioco5 } from "./pages/gioco5.js";
import { img_gioco5 } from "./pages/img_gioco5.js";
import { gioco6 } from "./pages/gioco6.js";
import { img_gioco6 } from "./pages/img_gioco6.js";
import { img_gioco7 } from "./pages/img_gioco7.js";
import { gioco8 } from "./pages/gioco8.js";
import { quiz8 } from "./pages/quiz8.js";
import { quiz9 } from "./pages/quiz9.js";
import { quiz10 } from "./pages/quiz10.js";
import { quiz11 } from "./pages/quiz11.js";
import { img_gioco10 } from "./pages/img_gioco10.js";
import { gioco11b } from "./pages/gioco11b.js";
import { img_gioco11b } from "./pages/img_gioco11b.js";
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
import { gioco19 } from "./pages/gioco19.js";
import { gioco_training_toro } from "./pages/gioco_training_toro.js";
import { gioco_toro } from "./pages/gioco_toro.js";
import { gioco_toro1 } from "./pages/gioco_toro1.js";
import { gioco_toro2 } from "./pages/gioco_toro2.js";


class Natale extends Prototipo {
    constructor() {
        super();
        this.pages = [attesa, ascolta, img_gioco1, new NatQuiz("quiz1"), new NatQuiz("quiz2"), ascolta, gioco2, gioco4, new NatQuiz("quiz7"), ascolta,
            gioco5, img_gioco5, gioco6, img_gioco6, ascolta, img_gioco7, gioco8, quiz8, quiz9, quiz10, ascolta,
            quiz11, img_gioco10, gioco11b, img_gioco11b, img_allsquares, ascolta, img_cavallo, gioco_spirit, img_spirit, gioco13b, gioco13b_soluzione, gioco12b, gioco12b_soluzione, gioco14, gioco15, img_gioco15, ascolta, img_regina, gioco16, img_gioco16, gioco17, gioco19, ascolta,
            gioco_training_toro, gioco_toro, gioco_toro1, gioco_toro2, ascolta, quiz14,
            classifica, endpage];
    }
    setPage(index) {
        this.currentPageIndex = index;
        this.currentPage = this.pages[index];
        this.currentPage.start();
    }
}


const natale = new Natale();

export { natale };