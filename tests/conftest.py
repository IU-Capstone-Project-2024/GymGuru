import pytest
from app import create_app
from app.extensions import db


@pytest.fixture()
def init():
    app = create_app()
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "WTF_CSRF_ENABLED": False
    })

    with app.app_context():
        db.drop_all()
        db.create_all()

    yield app



@pytest.fixture()
def client(init):
    return init.test_client()


@pytest.fixture()
def runner(init):
    return init.test_cli_runner()
