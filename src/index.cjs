// link: https://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http
const { createServer } = require("node:http");
const { WebSocketServer } = require("ws");
const _url = require("url");
const qs = require('querystring');
const fs = require('fs');
const path = require("path")
const { randomUUID } = require("node:crypto");
const ejs = require("ejs");
const { GameOptions } = require("./GameOptions.cjs");
const { Player } = require("./Player.cjs");
const { serveStatic } = require("./serve-static.cjs");
const { allpages } = require("./path.cjs");

var gameOptions = new GameOptions();

const hostname = "0.0.0.0";
const port = 8000;

const server = createServer()
server.on("request", (request, response) => {
    const { headers, method, url } = request;
    const { query, pathname } = _url.parse(url, true);
    if (url.indexOf("/static") >= 0) {
        serveStatic(request, response);
        return;
    }
    if (method === "POST") {
        let body = []
        request.on("error", error => {
            console.log("Some errors occurred: ", error);
        })
        request.on("data", chunk => {
            body.push(chunk);
        });
        request.on("end", () => {
            body = Buffer.concat(body).toString();
            body = qs.parse(body);
            if (pathname === "/animatore") {
                if (body["username"] == "anim" && body["password"] == "1324354321") {
                    gameOptions.createCod();
                    fs.readFile("pages/anim_node", function (err, data) {
                        response.setHeader('Content-type', "text/html; charset=utf8");
                        data = ejs.render(data.toString(), { "codice": gameOptions.codice }, { views: [__dirname] });
                        response.end(data);
                        return;
                    })
                }
                else {
                    fs.readFile("pages/anim_key", function (err, data) {
                        response.setHeader('Content-type', "text/html; charset=utf8");
                        data = data.toString().replace(/{{ errore|safe }}/g, "<%errore%>")
                        data = ejs.render(data.toString(), { "errore": `<div id="error_msg_anim"></div>` }, { views: [__dirname] });
                        response.end(data);
                        return;
                    })
                }
            } else {
                console.error(`Pathname in POST non gestito: ${pathname}`)
                response.statusCode = 400
                response.end("ko");
                return;
            }
        });
        return;
    } else {
        if (pathname === "/") {
            fs.readFile("pages/welcome", function (err, data) {
                if (err) {
                    response.statusCode = 500;
                    response.end(`Error getting the file: ${err}.`);
                } else {
                    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                    const ext = path.parse(pathname).ext;
                    // if the file is found, set Content-type and send data
                    response.setHeader('Content-type', "text/html; charset=utf8");
                    response.end(data);
                }
            });
            return;
        } else if (pathname === "/anim") {
            fs.readFile("pages/anim_key", function (err, data) {
                if (err) {
                    response.statusCode = 500;
                    response.end(`Error getting the file: ${err}.`);
                } else {
                    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                    const ext = path.parse(pathname).ext;
                    // if the file is found, set Content-type and send data
                    response.setHeader('Content-type', "text/html; charset=utf8");
                    data = data.toString().replace(/{{ errore\|safe }}/g, "<%errore%>")
                    data = ejs.render(data.toString(), { "errore": `<div id="error_msg_anim"></div>` }, { views: [__dirname] });
                    response.end(data);
                }
            })
            return;
        } else if (pathname.indexOf("/verificacodice_") === 0) {
            var correct = parseInt(pathname.substring("/verificacodice_".length)) == gameOptions.codice;
            if (correct) {
                response.end("ok");
            } else {
                response.statusCode = 401;
                response.end("ko");
            }
            return;
        } else if (pathname.indexOf("/inseriscinome_") === 0) {
            var nome = pathname.substring("/inseriscinome_".length);
            var playersWithSameName = gameOptions.players.filter((p) => p.nome === nome);
            if (playersWithSameName.length > 0) {
                nome = nome + "-" + playersWithSameName.length;
            }
            var newplayer = new Player(nome)
            websockets.get(gameOptions.codice + "_Animatore-console").ws.send(JSON.stringify({ "perc": 0, "error": "", "lista": (websockets.list.length - 2 + 1) }))//il +1 serve per aggiungere il nuovo giocatore che non ha ancora instaurato la connessione alla websocket; il -2 per rimuovere Animatore e Animatore-console
            newplayer.uuid = randomUUID()
            gameOptions.players.push(newplayer)
            response.end(newplayer.uuid)
            return;
        } else if (pathname.indexOf("/game_") == 0) {
            try {
                var uuid = pathname.substring("/game_".length)
                fs.readFile("pages/index.html", function (err, data) {
                    if (err) {
                        response.statusCode = 500;
                        response.end(`Error getting the file: ${err}.`);
                    } else {
                        response.setHeader('Content-type', "text/html; charset=utf8");
                        data = data.toString().replaceAll(/{{\s*codice\s*}}/g, "<%=codice%>").replaceAll(/{{\s*nome\s*}}/g, "<%=nome%>")
                        if (uuid === "Animatore") {
                            data = ejs.render(data.toString(), { "nome": "Animatore", "codice": gameOptions.codice }, { views: [__dirname] });
                        } else {
                            data = ejs.render(data.toString(), { "nome": gameOptions.players.filter((p) => p.uuid === uuid)[0].nome, "codice": gameOptions.codice }, { views: [__dirname] });
                        }
                        response.end(data);
                    }
                })
            } catch (exception) {
                console.error("Errore in mainRoute con request: ", request)
                response.statusCode = 301
                response.setHeader("Location", "/")
                response.end()
            }
            return;
        } else if (pathname.indexOf("/getpage_") == 0) {
            gameOptions.page = parseInt(pathname.substring("/getpage_".length));
            try {
                fs.readFile(allpages[gameOptions.percorso][gameOptions.page], function (err, data) {
                    if (err) {
                        response.statusCode = 500;
                        response.end(`Error getting the file: ${err}.`);
                    } else {
                        response.statusCode = 200
                        response.setHeader("X-PATH", gameOptions.percorso)
                        response.setHeader("X-PAGENAME", allpages[gameOptions.percorso][gameOptions.page])
                        response.end(data)
                    }
                })
                return;
            } catch (exception) {
                response.end(`<div> Errore: ${exception}</div>`)
            }
            return;
        } else if (pathname.indexOf("/setpage_") == 0) {
            var params = pathname.split("_")
            var page = parseInt(params[1])
            var code = parseInt(params[2])
            if (code == gameOptions.setPageCode) {
                if (page < allpages[gameOptions.percorso].length) {
                    gameOptions.page = page
                    gameOptions.Answered = {}
                    gameOptions.Answered[gameOptions.page] = []
                }
                notifyAllWS().then(res => {
                    response.setHeader("Content-Type", "application/json");
                    response.end(`{ "status": "ok", "prev": "todo", "next": "todo" }`)
                    return;
                })
            } else {
                response.end("Errore: codice non valido")
                return;
            }
        } else if (pathname.indexOf("/setpath_") == 0) {
            gameOptions.percorso = "path_" + pathname.substring("/setpath_".length);
            gameOptions.page = 0
            gameOptions.update().then(res => {
                let pages = []
                for (let i = 0; i < allpages[gameOptions.percorso].length; i++) {
                    pages.push(allpages[gameOptions.percorso][i])
                }
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(pages))
                response.end()
            })
            return;
        } else if (pathname === "/getquiz") {
            let localpath = allpages[gameOptions.percorso][gameOptions.page]
            try {
                let quizid = parseInt(localpath.substring(localpath.indexOf("quiz") + 4))
                response.setHeader("Content-Type", "application/json")
                response.end(JSON.stringify(gameOptions.MyQuiz[quizid - 1].json()))
            }
            catch (exception) {
                console.error("Errore in getquiz: ", gameOptions.page, gameOptions.MyQuiz, ": " + exception)
                response.end("Errore")
            }
            return;
        } else if (pathname === "/updateQuest") {
            gameOptions.MyQuiz = []
            gameOptions.update().then(res => {
                console.log(res)
                response.end("ok")
            })
            return;
        } else if (pathname.indexOf("/verificacodice_") == 0) {
            let cod = parseInt(pathname.substring("/verificacodice_".length))
            if (cod == gameOptions.codice) {
                response.end("ok")
            } else {
                response.statusCode = 401
                response.end("ko")
            }
            return
        } else if (pathname.indexOf("/settacodice_") == 0) {
            gameOptions.codice = parseInt(pathname.substring("/settacodice_".length))
            response.end("ok")
            return
        } else if (pathname === "/getcodice") {
            response.end(gameOptions.codice.toString())
            return
        } else if (pathname === "/reset") {
            gameOptions.reset()
            closeAllWebSockets().then(res => {
                response.end("ok")
            })
            return;
        } else if (pathname === "/end") {
            fs.readFile("pages/end", function (err, data) {
                if (err) {
                    response.statusCode = 500;
                    response.end(`Error getting the file: ${err}.`);
                } else {
                    response.statusCode = 200
                    response.setHeader('Content-type', "text/html; charset=utf8");
                    response.end(data)
                }
            });
            return;
        } else if (pathname.indexOf("/addPoints_") == 0) {
            let params = pathname.split("_");
            let nome = params[1]
            let punti = parseInt(params[2])
            if (nome != "Animatore") {
                gameOptions.players.filter((p) => p.nome == nome)[0].punti = punti
                //opt.Classifica_ordered = sorted(opt.Classifica.items(), key=lambda x: x[1], reverse=True)
                if (gameOptions.Answered[gameOptions.page].indexOf(nome) < 0) {
                    gameOptions.Answered[gameOptions.page].push(nome)
                    for (let ws of websockets.list) {
                        if (ws["codice"] == gameOptions.codice && ws["name"] == "Animatore-console") {
                            if (websockets.list.length - 2 == 0) {
                                ws["ws"].send(JSON.stringify({ "perc": -1, "page": gameOptions.page, "error": "Ancora nessuno in lista", "lista": 0 }))
                            }
                            try {
                                let l = gameOptions.Answered[gameOptions.page].length
                                let l_tot = websockets.list.length - 2;
                                if (l_tot != 0) {
                                    ws["ws"].send(JSON.stringify({ "perc": l / l_tot * 100, "page": gameOptions.page, "error": "", "lista": l_tot }))
                                } else {
                                    ws["ws"].send(JSON.stringify({ "perc": -1, "page": gameOptions.page, "error": "Ancora nessuno in lista", "lista": 0 }))
                                }
                            } catch (exception) {
                                ws["ws"].send(JSON.stringify({ "perc": -1, "page": opt.page, "error": "Ancora nessuno ha risposto", "lista": 0 }))
                            }
                            break;
                        }
                    }
                }
            }
            response.end("ok");
            return;
        } else if (pathname.indexOf("/getClassifica_") == 0) {
            let tillPosition = parseInt(pathname.substring("/getClassifica_".length))
            let classifica = gameOptions.players.sort((a, b) => b.punti - a.punti)
            var result = {}
            for (let i = 0; i < tillPosition; i++) {
                result[i + 1] = i < classifica.length ? [classifica[i].nome, classifica[i].punti] : null
            }
            response.statusCode = 200
            response.setHeader("Content-Type", "application/json")
            response.end(JSON.stringify(result))
            return;
        } else {
            console.error(`Pathname in POST non gestito: ${pathname}`)
            response.statusCode = 400
            response.end("ko");
            return;
        }
    }
});

