from random import seed, randint
from datetime import datetime
import hashlib
from src.Quiz import Quiz


class GameOptions():

    def __init__(self):
        self.all_path = ["elementari", "medie", "liceo", "natale", "alien"]
        self.MyQuiz = []
        self.Classifica = {}
        self.Classifica_ordered = []
        self.Answered = {}
        self.allNames = []
        self.UUID_NAME = {}
        seed(datetime.now().timestamp())
        # Codice per accedere al lab
        self.updateCodice()
        self.page = 0
        # Codice per autorizzare il cambio pagina
        self.setPageCode = randint(100000000, 999999999)
        self.changePath("liceo")

    def updateCodice(self):
        seed(datetime.now().timestamp())
        self.codice = randint(10, 999)

    def reset(self):
        self.UUID_NAME = {}
        self.allNames = []
        self.Classifica = {}
        self.Classifica_ordered = []
        self.Answered = {}

    def fetchQuiz(self):
        with open(f"src/Domande/{self.percorso}", "r", encoding="utf-8") as f:
            import json
            domande = json.load(f)
        return domande

    def loadNewQuiz(self):
        self.MyQuiz = [Quiz(quiz) for quiz in self.fetchQuiz()]

    def generaUuid(self, nomeFinale):
        uuidGenerator = hashlib.sha512()
        uuidGenerator.update((str(self.codice)+nomeFinale).encode())
        uuid = uuidGenerator.hexdigest()
        self.UUID_NAME[uuid] = nomeFinale
        return uuid

    def getNameFromUUID(self, uuid):
        return self.UUID_NAME.get(uuid, None)

    def changePath(self, path):
        self.percorso = path
        self.page = 0
        self.loadNewQuiz()

    def reloadPath(self):
        self.changePath(self.percorso)
