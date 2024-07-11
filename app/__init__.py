from flask import Flask
from flask_login import LoginManager
from flask_socketio import SocketIO, emit
from app.sockets import socketio_bp
from app.extensions import db, login_manager, socketio
from app.routes import main
from config import Config, DevelopmentConfig


def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    login_manager.init_app(app)
    socketio.init_app(app)

    app.register_blueprint(main)
    app.register_blueprint(socketio_bp)

    with app.app_context():
        db.create_all()

    return app
