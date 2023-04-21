import asyncio

async def greet_every_two_seconds():
    while True:
        print('Hello World')
        await asyncio.sleep(2)
#async def main():
    # run in main thread (Ctrl+C to cancel)
    #await greet_every_two_seconds()
    # run in background
loop = asyncio.new_event_loop()
loop.run_until_complete(loop.create_task(greet_every_two_seconds()))