from starlette.applications import Starlette
from starlette.responses import JSONResponse, HTMLResponse, Response
from starlette.routing import Mount, Route
from starlette.staticfiles import StaticFiles

page = 0

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

async def prova(request):
    return HTMLResponse(open('index.html',"r").read())

async def destra(request):
    return HTMLResponse("""<div class="b">Gioco 2</div><div>E questo?</div><img src="static/second-image.jpg" style="height: 100%"/>""")

async def sinistra(request):
    return HTMLResponse("""<div class="b">Gioco 1</div><div>Indovinate chi è questo signore</div><img src="static/main-image.jpg" style="height: 100%"/>""")

async def gotoPage(request):
    global page
    page = request.path_params['page']
    try:
        return HTMLResponse(open(pages[page]).read())
    except Exception as e:
        return HTMLResponse(f"""<div> Errore: {e} """)

async def returnPage(request):
    global page
    return JSONResponse({"page": page})

async def setPage(request):
    global page
    page = request.path_params['page']
    return Response("ok")


routes=[
    Route("/", prova),
    Route("/right",destra),
    Route("/left",sinistra),
    Route("/page_{page:int}",gotoPage),
    Route("/page", returnPage),
    Route("/setpage_{page:int}",setPage),
    Mount('/static', app=StaticFiles(directory='static', packages=['bootstrap4']), name="static"),
]

app = Starlette(debug=True, routes=routes)