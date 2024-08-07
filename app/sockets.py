import flask_login
from flask import Blueprint

from app.extensions import socketio, db
from app.models.DbModels import ForwardBendEnum, Exercise, select_best

socketio_bp = Blueprint('socketio_bp', __name__)

user_result = dict()


def update_exercise(column: db.Column, counter):
    user_id = flask_login.current_user.get_id()
    exercise = db.session.query(Exercise).get(user_id)
    if exercise:
        # Get the current value of the specified column
        current_value = getattr(exercise, column.name)
        # Update the column with the new value
        db.session.query(Exercise).filter(Exercise.user_id == user_id).update(
            {column: current_value + counter})
        db.session.commit()


@socketio.on('push_up')
def handle_message(counter):
    update_exercise(Exercise.push_up_counter, counter)


@socketio.on('squat')
def handle_message(counter):
    update_exercise(Exercise.squat_counter, counter)


@socketio.on('curl')
def handle_message(counter):
    update_exercise(Exercise.curl_counter, counter)


@socketio.on('crunch')
def handle_message(counter):
    update_exercise(Exercise.crunch_counter, counter)


@socketio.on('lunge')
def handle_message(counter):
    update_exercise(Exercise.lunge_counter, counter)


@socketio.on('v_up_crunch')
def handle_message(counter):
    update_exercise(Exercise.v_up_crunch_counter, counter)


@socketio.on('lateral_raise')
def handle_message(counter):
    update_exercise(Exercise.lateral_raise_counter, counter)



@socketio.on('forward_bend')
def handle_message(value):
    user_id = flask_login.current_user.get_id()
    exercise: Exercise = db.session.query(Exercise).get(user_id)
    if exercise:
        # Get the current value of the specified column
        current_value: ForwardBendEnum = exercise.best_forward_bend

        current_value = select_best(current_value, ForwardBendEnum(value))

        # Update the column with the new value
        db.session.query(Exercise).filter(Exercise.user_id == user_id).update(
            {Exercise.best_forward_bend: current_value})
        db.session.commit()


@socketio.on('plank')
def handle_message(counter):

    update_exercise(Exercise.plank_counter, counter)


@socketio.on('step_3')
def handle_message(counter):
    user_id = flask_login.current_user.get_id()
    user_result[user_id].push_up = counter


@socketio.on('step_4')
def handle_message(counter):
    user_id = flask_login.current_user.get_id()
    user_result[user_id].crunches = counter


@socketio.on('step_2')
def handle_message(counter):

    user_id = flask_login.current_user.get_id()

    if counter == "fingers":
        user_result[user_id].forward_bend = ForwardBendEnum.fingers
    elif counter == "fists":
        user_result[user_id].forward_bend = ForwardBendEnum.fists
    elif counter == "palms":
        user_result[user_id].forward_bend = ForwardBendEnum.palms
    else:
        user_result[user_id].forward_bend = ForwardBendEnum.zero
