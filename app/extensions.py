from flask_login import LoginManager
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_message = ""
login_manager.blueprint_login_views = {
    'main': 'main.login',
}
socketio = SocketIO()
