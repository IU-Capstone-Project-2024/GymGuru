import pytest
from flask import url_for
from app.models.User import User
from app.extensions import db, session


# Testing the home page
def test_index(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"GymGuru - your personal assistant to effective workouts" in response.data


# Testing the registration page
def test_register(client):
    response = client.get("/register")
    assert response.status_code == 200
    assert b"Register" in response.data

    response = client.post("/register", data={
        'name': 'Test',
        'surname': 'User',
        'email': 'testuser@example.com',
        'password': 'password123',
    }, follow_redirects=True)

    assert response.status_code == 200
    assert b"No account" in response.data  # Check that the user is redirected to login page

    user = session.query(User).filter_by(email='testuser@example.com').first()
    assert user is not None


# Testing the login page
def test_login(client):
    # First, register a user
    client.post("/register", data={
        'name': 'Test',
        'surname': 'User',
        'email': 'testuser@example.com',
        'password': 'password123',
        'confirm': 'password123'
    }, follow_redirects=True)

    response = client.get("login")
    assert response.status_code == 200
    assert b"No account" in response.data

    response = client.post("/login", data={
        'email': 'testuser@example.com',
        'password': 'password123'
    }, follow_redirects=True)

    assert response.status_code == 200
    assert b"GymGuru - your personal assistant to effective workouts" in response.data  # Check that the user is logged in


# Testing the logout
def test_logout(client):
    # First, register and login a user
    client.post("/register", data={
        'name': 'Test',
        'surname': 'User',
        'email': 'testuser@example.com',
        'password': 'password123',
        'confirm': 'password123'
    }, follow_redirects=True)

    client.post('/login', data={
        'email': 'testuser@example.com',
        'password': 'password123'
    }, follow_redirects=True)

    response = client.get("/logout", follow_redirects=True)
    assert response.status_code == 200
    assert b"GymGuru - your personal assistant to effective workouts" in response.data  # Check that the user is logged out


# Testing a protected route
def test_protected_route(client):
    response = client.get("/profile")
    assert response.status_code == 302  # Should redirect to login page

    # Register and login a user
    client.post(url_for('main.register'), data={
        'name': 'Test',
        'surname': 'User',
        'email': 'testuser@example.com',
        'password': 'password123',
        'confirm': 'password123'
    }, follow_redirects=True)

    client.post(url_for('main.login'), data={
        'email': 'testuser@example.com',
        'password': 'password123'
    }, follow_redirects=True)

    response = client.get(url_for('main.profile'))
    assert response.status_code == 200  # Should now have access


# Testing socket events
def test_socketio_events(client, socketio):
    from flask_login import login_user
    from app.models import User

    # Register and login a user
    client.post(url_for('main.register'), data={
        'name': 'Test',
        'surname': 'User',
        'email': 'testuser@example.com',
        'password': 'password123',
        'confirm': 'password123'
    }, follow_redirects=True)

    user = session.query(User).filter_by(email='testuser@example.com').first()
    login_user(user)

    client.post(url_for('main.login'), data={
        'email': 'testuser@example.com',
        'password': 'password123'
    }, follow_redirects=True)

    # Testing push_up socket event
    socketio.emit('push_up', 10)
    user = session.query(User).filter_by(email='testuser@example.com').first()
    assert user.push_up_counter == 10