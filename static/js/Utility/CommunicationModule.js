class CommunicationModule {
    constructor(app, nome, codice, url_ws, url_polling) {
        this.socket = null;
        this.nome = nome;
        this.codice = codice;
        this.url_ws = url_ws;
        this.url_polling = url_polling;
        this.ws_endpoint = url_ws || ("ws" + window.location.protocol.replace("http", "") + "//" + window.location.host + "/ws/" + this.codice + "_" + this.nome);
        this.polling_endpoint = url_polling || (window.location.protocol + "//" + window.location.host + "/polling/" + this.codice + "_" + this.nome);
        this.using_websocket = true;
        this.using_polling = false;
        this.app = app;
        this.history = {"path": null, "page": null};
    }
    start() {
        if (this.using_websocket) {
            try {
                this.socket = new WebSocket(this.ws_endpoint);
                this.socket.onopen = (event) => {
                    console.log("WebSocket connection opened: ", event);
                    this.socket.send("getpage")
                };
                this.socket.onmessage = (event) => {
                    console.log("WebSocket message received: ", event.data);
                    this.elaborateResponse(event.data);
                };

                this.socket.onclose = (event) => {
                    console.log("WebSocket connection closed: ", event);
                    this.socket = null;
                    this.using_polling = true;
                    this.using_websocket = false;
                    this.start();
                };

                this.socket.onerror = (error) => {
                    console.error("WebSocket error: ", error);
                    this.socket = null;
                    this.using_polling = true;
                    this.using_websocket = false;
                    this.start();
                };
                setTimeout( () => {
                    if(!this.socket || this.socket.readyState !== WebSocket.OPEN){
                        this.socket = null;
                        this.using_polling = true;
                        this.using_websocket = false;
                        this.start();
                    }
                }, 20000);
            } catch (err) {
                console.error("WebSocket initialization error: ", err);
                this.socket = null;
                this.using_polling = true;
                this.using_websocket = false;
                this.start();
            }
        } else if (this.using_polling) {
            this.pollingInterval = setInterval(() => {
                $.ajax({
                    url: this.polling_endpoint,
                    method: "GET",
                    async: true,
                    headers: {
                        "X-Requested-From": window.location.pathname.split("_")[1]
                    },
                    success: (data) => {
                        console.log("Polling response received: ", data);
                        this.elaborateResponse(data);
                    },
                    error: (err) => {
                        console.error("Polling error 1: ", err);
                        window.onbeforeunload = function () { };
                        window.location.href = "/";
                    }
                });
            }, 5000); // Poll every 5 seconds
            $.ajax({
                url: this.polling_endpoint,
                method: "GET",
                async: true,
                headers: {
                    "X-Requested-From": window.location.pathname.split("_")[1],
                    "X_Request": "getpage"
                },
                success: (data) => {
                    console.log("Polling response received: ", data);
                    this.elaborateResponse(data);
                },
                error: (err) => {
                    console.error("Polling error 2: ", err);
                    window.onbeforeunload = function () { };
                    window.location.href = "/";
                }
            });
        }
    }
    elaborateResponse(data) {
        try {
            data = typeof (data) === "object" ? data : JSON.parse(data);
            if (data.hasOwnProperty("pagina")) {
                page = data["pagina"]
                if (data.hasOwnProperty("path")) {
                    if(this.history.path != data["path"]){
                        this.history.path = data["path"];
                        this.history.page = null;
                        this.app.setPath(data["path"]);
                    }
                    
                }
                clearInterval(window.myt);
                $("#mydialog_opened").dialog("close").remove();
                //$("#content_page").html(result)
                if(this.history.page != page){
                    this.history.page = page;
                    this.app.currentGame.setPage.bind(this.app.currentGame)(parseInt(page))
                }
                /*$.ajax(
                    {
                        url: "getpage_" + page,
                        async: true,
                        success: (result) => {
                            clearInterval(window.myt);
                            $("#mydialog_opened").dialog("close").remove();
                            //$("#content_page").html(result)
                            this.app.currentGame.setPage.bind(this.app.currentGame)(parseInt(page))
                        },
                        error: (err) => {
                            window.localStorage.setItem("error", "Errore durante il caricamento della pagina: " + err);
                            window.location.href = "/";
                        }
                    })*/
            } else if (data.hasOwnProperty("path")) {
                if(this.history.path != data["path"]){
                    this.history.path = data["path"];
                    this.app.setPath(data["path"]);
                    this.history.page = null;
                }
            }
        } catch (err) {
            window.localStorage.setItem("error", "Errore durante l'elaborazione del messaggio WebSocket: " + err + ". Messaggio ricevuto: " + event.data);
            window.location.href = "/";
        }
    }
}

export { CommunicationModule };