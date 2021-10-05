from subprocess import Popen, PIPE
import asyncio
import threading

class Forking():
    def __init__(self):
        self.loop = True
    @asyncio.coroutine
    def greet_every_two_seconds(self, index):
        global maximum, all_v
        while self.loop:
            proc = Popen(['python3', 'test.py'], stdout=PIPE, stderr=PIPE)
            stdout, stderr = proc.communicate()
            #stdout, stderr = yield self.procs[self.index].communicate()
            print(stdout)
            num = round(float(stdout.decode().strip()),4)
            all_v.append(num)
            if maximum < num:
                maximum = num
            print("index: ",index," - ",num,". ERR: ",str(stderr))
            yield from asyncio.sleep(2)
    def stop(self):
        self.loop = False
    def start(self):
        self.loop = True

f = Forking()
index = -1;
maximum = -1;
all_v = list()

def loop_in_thread(loop):
    global f
    global index
    index += 1
    asyncio.set_event_loop(loop)
    loop.run_until_complete(f.greet_every_two_seconds(index))

#loop = asyncio.get_event_loop()
#t = threading.Thread(target=loop_in_thread, args=(loop,))
#t.start()

def add(v: int):
    if v is not None:
        for i in range(0,v+1):
            loop = asyncio.new_event_loop()
            t1 = threading.Thread(target=loop_in_thread, args=(loop,))
            t1.start()