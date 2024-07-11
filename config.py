import os
from os import urandom


class Config:
    SECRET_KEY = "Hello"
    URL = 'postgres' if ("DOCKER" in os.environ) else '202.181.148.171'
    # TODO: REMOVE before deployment
    DB_LOGIN = os.environ.get("DB_LOGIN") if ("DOCKER" in os.environ) else 'nai1ka'
    DB_PASSWORD = os.environ.get("DB_PASSWORD") if ("DOCKER" in os.environ) else "123456"
    DB_NAME = "gymguru"
    SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://nai1ka:{DB_PASSWORD}@{URL}:5432/{DB_NAME}"
    DEBUG = False
    TESTING = False


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    DEBUG = True
    TESTING = True
    WTF_CSRF_ENABLED = False

class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
