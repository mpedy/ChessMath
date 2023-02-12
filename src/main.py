import json
from starlette.applications import Starlette
from starlette.responses import JSONResponse, HTMLResponse, Response, PlainTextResponse, RedirectResponse, PlainTextResponse
from starlette.routing import Mount, Route, WebSocketRoute
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from starlette.middleware import Middleware
from starlette.endpoints import HTTPEndpoint, WebSocketEndpoint
from starlette.websockets import WebSocket
import threading


# per esportare da DB:
# select array_to_json(array_agg(t)) from (select quizid,tipo,json_agg(test) as "value" from chessmath.path_2 p group by quizid, tipo order by quizid, tipo desc) t; 


from Quiz import Quiz

from random import seed, random
from datetime import datetime
import hashlib


#import base64
#import binascii

from .customMiddleware import CustomHeaderMiddleware
from .httpsMiddleware import HTTPSRedirectMiddleware
#from .DBConnection import DBConnection

middleware = []

PROD = 0
if PROD == 1:
    middleware = [Middleware(HTTPSRedirectMiddleware)]
elif PROD == 2:
    middleware = [Middleware(CustomHeaderMiddleware)]


LISTEN = "pages/ascolta"

def getPath1():
    return [
        LISTEN,
        "pages/elem/quiz1",
        "pages/elem/quiz2",
        LISTEN,
        "pages/elem/quiz3",
        "pages/elem/scacchiera_vuota",
        "pages/elem/battaglia_navale",
        "pages/ascolta_torre", ## Torre
        "pages/torre_help",
        "pages/elem/gioco1",
        "pages/elem/img_gioco1",
        "pages/elem/quiz4",
        "pages/elem/quiz5",
        "pages/elem/quiz6",
        "pages/elem/quiz7",
        "pages/elem/img_1",
        "pages/elem/gioco2",
        "pages/elem/gioco3",
        "pages/elem/gioco4",
        "pages/elem/quiz8",
        LISTEN,
        "pages/elem/gioco5",
        "pages/elem/img_gioco5",
        "pages/elem/gioco6",
        "pages/elem/img_gioco6",
        "pages/ascolta_alfiere",## Alfiere
        "pages/elem/gioco7",
        "pages/elem/img_gioco7",
        "pages/elem/quiz9",
        "pages/elem/quiz10",
        "pages/elem/quiz11",
        "pages/elem/quiz12",
        "pages/elem/quiz13",
        "pages/elem/gioco8",
        "pages/elem/gioco9",
        LISTEN,
        "pages/elem/quiz14",
        "pages/elem/gioco10",
        "pages/elem/img_gioco10",
        "pages/elem/gioco11",
        "pages/elem/img_gioco11",
        "pages/elem/img_allsquare",
        "pages/elem/quiz15",
        LISTEN,
        "pages/elem/quiz16",
        "pages/classifica",
        "pages/endpage"
    ]

def getPath2():
    return [
        LISTEN,
        "pages/med/quiz1",
        LISTEN,
        "pages/med/quiz2",
        "pages/elem/scacchiera_vuota",
        "pages/ascolta_torre", ## Torre
        "pages/torre_help",
        "pages/med/gioco1",
        "pages/med/img_gioco1",
        "pages/med/quiz3",
        "pages/med/quiz4",
        "pages/med/quiz5",
        "pages/med/quiz6",
        "pages/med/img_1",
        "pages/med/gioco2",
        "pages/med/gioco4",
        "pages/med/quiz7",
        LISTEN,
        "pages/med/gioco5",
        "pages/med/img_gioco5",
        "pages/med/gioco6",
        "pages/med/img_gioco6",
        "pages/ascolta_alfiere", ## Alfiere
        "pages/med/gioco7",
        "pages/med/img_gioco7",
        "pages/med/gioco8",
        "pages/med/quiz8",
        "pages/med/quiz9",
        "pages/med/quiz10",
        LISTEN,
        "pages/med/quiz11",
        "pages/elem/img_gioco10",
        "pages/med/gioco11b",
        "pages/med/img_gioco11b",
        "pages/elem/img_allsquare",
        "pages/ascolta_cavallo",# CAVALLO
        "pages/med/img_cavallo",
        "pages/med/gioco_spirit",
        "pages/med/img_spirit",
        "pages/med/gioco13b",
        "pages/med/gioco13b_soluzione",
        "pages/med/gioco12b",
        "pages/med/gioco12b_soluzione",
        LISTEN,
        "pages/med/quiz14",
        LISTEN,
        "pages/med/quiz16",
        "pages/classifica",
        "pages/endpage"
    ]

