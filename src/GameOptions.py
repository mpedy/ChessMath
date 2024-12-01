from random import seed, random
from datetime import datetime
import hashlib
from src.Quiz import Quiz


class GameOptions():
    MyQuiz = []
    Classifica = {}
    Classifica_ordered = []
    Answered = {}
    allNames = []
    UUID_NAME = {}
    codice = -1
    page = 0
    percorso = "path_3"
    setPageCode = 123111321

    def __init__(self):
        self.MyQuiz = []
        self.Classifica = {}
        self.Classifica_ordered = []
        self.Answered = {}
        self.allNames = []
        self.UUID_NAME = {}
        seed(datetime.now().timestamp())
        self.codice = int(random()*100000 % 990+1)
        self.page = 0
        self.percorso = "path_3"
        setPageCode = 123111321

    def reset(self):
        self.UUID_NAME = {}
        self.allNames = []
        self.Classifica = {}
        self.Classifica_ordered = []
        self.Answered = {}

    def obtainNewQuiz(self, res):
        self.MyQuiz = []
        for q in res:
            quiz = Quiz(q)
            self.MyQuiz.append(quiz)
        # for i in res:
        #    q = False
        #    nuovo = True
        #    for qu in self.MyQuiz:
        #        if qu.id == i[0]:
        #            q = qu
        #            nuovo = False
        #            break
        #    if q is False:
        #        q = Quiz()
        #        q.setId(i[0])
        #    q.set(i[1],i[2])
        #    if nuovo:
        #        self.MyQuiz.append(q)

    def generaUuid(self, nomeFinale):
        uuidGenerator = hashlib.sha512()
        uuidGenerator.update((str(self.codice)+nomeFinale).encode())
        uuid = uuidGenerator.hexdigest()
        self.UUID_NAME[uuid] = nomeFinale
        return uuid
