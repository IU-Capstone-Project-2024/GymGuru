import os
from os import urandom


class Config:
    SECRET_KEY = urandom(32)
    #SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://nai1ka:123456@postgres:5432/gymguru"
