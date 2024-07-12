import flask_login
from flask import Blueprint
from flask_socketio import emit
from app.extensions import socketio, db
from app.models import User
from app.models.User import ForwardBendEnum, Exercise

socketio_bp = Blueprint('socketio_bp', __name__)

user_result = dict()


@socketio.on('push_up')
def handle_message(counter):
    user_id = flask_login.current_user.get_id()
    exercise = db.session.query(Exercise).get(user_id)
    db.session.query(Exercise).filter(Exercise.user_id == user_id).update(
        {Exercise.push_up_counter: exercise.push_up_counter + counter})
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
    if counter == 1:
        user_result[user_id].forward_bend = ForwardBendEnum.fingers
    elif counter == 2:
        user_result[user_id].forward_bend = ForwardBendEnum.fists
    elif counter == 3:
        user_result[user_id].forward_bend = ForwardBendEnum.palms
