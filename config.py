import os
from os import urandom


class Config:
    SECRET_KEY = urandom(32)
    URL = 'postgres' if ("DOCKER" in os.environ) else '202.181.148.171'
    SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://nai1ka:123456@{URL}:5432/gymguru"
