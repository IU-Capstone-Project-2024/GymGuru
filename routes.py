from flask import render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user

from app import app, login_manager, session
from forms.login_form import LoginForm
from forms.register_form import RegistrationForm
from models.User import User


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/rating")
def rating():
    # TODO: get users data
    # users = User.query.all()
    #
    # users_data = [
    #     {
    #         'name': user.name,
    #         'push_up_counter': user.push_up_counter,
    #         'squat_counter': user.squat_counter,
    #         'curl_counter': user.curl_counter,
    #         'forward_bend_counter': user.forward_bend_counter,
    #         'lateral_raise_counter': user.lateral_raise_counter,
    #         'lunge_counter': user.lunge_counter,
    #         'plank_counter': user.plank_counter,
    #         'v_up_crunch_counter': user.v_up_crunch_counter,
    #     }
    #     for user in users
    # ]

    # TODO: order in database like in exercises.html
    users_data = [
        {
            'name': "liana",
            'push_up_counter': 10,
            'squat_counter': 10,
            'curl_counter': 5,
            'crunch_counter': 5,
            'lunge_counter': 10,
            'forward_bend_counter': 3,
            'lateral_raise_counter': 8,
            'plank_counter': 10,
            'v_up_crunch_counter': 10,
        }

    ]

    return render_template("rating.html", users=users_data)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == "POST" and form.validate_on_submit():
        user = session.query(User).filter(User.email == form.email.data).first()
        if user and user.check_password(form.password.data):
            login_user(user)
            return redirect(url_for("index"))
        else:
            flash("Invalid email or password", "danger")
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


@app.route("/test_preview")
def test_preview():
    return render_template("test_preview.html")


@app.route("/test_results")
def test_results():
    return render_template("test_results.html")


@app.route("/test_step_1")
def test_step_1():
    return render_template("test_step_1.html")


@app.route("/test_step_2")
def test_step_2():
    return render_template("test_step_2.html")


@app.route("/test_step_3")
def test_step_3():
    return render_template("test_step_3.html")


@app.route("/test_step_4")
def test_step_4():
    return render_template("test_step_4.html")


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("index"))


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
        user = User()
        user.name = form.name.data
        user.email = form.email.data
        user.set_password(form.password.data)
        session.add(user)
        session.commit()

        return redirect(url_for("login"))
    return render_template("register.html", form=form)


@login_manager.user_loader
def load_user(user_id):
    return session.query(User).get(user_id)



@app.route("/profile")
def profile():
    return render_template("profile.html")