async function closeAllWebSockets() {
    return new Promise(async (resolve, reject) => {
        while (websockets.list.length > 0) {
            let ws = websockets.list.shift()
            ws.ws.close()
        }
        resolve(websockets.list.length);
    })
}

async function notifyAllWS() {
    return new Promise((resolve, reject) => {
        for (let ws of websockets.list) {
            if (ws.codice == gameOptions.codice) {
                if (ws.name !== "Animatore-console") {
                    ws.ws.send(JSON.stringify({ "pagina": gameOptions.page }))
                } else {
                    ws.ws.send(JSON.stringify({ "perc": 0, "page": gameOptions.page, "error": "", "lista": (websockets.list.length - 2) }))
                }
            }
        }
        resolve()
    })
}

const ws = new WebSocketServer({ server });
class MyWebSocket {
    constructor(ws, token) {
        this.token = token
        this.ws = ws
        this.codice = token.split("_")[0]
        this.name = token.split("_")[1]
    }
}
class MyWebSocketList {
    constructor() {
        this.list = []
    }
    add(mWebSocket) {
        this.list.push(mWebSocket)
    }
    get(token) {
        for (var i of this.list) {
            if (i.token === token) {
                return i
            }
        }
    }
    remove(token) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].token === token) {
                this.list.splice(i, 1);
                return
            }
        }
    }
}
var websockets = new MyWebSocketList()
ws.on("connection", async (webs, req) => {
    const pathname = _url.parse(req.url, true).pathname
    const token = pathname.substring("/ws/".length);
    webs.on("message", message => {
        message = Buffer.from(message, "utf-8").toString()
        if (message == "get_answered") {
            if (gameOptions.players.length == 0) {
                webs.send(JSON.stringify({ "perc": -1, "page": gameOptions.page, "error": "Ancora nessuno in lista", "lista": 0 }))
            }
            try {
                let l = gameOptions.Answered[gameOptions.page].length
                let l_tot = websockets.list.length - 2 // Tolgo l'animatore, una websocket per l'iframe e un'altra per la console
                if (l_tot != 0) {
                    webs.send(JSON.stringify({ "perc": l / l_tot * 100, "page": gameOptions.page, "error": "", "lista": l_tot }))
                } else {
                    websocket.send(JSON.stringify({ "perc": -1, "page": gameOptions.page, "error": "Ancora nessuno in lista", "lista": 0 }))
                }
            } catch (exception) {
                websocket.send(JSON.stringify({ "perc": -1, "page": gameOptions.page, "error": "Ancora nessuno ha risposto", "lista": 0 }))
            }
        }
        webs.send(JSON.stringify({ "pagina": gameOptions.page }))
        /*for (var w of websockets.list) {
            w.ws.send(`Messaggio di ${webs}: `)
            w.ws.send(message)
        }*/
    });
    webs.on("error", console.log);
    webs.on('close', () => {
        console.info(`token ${token} has disconnected`);
        websockets.remove(token)
    });
    //webs.send("Benvenuto");
    /*for (var w of websockets.list) {
        w.ws.send("Aggiunto un nuovo componente");
    }*/
    const myWebSocket = new MyWebSocket(webs, token)
    websockets.add(myWebSocket);
    if (pathname.split("_")[1] != "Animatore-console") {
        for (let ws of websockets.list) {
            if (ws.token.indexOf(gameOptions.codice) == 0 && ws.name == "Animatore-console") {
                await ws.ws.send(JSON.stringify({ "perc": 0, "error": "", "lista": (websockets.list.filter((ws) => ws.token.indexOf("Animatore") < 0).length) }))
            }
        }
    }

})


server.listen(port, hostname);
console.log(`In ascolto su ${hostname}:${port}`)