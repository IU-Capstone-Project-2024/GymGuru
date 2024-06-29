from flask_login import UserMixin
from sqlalchemy import Column, Integer, String
from werkzeug.security import generate_password_hash, check_password_hash

from app import Base

class User(Base, UserMixin):
    """User database model"""
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    email = Column(String(), unique=True, nullable=False)
    hashed_password = Column(String(500), nullable=False)
    bench_press_counter = Column(Integer, default=0)
    curl_counter = Column(Integer, default=0)
    forward_bend_counter = Column(Integer, default=0)
    lateral_raise_counter = Column(Integer, default=0)
    lunge_counter = Column(Integer, default=0)
    plank_counter = Column(Integer, default=0)
    push_up_counter = Column(Integer, default=0)
    squat_counter = Column(Integer, default=0)
    v_up_crunch_counter = Column(Integer, default=0)

    def set_password(self, password):
        """Sets hashed password given a password"""
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        """Checks whether password is correct using hash"""
        return check_password_hash(self.hashed_password, password)
