#import time
from locust import HttpUser, task
import random
from websockets.sync.client import connect
from dotenv import dotenv_values

config = dotenv_values()

letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

class Test(HttpUser):
    k = 0
    def getRandomNames(self, k=3):
        return ''.join(random.choices(letters, k=k))
    #def on_start(self):
    #    self.client.get(f"/ws/853_ciao{self.k}")
    #    self.k = self.k+1

    #@task
    #def hello(self):
    #    self.client.get(f"/ws/853_ehila_da_hello{self.k}")
    #    self.k = self.k+1
    
    @task
    def login(self):
        codice = 883
        req = self.client.get(f"/verificacodice_{codice}", headers={"MyClientID" : str(self.k)})
        if req.status_code == 200:
            name = self.getRandomNames(k=10)
            self.client.get(f"/inseriscinome_{name}", headers={"MyClientID" : str(self.k)})
            with connect(f"{config['ip3']}{codice}_{name}") as ws:
                ws.send("ciao a tutti")
                message = ws.recv()
                print("Ricevuto: ",message)
        self.k = self.k+1
