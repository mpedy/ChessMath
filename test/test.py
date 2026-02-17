import psycopg2
import time
from dotenv import dotenv_values

config = dotenv_values()

while True:
	try:
		start = time.time()
		conn = psycopg2.connect(f"host={config['db_host']} dbname={config['db_name']} user={config['db_user']} password={config['db_password']}")
		time.sleep(0.5)
		print(time.time()-start)
		exit()
	except Exception:
		time.sleep(0.100)