from app import create_app, socketio

app = create_app()

if __name__ == "__main__":
    socketio.run(app, "0.0.0.0", port=1234, debug=True, allow_unsafe_werkzeug=True)


# Comment from Arina <3
# Hello from Nail <3


