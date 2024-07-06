from flask import render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, login_required, current_user

from app import app, login_manager, session, user_result
from forms.fittest_step_1_form import FittestStep1Form
from forms.login_form import LoginForm
from forms.register_form import RegistrationForm

from models.User import User
from models.UserFittestResult import UserFittestResult


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/rating")
def rating():
    users = (session.query(User).all())
    users_data = [user.to_json() for user in users]
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


@app.route("/test")
def test():
    return render_template("test.html")


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


@app.route('/lunge_preview')
def lunge_preview():
    return render_template('lunge_preview.html')


@app.route('/v_up_crunch_preview')
def v_up_crunch_preview():
    return render_template('v_up_crunch_preview.html')


@app.route("/profile")
def profile():
    return render_template("profile.html", user=current_user)


@app.route('/lateral_raise_preview')
def lateral_raise_preview():
    return render_template('lateral_raise_preview.html')


@app.route('/forward_bend_preview')
def forward_bend_preview():
    return render_template('forward_bend_preview.html')


@app.route('/plank_preview')
def plank_preview():
    return render_template('plank_preview.html')


@app.route("/curl")
def curl():
    return render_template("curl.html")


@app.route("/push_up")
def push_up():
    return render_template("push_up.html")


@app.route("/squat")
def squat():
    return render_template("squat.html")


@app.route("/crunch")
def crunch():
    return render_template("crunch.html")


@app.route("/lunge")
def lunge():
    return render_template("lunge.html")


@app.route("/v_up_crunch")
def v_up_crunch():
    return render_template("v_up_crunch.html")


@app.route("/lateral_raise")
def lateral_raise():
    return render_template("lateral_raise.html")


@app.route("/forward_bend")
def forward_bend():
    return render_template("forward_bend.html")


@app.route("/plank")
def plank():
    return render_template("plank.html")


@app.route("/test_preview")
def test_preview():
    return render_template("test_preview.html")


@app.route("/test_results")
def test_results():
    # TODO: REFACTOR!!!
    user_id = current_user.get_id()
    result = user_result[user_id]
    forward_bend = result.forward_bend
    forward_bend_points = 0

    push_up = result.push_up
    # TODO check for man or woman
    push_up_points = 0
    if (push_up >= 35):
        push_up_points = 25
    elif (push_up >= 15):
        push_up_points = 15
    elif (push_up >= 10):
        push_up_points = 10

    crunches = result.crunches
    # TODO check for man or woman
    crunches_points = 0
    if (crunches >= 43):
        crunches_points = 25
    elif (crunches >= 35):
        crunches_points = 15
    elif (crunches >= 20):
        crunches_points = 10

    print(push_up_points, crunches_points, forward_bend_points)

    user = session.query(User).get(user_id)
    session.query(User).filter(User.id == user_id).update(
        {User.push_up_counter: user.push_up_counter + push_up,
         User.crunch_counter: user.crunch_counter + crunches})
    session.commit()
    user_result.pop(user_id)
    return render_template("test_results.html", result={
        "push_up": push_up_points,
        "crunches": crunches_points,
        "forward_bend": forward_bend_points
    })


@app.route('/test_step_1', methods=['GET', 'POST'])
def test_step_1():
    form = FittestStep1Form()
    if request.method == "POST" and form.validate_on_submit():
        height = form.height.data
        weight = form.weight.data
        user_result[current_user.get_id()] = UserFittestResult(current_user.get_id(), height, weight, 0, 0, 0)
        return redirect(url_for("test_step_2"))
    return render_template("test_step_1.html", form=form)


@app.route("/test_step_2")
def test_step_2():
    return render_template("test_step_2.html")


@app.route("/test_step_3")
def test_step_3():
    return render_template('test_step_3.html')


@app.route("/test_step_4")
def test_step_4():
    return render_template("test_step_4.html")


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("index"))


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User()
        user.name = form.name.data
        user.surname = form.surname.data
        user.email = form.email.data
        user.set_password(form.password.data)
        session.add(user)
        session.commit()
        return redirect(url_for("login"))
    return render_template("register.html", form=form)


@login_manager.user_loader
def load_user(user_id):
    return session.query(User).get(user_id)
