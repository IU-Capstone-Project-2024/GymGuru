from flask import render_template

from app import app, login_manager


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/rating")
def rating():
    return render_template("rating.html")


@app.route("/login")
def login():
    return render_template("log_in.html")

@app.route("/exercises")
def exercises():
    return render_template("exercises.html")

@app.route("/push_up_preview")
def push_up_preview():
    return render_template("push_up_preview.html")

@app.route("/squat_preview")
def squat_preview():
    return render_template("squat_preview.html")

@app.route("/curl_preview")
def curl_preview():
    return render_template("curl_preview.html")
@app.route("/crunch_preview")
def crunch_preview():
    return render_template("crunch_preview.html")

# Define a route for the lunge preview page
@app.route('/lunge_preview')
def lunge_preview():
    return render_template('lunge_preview.html')

@app.route("/test")
def test():
    return render_template("test.html")


@app.route("/curl")

def curl():
    return render_template("curl.html")


@app.route("/push_up")

def push_up():
    return render_template("push_up.html")

@app.route("/squat")

def squat():
    return render_template("squat.html")
# Define a route for the V-up crunch preview page
@app.route('/v_up_crunch_preview')
def v_up_crunch_preview():
    return render_template('v_up_crunch_preview.html')


# Define a route for the lateral raise preview page
@app.route('/lateral_raise_preview')
def lateral_raise_preview():
    return render_template('lateral_raise_preview.html')


# Define a route for the forward bends preview page
@app.route('/forward_bend_preview')
def forward_bend_preview():
    return render_template('forward_bend_preview.html')


# Define a route for the plank preview page
@app.route('/plank_preview')
def plank_preview():
    return render_template('plank_preview.html')


@app.route("/register")
def register():
    return render_template("sign_up.html")


@login_manager.user_loader
def load_user(user_id):
    return None
