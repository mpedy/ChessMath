import hug
import psycopg2


def send_command(sql):
	conn = psycopg2.connect("host=ec2-79-125-30-28.eu-west-1.compute.amazonaws.com dbname=dc2bgg77rj8mls user=wzhqirdlfueovm password=8b322163c254d39da687f9132ae38979552554fe6b82d43bc6307e5b797b2445")
	cursor = conn.cursor()
	cursor.execute(sql)
	res = cursor.fetchall()
	cursor.close()
	return res

@hug.get("/main", output=hug.output_format.html)
def main():
	return "<h3>Ciao</h3>";

@hug.get("/ciao")
def ciao():
    return "ciao"

@hug.get("/ehila")
def ehila(txt):
	return "ehila"

@hug.get("/command")
def command(sql: str):
	print(f"SQL ricevuto: .{sql}.")
	#sql = ",".join(sql)
	print("ricevuto commando: ",sql, type(sql))
	return send_command(sql)

