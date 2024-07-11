from flask import Flask
from flask_login import LoginManager
from flask_socketio import SocketIO, emit
from app.sockets import socketio_bp
from app.extensions import db, login_manager, socketio, session, engine
from app.routes import main
from config import Config


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = Config.SECRET_KEY
    app.config["SQLALCHEMY_DATABASE_URI"] = Config.SQLALCHEMY_DATABASE_URI
    db.init_app(app)
    login_manager.init_app(app)
    socketio.init_app(app)

    app.register_blueprint(main)
    app.register_blueprint(socketio_bp)

    with app.app_context():
        db.create_all()

    return app
