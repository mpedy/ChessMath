from starlette.applications import Starlette
from starlette.responses import JSONResponse, HTMLResponse, Response, PlainTextResponse, RedirectResponse, PlainTextResponse
from starlette.routing import Mount, Route
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates


import psycopg2
from Quiz import Quiz

from random import seed, random
from datetime import datetime
import hashlib

from starlette.middleware import Middleware
from starlette.middleware.base import BaseHTTPMiddleware
from loguru import logger




from starlette.datastructures import URL
from starlette.types import ASGIApp, Receive, Scope, Send







from starlette.authentication import (
    AuthenticationBackend, AuthenticationError, SimpleUser, UnauthenticatedUser,
    AuthCredentials, requires
)
from starlette.middleware.authentication import AuthenticationMiddleware
import base64
import binascii

page = 0

LISTEN = "pages/ascolta"

pages = [
    "pages/page0",
    "pages/page1",
    "pages/page2",
    "pages/page3",
    "pages/page4",
    "pages/page5",
    "pages/page6",
    "pages/page7",
    "pages/page8",
    "pages/page9",
    "pages/page10",
]

percorso = "path_1"

allpages = {
    "path_1": [
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
    ],
    "path_2": [
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
}


MyQuiz = []
Classifica = {}
Classifica_ordered = []
Answered = {}

templates = Jinja2Templates(directory="pages")

async def welcome(request):
    return HTMLResponse(open('pages/welcome',"r").read())

async def mainRoute(request):
    try:
        uuid = request.path_params["uuid"]
        if uuid == "Animatore":
            return templates.TemplateResponse('index.html', {"request":request, "nome": "Animatore", "codice": codice})
        return templates.TemplateResponse('index.html', {"request":request, "nome": UUID_NAME[uuid], "codice": codice})
    except Exception as e:
        print("Errore in mainRoute con request: ",str(request))
    return RedirectResponse("/")

async def gotoPage(request):
    global page
    page = request.path_params['page']
    try:
        return HTMLResponse(open(allpages[percorso][page]).read())
    except Exception as e:
        return HTMLResponse(f"""<div> Errore: {e} """)

async def returnPage(request):
    global page
    cod = int(request.path_params["cod"])
    if cod == codice:
        return JSONResponse({"page": page})
    else:
        return Redirect("/",status_code=401)

async def setPage(request):
    global page
    global Answered
    code = request.path_params['code']
    if code == 123111321:
        new_page = request.path_params['page']
        if new_page in range(0,len(allpages[percorso])):
            page = new_page
            print("Answered in setPage")
            print(Answered)
            Answered = {}
            Answered[page] = []
            print("Answered in setPage")
            print(Answered)
        arr = allpages[percorso]
        l = len(arr)
        res = [arr[page-1] if page-1 in range(0,l) else None, arr[page] if page in range(0,l) else None, arr[page+1] if page+1 in range(0,l) else None]
        return JSONResponse({"status":"ok","prev":res[0],"current":res[1],"next":res[2]})
    else:
        return Response("Errore: codice non valido");

async def updateQuest(request):
    global MyQuiz
    MyQuiz = []
    conn = psycopg2.connect("host=ec2-79-125-30-28.eu-west-1.compute.amazonaws.com dbname=dc2bgg77rj8mls user=wzhqirdlfueovm password=8b322163c254d39da687f9132ae38979552554fe6b82d43bc6307e5b797b2445")
    cursor = conn.cursor()
    cursor.execute("select quizid, tipo, json_agg(test) from chessmath."+percorso+" group by quizid, tipo order by quizid, tipo desc;")
    res = cursor.fetchall()
    for i in res:
        q = False
        nuovo = True
        for qu in MyQuiz:
            if qu.id == i[0]:
                q = qu
                nuovo = False
                break
        if q is False:
            q = Quiz()
            q.setId(i[0])
        q.set(i[1],i[2])
        if nuovo:
            MyQuiz.append(q)
    for qu in MyQuiz:
        print(qu,"\n")
    cursor.close()
    conn.close()
    return Response("ok")

async def setPath(request):
    global percorso
    percorso = "path_"+str(request.path_params['path'])
    page = 0
    conn = psycopg2.connect("host=ec2-79-125-30-28.eu-west-1.compute.amazonaws.com dbname=dc2bgg77rj8mls user=wzhqirdlfueovm password=8b322163c254d39da687f9132ae38979552554fe6b82d43bc6307e5b797b2445")
    cursor = conn.cursor()
    cursor.execute("select quizid, tipo, json_agg(test) from chessmath."+percorso+" group by quizid, tipo order by quizid, tipo desc;")
    res = cursor.fetchall()
    for i in res:
        q = False
        nuovo = True
        for qu in MyQuiz:
            if qu.id == i[0]:
                q = qu
                nuovo = False
                break
        if q is False:
            q = Quiz()
            q.setId(i[0])
        q.set(i[1],i[2])
        if nuovo:
            MyQuiz.append(q)
    for qu in MyQuiz:
        print(qu,"\n")
    cursor.close()
    conn.close()
    return Response("ok")

async def getquiz(request):
    global page
    global MyQuiz
    print(percorso, page)
    localpath = allpages[percorso][int(page)]
    print(localpath)
    try:
        quizid = int(localpath[localpath.index("quiz")+4:])
        print("QUIZID: ",quizid)
        return MyQuiz[quizid-1].json()
    except Exception as e:
        print("Errore in getquiz: ",page, MyQuiz)
        return Response("Errore")


async def startup_task():
    conn = psycopg2.connect("host=ec2-79-125-30-28.eu-west-1.compute.amazonaws.com dbname=dc2bgg77rj8mls user=wzhqirdlfueovm password=8b322163c254d39da687f9132ae38979552554fe6b82d43bc6307e5b797b2445")
    cursor = conn.cursor()
    cursor.execute("select quizid, tipo, json_agg(test) from chessmath."+percorso+" group by quizid, tipo order by quizid, tipo desc;")
    res = cursor.fetchall()
    for i in res:
        q = False
        nuovo = True
        for qu in MyQuiz:
            if qu.id == i[0]:
                q = qu
                nuovo = False
                break
        if q is False:
            q = Quiz()
            q.setId(i[0])
        q.set(i[1],i[2])
        if nuovo:
            MyQuiz.append(q)
    for qu in MyQuiz:
        print(qu,"\n")
    cursor.close()
    conn.close()

codice = int(random()*100000%990+1)

async def settacodice(request):
    global codice;
    print("Settando il codice: prima = ",codice)
    codice = request.path_params["codice"]
    print("Codice nuovo: ",codice)
    return Response("ok")

async def verificacodice(request):
    cod = request.path_params["codice"]
    print("Verificando il codice ",cod)
    if cod == codice:
        print("Il codice è valido")
        return Response("ok")
    else:
        print("Il codice non è valido")
        return Response("ko",status_code=401)


async def getanimpage(request):
    global codice;
    try:
        form = await request.form()
        if form["username"] == "anim" and form["password"] == "1324354321":
            seed(datetime.now())
            codice = int(random()*100000%990+1)
            return templates.TemplateResponse("anim", {"request": request, "codice": codice})
        else:
            return templates.TemplateResponse("anim_key", {"request": request, "errore": """<div id="error_msg_anim">Codice Errato!</div>"""})
    except Exception as e:
        return RedirectResponse("/anim")

async def getcodice(request):
    global codice
    return Response(str(codice))

allNames = []
UUID_NAME = {}

async def addNome(request):
    nome_toadd = request.path_params["nome"]
    k = 0
    nm = ""
    try:
        idx = allNames.index(nome_toadd)
        if idx >=0:
            k = 1
            while idx >=0:
                idx = allNames.index(nome_toadd+"-"+str(k))
                k+=1
    except Exception as e:
        nm = nome_toadd
        if k > 0:
            nm+="-"+str(k)
        allNames.append(nm)
    m = hashlib.sha512()
    m.update((str(codice)+nm).encode())
    uuid = m.hexdigest()
    UUID_NAME[uuid] = nm
    return Response(uuid)

async def reset(request):
    global UUID_NAME
    global allNames
    global Classifica
    global Classifica_ordered
    global Answered
    UUID_NAME = {}
    allNames = []
    Classifica = {}
    Classifica_ordered = []
    Answered = {}
    return Response("ok")

async def endGame(request):
    return HTMLResponse(open("pages/end").read())







class HTTPSRedirectMiddleware:
    def __init__(self, app: ASGIApp) -> None:
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] in ("http", "websocket") and scope["scheme"] in ("http", "ws"):
            url = URL(scope=scope)
            redirect_scheme = {"http": "https", "ws": "wss"}[url.scheme]
            netloc = url.hostname if url.port in (80, 443) else url.netloc
            url = url.replace(scheme=redirect_scheme, netloc=netloc)
            response = RedirectResponse(url, status_code=307)
            await response(scope, receive, send)
        else:
            await self.app(scope, receive, send)

class CustomHeaderMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        logger.debug(f"{request.method} {request.url}")
        logger.debug("Params:")
        for name, value in request.path_params.items():
            logger.debug(f"\t{name}: {value}")
        logger.debug("Headers:")
        for name, value in request.headers.items():
            logger.debug(f"\t{name}: {value}")
        response = await call_next(request)
        return response

#middleware = [Middleware(CustomHeaderMiddleware)]
middleware = [Middleware(HTTPSRedirectMiddleware)]
#middleware = []


async def addPoints(request):
    global Answered
    nome = request.path_params["nome"]
    punti = int(request.path_params["pt"])
    if nome != "Animatore":
        Classifica[nome] = punti
        Classifica_ordered = sorted(Classifica.items(), key=lambda x: x[1], reverse=True)
        print("Answered in addpoints")
        print(Answered)
        if nome not in Answered[page]:
            Answered[page].append(nome)
    return Response("ok")

async def getClassifica(request):
    tillPosition = request.path_params["position"]
    Classifica_ordered = sorted(Classifica.items(), key=lambda x: x[1], reverse=True)
    result = {}
    for i in range(0,tillPosition):
        result[i+1] = Classifica_ordered[i] if i in range(0,len(Classifica_ordered)) else None
    return JSONResponse(result)

