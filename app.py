from flask import Flask
from flask_login import LoginManager

from config import Config

app = Flask(__name__)
app.config["SECRET_KEY"] = Config.SECRET_KEY
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"
login_manager.login_message = ""

from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine

from routes import *

engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
connection = engine.connect()
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()

if __name__ == "__main__":
    app.run("0.0.0.0", port=1234, debug=True)