def getPath3():
    return [
        LISTEN,
        "pages/ascolta_torre",
        "pages/lic/img_gioco1",
        "pages/lic/quiz1",
        "pages/lic/quiz2",
        "pages/lic/img_1",
        "pages/lic/gioco2",
        "pages/lic/gioco4",
        "pages/lic/quiz7",
        LISTEN,
        "pages/lic/gioco5",
        "pages/lic/img_gioco5",
        "pages/lic/gioco6",
        "pages/lic/img_gioco6",
        "pages/ascolta_alfiere", ## Alfiere
        "pages/lic/img_gioco7",
        "pages/lic/gioco8",
        "pages/lic/quiz8",
        "pages/lic/quiz9",
        "pages/lic/quiz10",
        LISTEN,
        "pages/lic/quiz11",
        "pages/lic/img_gioco10",
        "pages/lic/gioco11b",
        "pages/lic/img_gioco11b",
        "pages/lic/img_allsquare",
        "pages/ascolta_cavallo",# CAVALLO
        "pages/lic/img_cavallo",
        "pages/lic/gioco_spirit",
        "pages/lic/img_spirit",
        "pages/lic/gioco13b",
        "pages/lic/gioco13b_soluzione",
        "pages/lic/gioco12b",
        "pages/lic/gioco12b_soluzione",
        "pages/lic/gioco14",
        "pages/lic/gioco15",
        "pages/lic/img_gioco15",
        "pages/ascolta_regina",
        "pages/lic/img_regina",
        "pages/lic/gioco16",
        "pages/lic/img_gioco16",
        "pages/lic/gioco17",
        #"pages/lic/gioco18",
        LISTEN,
        "pages/lic/gioco_training_toro",
        "pages/lic/gioco_toro",
        "pages/lic/gioco_toro1",
        "pages/lic/gioco_toro2",
        LISTEN, ## da fare da qui in avanti per i quiz
        "pages/lic/quiz14",
        #LISTEN,
        #"pages/lic/quiz16",
        "pages/classifica",
        "pages/endpage"
    ]

allpages = {
    "path_1": getPath1(),
    "path_2": getPath2(),
    "path_3" : getPath3()
}

class GameOptions():
    MyQuiz = []
    Classifica = {}
    Classifica_ordered =[]
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
        self.codice = int(random()*100000%990+1)
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
        for i in res:
            q = False
            nuovo = True
            for qu in self.MyQuiz:
                if qu.id == i[0]:
                    q = qu
                    nuovo = False
                    break
            if q is False:
                q = Quiz()
                q.setId(i[0])
            q.set(i[1],i[2])
            if nuovo:
                self.MyQuiz.append(q)
    def generaUuid(self, nomeFinale):
        uuidGenerator = hashlib.sha512()
        uuidGenerator.update((str(self.codice)+nomeFinale).encode())
        uuid = uuidGenerator.hexdigest()
        self.UUID_NAME[uuid] = nomeFinale
        return uuid

opt = GameOptions()
websockets = []
lock = threading.Lock()

templates = Jinja2Templates(directory="pages")

async def welcome(request):
    return HTMLResponse(open('pages/welcome',"r").read())

async def mainRoute(request):
    global opt
    try:
        uuid = request.path_params["uuid"]
        if uuid == "Animatore":
            return templates.TemplateResponse('index.html', {"request":request, "nome": "Animatore", "codice": opt.codice})
        return templates.TemplateResponse('index.html', {"request":request, "nome": opt.UUID_NAME[uuid], "codice": opt.codice})
    except Exception as e:
        print("Errore in mainRoute con request: ",str(request))
    return RedirectResponse("/")

async def gotoPage(request):
    global opt
    opt.page = request.path_params['page']
    try:
        return HTMLResponse(open(allpages[opt.percorso][opt.page]).read())
    except Exception as e:
        return HTMLResponse(f"""<div> Errore: {e} """)

async def returnPage(request):
    global opt
    cod = int(request.path_params["cod"])
    if cod == opt.codice:
        return JSONResponse({"page": opt.page})
    else:
        return RedirectResponse("/",status_code=401)


async def notifyAllWS():
    global opt
    global websockets
    for ws in websockets:
        if ws["cod"] == opt.codice:
            await ws["ws"].send_text(json.dumps({"pagina": opt.page}))