async def getAnswered(request):
    print("Answered")
    print(Answered)
    print("allNames")
    print(allNames)
    if len(allNames) == 0:
        return JSONResponse({"perc": -1, "page": page, "error": "Ancora nessuno in lista", "lista":0})
    try:
        l = len(Answered[page])
        l_tot = len(allNames) ## Tolgo l'animatore
        print(l," - ", l_tot)
        if l_tot != 0:
            return JSONResponse({"perc": l/l_tot*100, "page": page, "error": "", "lista":len(allNames)})
        else:
            return JSONResponse({"perc": -1, "page": page, "error": "Ancora nessuno in lista","lista":0})
    except Exception as e:
        return JSONResponse({"perc":-1, "page":page, "error": "Ancora nessuno ha risposto","lista":0})





class BasicAuthBackend(AuthenticationBackend):
    async def authenticate(self, request):
        print("Siamo in BasicAuthBackend: ", type(request))
        if request.url.path == "/anim":
            form = await request.json()
            print("FORM: ",form)
            try:
                print(request.query_params, " -- ",request.path_params," -- ",request.client," -- ", request.form())
                user= request.query_params["username"]
                passw = request.query_params["password"]
                if user == "anim" and passw == "1324354321":
                    return AuthCredentials(["authenticated",user]), SimpleUser(user)
                else:
                    raise AuthenticationError('Invalid basic auth credentials')
            except Exception as e:
                print("Errore nella login su anim: ",e)
                raise AuthenticationError('Invalid basic auth credentials')
        if "Authorization" not in request.headers:
            return
        auth = request.headers["Authorization"]
        try:
            scheme, credentials = auth.split()
            if scheme.lower() != 'basic':
                return
            decoded = base64.b64decode(credentials).decode("ascii")
        except (ValueError, UnicodeDecodeError, binascii.Error) as exc:
            raise AuthenticationError('Invalid basic auth credentials')

        username, _, password = decoded.partition(":")
        # TODO: You'd want to verify the username and password here.
        print(f"user={username},password={password}. Decoded: {decoded}")
        return AuthCredentials(["authenticated",username]), SimpleUser(username)

async def anim(request):
    return templates.TemplateResponse("anim_key", {"request": request, "errore": """<div id="error_msg_anim"></div>"""})

    #return HTMLResponse(open("pages/anim_key").read())

#middleware = [
#    Middleware(AuthenticationMiddleware, backend=BasicAuthBackend())
#]

async def onerror(request, exc):
    print("Errore: ",exc.detail)
    return RedirectResponse("/anim",status_code=301)

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

    Route("/anim",anim),
    Mount('/static', app=StaticFiles(directory='static', packages=['bootstrap4']), name="static"),
]

app = Starlette(debug=True, routes=routes, on_startup=[startup_task], middleware=middleware, exception_handlers={405: onerror})