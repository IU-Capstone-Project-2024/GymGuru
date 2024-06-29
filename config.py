import os
from os import urandom


class Config:
    SECRET_KEY = urandom(32)
    URL = 'postgres' if ("DOCKER" in os.environ) else '202.181.148.171'
    # TODO: REMOVE before deployment
    DB_USER = os.environ.get("DB_USER") if ("DOCKER" in os.environ) else 'nai1ka'
    DB_PASSWORD = os.environ.get("DB_PASSWORD") if ("DOCKER" in os.environ) else "123456"
    DB_NAME = "gymguru"
    SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{URL}:5432/{DB_NAME}"
