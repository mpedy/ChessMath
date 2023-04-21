import time
from locust import HttpUser, task


class Test(HttpUser):
    k = 0
    def on_start(self):
        self.client.get(f"/ws/853_ciao{self.k}")
        self.k = self.k+1
    
    @task
    def hello(self):
        self.client.get(f"/ws/853_ehila{self.k}")
        self.k = self.k+1
