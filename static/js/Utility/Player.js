import { CookieManager } from "./CookieManager.js";

class Player {
    constructor(name) {
        this.KEY_NAME = "chessmath_player_data_item";
        this.name = name;
        this.score = 0;
        window.player = this; // Riferimento globale al player
        if (this.isNodeJS()) return; // Non inizializzare lo stato se siamo in un ambiente di build/test (Node.js)
        if (this.isAnimatore()) return;
        if (this.isFirstPage()) {
            this.resetState();
        }else{
            document.addEventListener("DOMContentLoaded", () => {
                this.loadState();
            });
            //this.loadState();
        }
    }
    isFirstPage() {
        return !window.location.href.includes("game_");
    }
    resetState() {
        this.name = "";
        this.score = 0;
        this.deleteState();
    }
    isNodeJS() {
        try { if (process) return true; } catch (err) { return false; }
        return false;
    }
    isAnimatore() {
        if (this.isNodeJS()) return; // Non inizializzare lo stato se siamo in un ambiente di build/test (Node.js)
        return window.location.href.includes("game_Animatore");
    }
    setName(name) {
        if (this.isAnimatore()) { return; }
        this.name = name;
        this.saveState();
    }
    updateScore(points) {
        if (this.isAnimatore()) { return; }
        this.score += points;
        this.saveState();
    }
    setScore(points) {
        if (this.isAnimatore()) { return; }
        this.score = points;
        this.saveState();
    }
    saveState() {
        if (this.isNodeJS()) return; // Non inizializzare lo stato se siamo in un ambiente di build/test (Node.js)
        if (this.isAnimatore()) { return; }
        try {
            window.localStorage.setItem(this.KEY_NAME, JSON.stringify({ "name": this.name, "score": this.score }));
        } catch (err) {
            console.error("Error saving player state: ", err, "\nFalling back to cookies.");
        }
        try {
            CookieManager.setCookie(this.KEY_NAME, JSON.stringify({ "name": this.name, "score": this.score }), 365);
        } catch (err) {
            console.error("Error saving player state in cookie: ", err);
        }
    }
    loadState() {
        if (this.isNodeJS()) return; // Non inizializzare lo stato se siamo in un ambiente di build/test (Node.js)
        if (this.isAnimatore()) { return; }
        try { if (process) return; } catch (err) { } // Non caricare lo stato se siamo in un ambiente di build/test (Node.js)
        let loaded = false;
        try {
            const playerData = window.localStorage.getItem(this.KEY_NAME);
            if (playerData) {
                const player = JSON.parse(playerData);
                this.name = player.name;
                this.score = player.score;
                if (window.updatePoints) {
                    window.updatePoints(this.score);
                    $("#name").text(this.name);
                }
                loaded = true;
            }
        } catch (err) {
            console.error("Nothing found in local storage: ", err);
        }
        if (!loaded) {
            try {
                const playerData = CookieManager.getCookie(this.KEY_NAME);
                if (playerData) {
                    const player = JSON.parse(playerData);
                    this.name = player.name;
                    this.score = player.score;
                    if (window.updatePoints) {
                        window.updatePoints(this.score);
                        $("#name").text(this.name);
                    }
                    loaded = true;
                }
            } catch (err) {
                console.log("Nothing found in cookies: ", err);
            }
        }
    }
    deleteState() {
        if (this.isNodeJS()) return; // Non inizializzare lo stato se siamo in un ambiente di build/test (Node.js)
        CookieManager.deleteCookie(this.KEY_NAME);
        try {
            window.localStorage.removeItem(this.KEY_NAME);
        } catch (err) {
            console.log("Error deleting player state from local storage: ", err);
        }
    }
}

export { Player };