async def setPage(request):
    global opt
    code = request.path_params['code']
    if code == opt.setPageCode:
        new_page = request.path_params['page']
        if new_page in range(0,len(allpages[opt.percorso])):
            opt.page = new_page
            opt.Answered = {}
            opt.Answered[opt.page] = []
        arr = allpages[opt.percorso]
        l = len(arr)
        res = [arr[opt.page-1] if opt.page-1 in range(0,l) else None, arr[opt.page] if opt.page in range(0,l) else None, arr[opt.page+1] if opt.page+1 in range(0,l) else None]
        await notifyAllWS()
        return JSONResponse({"status":"ok","prev":res[0],"current":res[1],"next":res[2]})
    else:
        return Response("Errore: codice non valido");

def fetchQuiz(path: str):
    global opt
    #dbConn = DBConnection()
    #dbConn.openConnectionAndCursor()
    #res = dbConn.executeAndFetchall("select quizid, tipo, json_agg(test) from chessmath."+path+" group by quizid, tipo order by quizid, tipo desc;")
    #dbConn.closeConnectionAndCursor()
    #print("RES prima")
    #print(res, type(res[0]))
    with open(f"Domande/{path}","r") as f:
        import json
        domande = json.load(f)
        res = []
        for d in domande:
            res.append((d['quizid'],d['tipo'],d['value']))
    #print("RES dopo")
    #print(res)
    return res

async def updateQuest(request):
    global opt
    opt.MyQuiz = []
    res = fetchQuiz(opt.percorso)
    opt.obtainNewQuiz(res)
    return Response("ok")

async def setPath(request):
    global opt
    opt.percorso = "path_"+str(request.path_params['path'])
    opt.page = 0
    res = fetchQuiz(opt.percorso)
    opt.obtainNewQuiz(res)
    return Response("ok")

async def getquiz(request):
    global opt
    localpath = allpages[opt.percorso][int(opt.page)]
    try:
        quizid = int(localpath[localpath.index("quiz")+4:])
        return opt.MyQuiz[quizid-1].json()
    except Exception as e:
        print("Errore in getquiz: ",opt.page, opt.MyQuiz,": "+str(e))
        return Response("Errore")


async def startup_task():
    global opt
    res = fetchQuiz(opt.percorso)
    opt.obtainNewQuiz(res)

async def settacodice(request):
    global opt
    opt.codice = request.path_params["codice"]
    return Response("ok")

async def verificacodice(request):
    global opt
    cod = request.path_params["codice"]
    if cod == opt.codice:
        return Response("ok")
    else:
        print("Il codice non è valido")
        return Response("ko",status_code=401)


async def getanimpage(request):
    global opt
    try:
        form = await request.form()
        if form["username"] == "anim" and form["password"] == "1324354321":
            seed(datetime.now().timestamp())
            opt.codice = int(random()*100000%990+1)
            return templates.TemplateResponse("anim", {"request": request, "codice": opt.codice})
        else:
            return templates.TemplateResponse("anim_key", {"request": request, "errore": """<div id="error_msg_anim">Codice Errato!</div>"""})
    except Exception as e:
        print("Eccezione trovata: "+str(e))
        return RedirectResponse("/anim")

async def getcodice(request):
    global opt
    return Response(str(opt.codice))

async def addNome(request):
    global opt
    nomeDaAggiungere = request.path_params["nome"]
    numDiNomiUguali = 0
    nomeFinale = ""
    try:
        indiceDelNomeDaAggiungere = opt.allNames.index(nomeDaAggiungere)
        if indiceDelNomeDaAggiungere >=0:
            numDiNomiUguali = 1
            while indiceDelNomeDaAggiungere >=0:
                indiceDelNomeDaAggiungere = opt.allNames.index(nomeDaAggiungere+"-"+str(numDiNomiUguali))
                numDiNomiUguali+=1
    except Exception as e:
        nomeFinale = nomeDaAggiungere
        if numDiNomiUguali > 0:
            nomeFinale+="-"+str(numDiNomiUguali)
        opt.allNames.append(nomeFinale)
    uuid = opt.generaUuid(nomeFinale)
    return Response(uuid)

async def reset(request):
    global opt
    global websockets
    opt.reset()
    with lock:
        import copy
        ws_all = copy.copy(websockets)
        for ws in ws_all:
            await ws["ws"].close()
    return Response("ok")

async def endGame(request):
    return HTMLResponse(open("pages/end").read())

