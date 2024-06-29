import os
from os import urandom


class Config:
    SECRET_KEY = urandom(32)
    URL = 'postgres' if ("DOCKER" in os.environ) else '202.181.148.171'
    # TODO: REMOVE before deployment
    DB_LOGIN = os.environ.get("DB_LOGIN") if ("DOCKER" in os.environ) else 'nai1ka'
    DB_PASSWORD = os.environ.get("DB_PASSWORD") if ("DOCKER" in os.environ) else "123456"

    print(DB_LOGIN, DB_PASSWORD)
    DB_NAME = "gymguru"
    SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{DB_LOGIN}:{DB_PASSWORD}@{URL}:5432/{DB_NAME}"
