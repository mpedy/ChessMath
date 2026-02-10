import hug
import psycopg2
from dotenv import dotenv_values

config = dotenv_values()


def send_command(sql):
	conn = psycopg2.connect(f"host={config['db_host']} dbname={config['db_name']} user={config['db_user']} password={config['db_password']}")
	cursor = conn.cursor()
	cursor.execute(sql)
	res = cursor.fetchall()
	cursor.close()
	return res

@hug.get("/main", output=hug.output_format.html)
def main():
	return "<h3>Ciao</h3>"

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

