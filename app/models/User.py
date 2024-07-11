from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import enum
from app.extensions import db


class UserTypeEnum(enum.Enum):
    coach = "coach"
    student = "student"


class User(db.Model, UserMixin):
    """User database model"""
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    surname = db.Column(db.String(80), nullable=False)
    user_type = db.Column(db.Enum(UserTypeEnum), nullable=False, default=UserTypeEnum.student)
    email = db.Column(db.String(), unique=True, nullable=False)
    hashed_password = db.Column(db.String(500), nullable=False)

    push_up_counter = db.Column(db.Integer, default=0)
    squat_counter = db.Column(db.Integer, default=0)
    curl_counter = db.Column(db.Integer, default=0)

    crunch_counter = db.Column(db.Integer, default=0)
    lunge_counter = db.Column(db.Integer, default=0)
    v_up_crunch_counter = db.Column(db.Integer, default=0)

    lateral_raise_counter = db.Column(db.Integer, default=0)
    forward_bend_counter = db.Column(db.Integer, default=0)
    plank_counter = db.Column(db.Integer, default=0)

    # TODO: remove bench press
    bench_press_counter = db.Column(db.Integer, default=0)





    def set_password(self, password):
        """Sets hashed password given a password"""
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        """Checks whether password is correct using hash"""
        return check_password_hash(self.hashed_password, password)

    def to_json(self):
        return {
            'name': self.name,
            'push_up_counter': self.push_up_counter,
            'squat_counter': self.squat_counter,
            'curl_counter': self.curl_counter,
            'crunch_counter': self.crunch_counter,
            'lunge_counter': self.lunge_counter,
            'forward_bend_counter': self.forward_bend_counter,
            'lateral_raise_counter': self.lateral_raise_counter,
            'plank_counter': self.plank_counter,
            'v_up_crunch_counter': self.v_up_crunch_counter,
        }
