from starlette.applications import Starlette
from starlette.responses import JSONResponse, HTMLResponse, Response
from starlette.routing import Mount, Route
from starlette.staticfiles import StaticFiles

import psycopg2
from Quiz import Quiz

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
        "pages/ascolta_torre",
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
        LISTEN,
        "pages/elem/quiz10",
        "pages/elem/quiz11",
        "pages/elem/quiz12",
        "pages/elem/quiz13",
        LISTEN,
        "pages/elem/gioco8",
        "pages/elem/gioco9",
        LISTEN,
        "pages/elem/quiz14",
        "pages/elem/gioco10",
        "pages/elem/img_gioco10",
        "pages/elem/gioco11",
        "pages/elem/img_gioco11",
        "pages/elem/quiz15",
        LISTEN,
        "pages/elem/quiz16",
        "pages/endpage"
    ],
    "path_2": [
        LISTEN,
        "pages/med/quiz1",
        LISTEN,
        "pages/med/quiz2",
        "pages/ascolta_torre",
        "pages/med/gioco1",
        "pages/med/img_gioco1",
        "pages/med/quiz3",
        "pages/med/quiz4",
        "pages/med/quiz5",
        "pages/med/quiz6",
        "pages/med/img_1",
        "pages/med/gioco2", ##da sistemare tutte le dialog (popup, sia quiz sia giochi)
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
        "pages/med/quiz11",
        "pages/med/gioco11b",
        "pages/med/img_gioco11b",
        "pages/ascolta_cavallo",# CAVALLO
        "pages/med/img_cavallo",
        "pages/med/gioco_spirit",
        "pages/med/img_spirit",
        "pages/med/quiz12",
        "pages/med/gioco12b",
        "pages/med/gioco13b",
        LISTEN,
        "pages/med/quiz13",
        "pages/med/quiz14",
        LISTEN,
        "pages/med/quiz16",
        "pages/endpage"
    ]
}


MyQuiz = []

async def welcome(request):
    return HTMLResponse(open('pages/welcome',"r").read())

async def mainRoute(request):
    return HTMLResponse(open('index.html',"r").read())

async def destra(request):
    return HTMLResponse("""<div class="b">Gioco 2</div><div>E questo?</div><img src="static/second-image.jpg" style="height: 100%"/>""")

async def sinistra(request):
    return HTMLResponse("""<div class="b">Gioco 1</div><div>Indovinate chi è questo signore</div><img src="static/main-image.jpg" style="height: 100%"/>""")

async def gotoPage(request):
    global page
    page = request.path_params['page']
    print("PAGINA: ",page)
    try:
        #return HTMLResponse(open(pages[page]).read())
        return HTMLResponse(open(allpages[percorso][page]).read())
    except Exception as e:
        return HTMLResponse(f"""<div> Errore: {e} """)

async def returnPage(request):
    global page
    return JSONResponse({"page": page})

async def setPage(request):
    global page
    code = request.path_params['code']
    if code == 123111321:
        new_page = request.path_params['page']
        if new_page in range(0,len(allpages[percorso])):
            page = new_page
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


routes=[
    Route("/", welcome),
    Route("/game",mainRoute),
    Route("/right",destra),
    Route("/left",sinistra),
    Route("/page_{page:int}",gotoPage),
    Route("/page", returnPage),
    Route("/setpage_{page:int}_{code:int}",setPage),
    Route("/setpath_{path:int}",setPath),
    Route("/getquiz",getquiz),
    Route("/updateQuest",updateQuest),
    Mount('/static', app=StaticFiles(directory='static', packages=['bootstrap4']), name="static"),
]

app = Starlette(debug=True, routes=routes, on_startup=[startup_task])