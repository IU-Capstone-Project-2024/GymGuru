from flask import Flask, render_template
from flask_login import LoginManager
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = "123"
socketio = SocketIO(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"
login_manager.login_message = ""

from routes import *





if __name__ == "__main__":
    app.run("0.0.0.0", port=1234, debug=True)

@socketio.on("connect")
def test_connect():
    print("Socket successfully connected")
    emit("my response", {"data": "Connected"})
