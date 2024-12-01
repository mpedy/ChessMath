class Quiz {
    constructor(quiz) {
        this.domanda = ""
        this.risposta = []
        this.punteggio = ""
        this.corretta = ""
        this.id = -1
        this.tempo = -1
        if (quiz) {
            this.id = quiz["quizid"]
            this.domanda = quiz["domanda"]
            this.risposta = quiz["risposta"]
            this.punteggio = parseInt(quiz["punteggio"])
            this.corretta = quiz["corretta"]
            this.tempo = parseInt(quiz["tempo"] ?? "30")
        }
    }
    setId = (identity) => {
        this.id = identity
    }
    addDomanda = (q) => {
        this.domanda = q
    }

    addRisposta = (a) => {
        this.risposta = a
    }

    addPunteggio = (p) => {
        this.punteggio = p
    }

    addCorretta = (c) => {
        this.corretta = c
    }

    addTempo = (t) => {
        this.tempo = t
    }
    set = (a, b) => {
        a = a.lower()
        if (a == "id") {
            this.setId(b)
        }
        else if (a == "domanda") {
            this.addDomanda(b)
        }
        else if (a == "risposta") {
            this.addRisposta(b)
        }
        else if (a == "punteggio") {
            this.addPunteggio(b)
        }
        else if (a == "corretta") {
            this.addCorretta(b)
        }
        else if (a == "tempo") {
            this.addTempo(b)
        } else {
            throw Exception("No correspondence for property {a} -> {b} of Quiz")
        }
    }
    json = () => {
        return { "domanda": this.domanda, "risposta": this.risposta, "corretta": this.corretta, "punteggio": this.punteggio, "tempo": this.tempo }
    }

}

module.exports = {
    Quiz: Quiz
}