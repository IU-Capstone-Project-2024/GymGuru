from os import urandom


class Config:
    SECRET_KEY = urandom(32)
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://postgres:sna@5.42.81.155:5432/gymguru"