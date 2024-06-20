from flask import render_template, redirect, url_for, request

from app import app, login_manager

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Email, Length

from forms.login_form import LoginForm
from forms.register_form import RegistrationForm


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/rating")
def rating():
    return render_template("rating.html")


@app.route("/login")
def login():
    form = LoginForm()
    if form.validate_on_submit():
        pass
        # user = User.query.filter_by(email=request.form["email"]).first()
        # if user and check_password_hash(user.password, request.form["password"]):
        #     login_user(user)
        #     return redirect(url_for("profile"))
        # else:
        #     flash("Invalid email or password", "danger")
    return render_template("log_in.html", form=form)

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




@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        pass
        # hashed_password = generate_password_hash(form.password.data, method="sha256")
        # new_user = User(
        #     name=form.name.data,
        #     email=form.email.data,
        #     password=hashed_password,
        # )
        # db.session.add(new_user)
        # db.session.commit()
        return redirect(url_for("login"))

    return render_template("register.html", form=form)


@login_manager.user_loader
def load_user(user_id):
    return None
