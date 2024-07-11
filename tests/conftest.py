import pytest
from app import create_app
from app.extensions import db
from config import TestingConfig


@pytest.fixture()
def init():
    app = create_app(TestingConfig)

    with app.app_context():
        if str(db.engine.url) != TestingConfig.SQLALCHEMY_DATABASE_URI:
            return
        db.drop_all()
        db.create_all()

    yield app

    with app.app_context():
        db.drop_all()


@pytest.fixture()
def client(init):
    return init.test_client()


@pytest.fixture()
def runner(init):
    return init.test_cli_runner()
