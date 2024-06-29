import flask_login
from flask import Flask
from flask_login import LoginManager
from flask_socketio import SocketIO, emit
from config import Config

app = Flask(__name__)
app.config["SECRET_KEY"] = Config.SECRET_KEY
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"
login_manager.login_message = ""
socketio = SocketIO(app)

from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine

from routes import *

print(Config.DB_LOGIN, Config.DB_PASSWORD)
engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
connection = engine.connect()
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()

if __name__ == "__main__":
    socketio.run(app, "0.0.0.0", port=1234, debug=True, allow_unsafe_werkzeug=True)


@socketio.on('push_up')
def handle_message(counter):
    user_id = flask_login.current_user.get_id()
    from models.User import User
    user = session.query(User).get(user_id)
    session.query(User).filter(User.id == user_id).update(
        {User.curl_counter: user.curl_counter + counter})
    session.commit()
