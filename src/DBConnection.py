import psycopg2
import dotenv
import os

class DBConnection:
    __dbhost = ""
    __dbuser = ""
    __dbpsw = ""
    __dbname = ""
    conn = None
    cursor = None
    def __init__(self):
        dotenv.load_dotenv()
        self.__dbhost = os.getenv("DBHOST") #"ec2-79-125-30-28.eu-west-1.compute.amazonaws.com dbname=dc2bgg77rj8mls"
        self.__dbuser = os.getenv("DBUSER") #"wzhqirdlfueovm"
        self.__dbpsw = os.getenv("DBPASS") #"8b322163c254d39da687f9132ae38979552554fe6b82d43bc6307e5b797b2445"
        self.__dbname = os.getenv("DBNAME") #"dc2bgg77rj8mls"
    def openConnection(self):
        try:
            self.conn = psycopg2.connect(f"host={self.getHost()} dbname={self.getDbname()} user={self.getUser()} password={self.getPsw()}")
        except Exception as e:
            self.conn = None
            print("Errore in connessione: "+str(e))
    def openCursor(self):
        if self.conn is not None:
            self.cursor = self.conn.cursor()
    def openConnectionAndCursor(self):
        self.openConnection()
        self.openCursor()
    def closeConnection(self):
        self.conn.close()
    def closeCursor(self):
        self.cursor.close()
    def closeConnectionAndCursor(self):
        self.cursor.close()
        self.conn.close()
    def executeAndFetchall(self, query):
        if self.cursor is not None:
            try:
                self.cursor.execute(query)
                return self.cursor.fetchall()
            except Exception as e:
                print("Errore in DBConnection in executeAndFetchall: "+str(e))
    def getConnection(self):
        return self.conn
    def getCursor(self):
        return self.cursor
    def getHost(self):
        return self.__dbhost
    def getUser(self):
        return self.__dbuser
    def getPsw(self):
        return self.__dbpsw
    def getDbname(self):
        return self.__dbname