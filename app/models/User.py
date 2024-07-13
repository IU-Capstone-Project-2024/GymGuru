from flask_login import UserMixin

from werkzeug.security import generate_password_hash, check_password_hash
import enum
from app.extensions import db
from sqlalchemy import Enum, event


class UserTypeEnum(enum.Enum):
    coach = "coach"
    student = "student"

class ForwardBendEnum(enum.Enum):
    palms = "palms"
    fists = "fists"
    fingers = "fingers"


class User(db.Model, UserMixin):
    """User database model"""
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    surname = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    user_type = db.Column(db.Enum(UserTypeEnum), nullable=False, default=UserTypeEnum.student)
    email = db.Column(db.String(255), unique=True, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    fitness_test_result = db.relationship('FitnessTestResult', backref='user', lazy=True, uselist=False)
    exercise = db.relationship('Exercise', backref='user', lazy=True, uselist=False)

    def get_id(self):
        return self.user_id

    def set_password(self, password):
        """Sets hashed password given a password"""
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        """Checks whether password is correct using hash"""
        return check_password_hash(self.hashed_password, password)

    def to_json(self):
        return {
            'name': self.name,
            'push_up_counter': self.exercise.push_up_counter,
            'squat_counter': self.exercise.squat_counter,
            'curl_counter': self.exercise.curl_counter,
            'crunch_counter': self.exercise.crunch_counter,
            'lunge_counter': self.exercise.lunge_counter,
            'forward_bend_counter': 0,
            'lateral_raise_counter': self.exercise.lateral_raise_counter,
            'plank_counter': self.exercise.plank_counter,
            'v_up_crunch_counter': self.exercise.v_up_crunch_counter,
        }


class FitnessTestResult(db.Model):
    __tablename__ = 'fitness_test_results'
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    test_id = db.Column(db.String(255), primary_key=True)
    datetime = db.Column(db.DateTime, nullable=False)
    height = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    push_up_counter = db.Column(db.Integer, nullable=False)
    crunch_counter = db.Column(db.Integer, nullable=False)
    forward_bend = db.Column(db.Enum(ForwardBendEnum), nullable=False)


class Exercise(db.Model):
    """User database model"""
    __tablename__ = 'exercises'
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    push_up_counter = db.Column(db.Integer, default=0)
    squat_counter = db.Column(db.Integer, default=0)
    curl_counter = db.Column(db.Integer, default=0)
    crunch_counter = db.Column(db.Integer, default=0)
    lunge_counter = db.Column(db.Integer, default=0)
    v_up_crunch_counter = db.Column(db.Integer, default=0)
    lateral_raise_counter = db.Column(db.Integer, default=0)
    best_forward_bend = db.Column(db.Enum(ForwardBendEnum), nullable=False)
    plank_counter = db.Column(db.Integer, default=0)
