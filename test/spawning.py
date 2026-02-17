#from subprocess import Popen, PIPE
import asyncio

class Forking():
    def __init__(self):
        self.procs = []
        self.files = []
        self.index = -1
        self.stop = True
    def stop(self):
        self.stop = False
    async def working(self):
        self.index += 1
        self.files.append(None)
        while self.stop:
            self.procs.append(await asyncio.create_subprocess_shell('python3 test.py', stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE))
            stdout, stderr = await self.procs[self.index].communicate()
            self.files[self.index] = open(f"{self.index}.pipe","w")
            self.files[self.index].write(str(stdout))
            self.files[self.index].close()
            await asyncio.sleep(1)
            del self.procs[self.index]
def start():
    f = Forking()
    #asyncio.run(f.working())
    #asyncio.create_task(f.working())
    loop = asyncio.get_event_loop()
    tasks = list()
    tasks.append(loop.create_task(f.working()))
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()
