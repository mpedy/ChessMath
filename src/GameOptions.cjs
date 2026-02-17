const fs = require("fs")
const { Quiz } = require("./Quiz.cjs")
class GameOptions {
    constructor() {
        this.codice = -1
        this.players = new Array()
        this.percorso = "path_3"
        this.page = 0;
        this.setPageCode = 123111321;
        this.Answered = {}
        this.MyQuiz;
    }
    reset = () => {
        this.players = new Array()
        this.allNames = []
        this.Classifica = {}
        this.Classifica_ordered = []
        this.Answered = {}
    }
    createCod = () => {
        this.codice = parseInt(Math.random() * 100000 % 990 + 1);
    }
    update = () => {
        return this.fetchQuiz(this.percorso)
            .then(res => { return this.obtainNewQuiz(res) })
            .then(res1 => { return res1 })
    }
    fetchQuiz = async () => {
        return new Promise((res, rej) => {
            fs.readFile(`src/Domande/${this.percorso}`, function (err, data) {
                if (err) {
                    console.error("Impossibile trovare il percorso richeisto: ", `src/Domande/${this.percorso}`)
                    rej(`Impossibile trovare il percorso richiesto: 'src/Domande/${this.percorso}'`)
                } else {
                    let domande = JSON.parse(data)
                    return res(domande)
                }
            })
        })
    }
    obtainNewQuiz = async (domande) => {
        return new Promise((res, rej) => {
            this.MyQuiz = []
            for (let d of domande) {
                let quiz = new Quiz(d)
                this.MyQuiz.push(quiz);
            }
            return res()
        })
    }
}

module.exports = {
    GameOptions: GameOptions
}