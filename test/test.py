import psycopg2
import time

while True:
	try:
		start = time.time()
		conn = psycopg2.connect("host=ec2-79-125-30-28.eu-west-1.compute.amazonaws.com dbname=dc2bgg77rj8mls user=wzhqirdlfueovm password=8b322163c254d39da687f9132ae38979552554fe6b82d43bc6307e5b797b2445")
		time.sleep(0.5)
		print(time.time()-start)
		exit()
	except Exception as e:
		time.sleep(0.100)