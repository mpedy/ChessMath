import { elementari } from "./elem/elementari.js";
import { medie } from "./med/medie.js";
import { liceo } from "./lic/liceo.js";

class App {
    constructor() {
        this.elementari = elementari;
        this.medie = medie;
        this.liceo = liceo;
        this.currentGame = null;
        this.path = "";
    }
    setPath(path) {
        this.path = path;
        if (this.path.includes("elementari") || this.path == 1) {
            if (this.currentGame != this.elementari) {
                this.loadGame(this.elementari)
            }
        } else if (this.path.includes("medie") || this.path == 2) {
            if (this.currentGame != this.medie) {
                this.loadGame(this.medie)
            }
        } else if (this.path.includes("liceo") || this.path == 3) {
            if (this.currentGame != this.liceo) {
                this.loadGame(this.liceo)
            }
        }
    }
    loadGame(game) {
        if (this.currentGame) {
            this.currentGame.dismount();
            this.currentGame = game;
            this.currentGame.mount();
        } else {
            this.currentGame = game;
            this.currentGame.mount();
        }
    }
}

window.app = new App();