async def addPoints(request):
    global opt
    nome = request.path_params["nome"]
    punti = int(request.path_params["pt"])
    if nome != "Animatore":
        opt.Classifica[nome] = punti
        opt.Classifica_ordered = sorted(opt.Classifica.items(), key=lambda x: x[1], reverse=True)
        if nome not in opt.Answered[opt.page]:
            opt.Answered[opt.page].append(nome)
    return Response("ok")

async def getClassifica(request):
    global opt
    tillPosition = request.path_params["position"]
    opt.Classifica_ordered = sorted(opt.Classifica.items(), key=lambda x: x[1], reverse=True)
    result = {}
    for i in range(0,tillPosition):
        result[i+1] = opt.Classifica_ordered[i] if i in range(0,len(opt.Classifica_ordered)) else None
    return JSONResponse(result)

async def getAnswered(request):
    global opt
    if len(opt.allNames) == 0:
        return JSONResponse({"perc": -1, "page": opt.page, "error": "Ancora nessuno in lista", "lista":0})
    try:
        l = len(opt.Answered[opt.page])
        l_tot = len(opt.allNames) ## Tolgo l'animatore
        if l_tot != 0:
            return JSONResponse({"perc": l/l_tot*100, "page": opt.page, "error": "", "lista":len(opt.allNames)})
        else:
            return JSONResponse({"perc": -1, "page": opt.page, "error": "Ancora nessuno in lista","lista":0})
    except Exception as e:
        return JSONResponse({"perc":-1, "page":opt.page, "error": "Ancora nessuno ha risposto","lista":0})

async def anim(request):
    return templates.TemplateResponse("anim_key", {"request": request, "errore": """<div id="error_msg_anim"></div>"""})

async def onerror(request, exc):
    print("Errore")
    print(exc)
    print("Errore gestito: ",exc.detail)
    return RedirectResponse("/anim",status_code=301)

class MyWebSocket(WebSocketEndpoint):
    import typing
    websockets = []
    async def on_connect(self, websocket: WebSocket) -> None:
        global opt
        global websockets
        if websocket.path_params["cod"] == opt.codice:
            websockets.append({"cod": websocket.path_params["cod"], "name": websocket.path_params["name"], "ws": websocket})
        return await super().on_connect(websocket)
    
    async def on_disconnect(self, websocket: WebSocket, close_code: int) -> None:
        global opt
        global websockets
        for index in range(0, len(websockets)):
            ws = websockets[index]
            if ws["ws"] == websocket:
                websockets.pop(index)
                break
        return await super().on_disconnect(websocket, close_code)
    
    async def on_receive(self, websocket: WebSocket, data: typing.Any) -> None:
        global opt
        await websocket.send_text(json.dumps({"pagina": opt.page}))
        return await super().on_receive(websocket, data)
    
    async def notify_all(self, data):
        global opt
        global websockets
        for index in range(0, len(websockets)):
            ws = websockets[index]
            if ws["cod"] != opt.codice:
                websockets.pop(index)
                index = index - 1
            else:
                await ws["ws"].send_text(data)
    
#async def startWebSocket(ws: WebSocket):
#    print("PATH PARAMS: ", ws.path_params["cod"])
#    if ws.path_params["cod"] == opt.codice:
#        await ws.accept()
#        while True:
#            await ws.send_text("Ti leggo")
#    return Response("OK")

routes=[
    Route("/", welcome),
    Route("/game_{uuid:str}",mainRoute),
    Route("/getpage_{page:int}",gotoPage),
    Route("/page_{cod:int}", returnPage),
    Route("/setpage_{page:int}_{code:int}",setPage),
    Route("/setpath_{path:int}",setPath),
    Route("/getquiz",getquiz),
    Route("/updateQuest",updateQuest),
    Route("/verificacodice_{codice:int}", verificacodice),
    Route("/settacodice_{codice:int}", settacodice),
    Route("/getcodice", getcodice),
    Route("/inseriscinome_{nome:str}", addNome),
    Route("/animatore", getanimpage, methods=["POST"]),
    Route("/reset", reset),
    Route("/end",endGame),
    Route("/addPoints_{nome:str}_{pt:str}", addPoints),
    Route("/getClassifica_{position:int}", getClassifica),
    Route("/getAnswered", getAnswered),
    WebSocketRoute("/ws/{cod:int}_{name:str}", MyWebSocket),

    Route("/anim",anim),
    Mount('/static', app=StaticFiles(directory='static', packages=['bootstrap4']), name="static"),
]

app = Starlette(routes=routes, on_startup=[startup_task], middleware=middleware, exception_handlers={405: onerror})
