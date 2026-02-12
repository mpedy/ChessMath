from starlette.responses import JSONResponse


class Quiz:
    def __init__(self, d: dict = None):
        self.domanda = ""
        self.risposta = []
        self.punteggio = ""
        self.corretta = ""
        self.id = -1
        self.tempo = -1
        if d is not None:
            self.id = d["quizid"]
            self.domanda = d["domanda"]
            self.risposta = d["risposta"]
            self.punteggio = int(d["punteggio"])
            self.corretta = d["corretta"]
            self.tempo = int(d.get("tempo", "30"))

    def setId(self, identity):
        self.id = identity

    def addDomanda(self, q):
        self.domanda = q

    def addRisposta(self, a):
        self.risposta = a

    def addPunteggio(self, p):
        self.punteggio = p

    def addCorretta(self, c):
        self.corretta = c

    def addTempo(self, t):
        self.tempo = t

    def set(self, a, b):
        a = a.lower()
        if a == "id":
            self.setId(b)
        elif a == "domanda":
            self.addDomanda(b)
        elif a == "risposta":
            self.addRisposta(b)
        elif a == "punteggio":
            self.addPunteggio(b)
        elif a == "corretta":
            self.addCorretta(b)
        elif a == "tempo":
            self.addTempo(b)
        else:
            raise Exception(
                f"No correspondence for property {a} -> {b} of Quiz")

    def __repr__(self):
        return str(self.id)

    def __str__(self):
        return f""""domanda": {self.domanda}, "risposta": {self.risposta}, "corretta": {self.corretta}, "punteggio": {self.punteggio}, "tempo": {self.tempo}"""

    def json(self):
        return JSONResponse({"domanda": self.domanda, "risposta": self.risposta, "corretta": self.corretta, "punteggio": self.punteggio, "tempo": self.tempo})
