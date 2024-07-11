import flask_login
from flask import Blueprint
from flask_socketio import emit
from app.extensions import socketio, db
from app.models import User

socketio_bp = Blueprint('socketio_bp', __name__)

user_result = dict()


@socketio.on('push_up')
def handle_message(counter):
    user_id = flask_login.current_user.get_id()
    from app.models.User import User
    user = db.session.query(User).get(user_id)
    db.session.query(User).filter(User.id == user_id).update(
        {User.curl_counter: user.curl_counter + counter})
    db.session.commit()


@socketio.on('step_2')
def handle_message(counter):
    user_id = flask_login.current_user.get_id()
    user_result[user_id].push_up = counter


@socketio.on('step_3')
def handle_message(counter):
    user_id = flask_login.current_user.get_id()
    user_result[user_id].crunches = counter


@socketio.on('step_4')
def handle_message(counter):
    user_id = flask_login.current_user.get_id()
    user_result[user_id].forward_bend = counter
