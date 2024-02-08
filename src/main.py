import json
from starlette.applications import Starlette
from starlette.responses import JSONResponse, HTMLResponse, Response, RedirectResponse
from starlette.routing import Mount, Route, WebSocketRoute
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from starlette.middleware import Middleware
from starlette.endpoints import HTTPEndpoint, WebSocketEndpoint
from starlette.websockets import WebSocket
import threading


# per esportare da DB:
# select array_to_json(array_agg(t)) from (select quizid,tipo,json_agg(test) as "value" from chessmath.path_2 p group by quizid, tipo order by quizid, tipo desc) t; 


from random import seed, random
from datetime import datetime


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


from .paths import allpages
from .GameOptions import GameOptions

opt = GameOptions()
websockets = []
lock = threading.Lock()

templates = Jinja2Templates(directory="pages")

async def welcome(request):
    return HTMLResponse(open('pages/welcome',"r",encoding="utf-8").read())

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
        return HTMLResponse(open(allpages[opt.percorso][opt.page], encoding="utf-8").read())
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
    with open(f"Domande/{path}","r", encoding="utf-8") as f:
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
    return HTMLResponse(open("pages/end","r",encoding="utf-8").read())

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
