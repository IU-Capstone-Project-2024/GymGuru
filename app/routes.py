from flask import render_template, redirect, url_for, flash, request, Blueprint
from flask_login import login_user, logout_user, login_required, current_user

from app.models.User import User
from forms.fittest_step_1_form import FittestStep1Form
from forms.login_form import LoginForm
from forms.register_form import RegistrationForm
from app.extensions import session, login_manager, db
from app.models.UserFittestResult import UserFittestResult
from app.sockets import user_result

main = Blueprint('main', __name__)


@main.route("/")
@main.route("/index")
def index():
    return render_template("index.html")


@main.route("/rating")
def rating():
    users = (session.query(User).all())
    users_data = [user.to_json() for user in users]
    return render_template("rating.html", users=users_data)


@main.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == "POST" and form.validate_on_submit():
        try:
            user = session.query(User).filter(User.email == form.email.data).first()
            if user and user.check_password(form.password.data):
                login_user(user)
                return redirect(url_for("main.index"))
            else:
                flash("Invalid email or password", "danger")
        except:
            db.rollback()
            flash("Unknown error. Please try again", "danger")

    return render_template("log_in.html", form=form)


@main.route("/test")
@login_required
def test():
    return render_template("test.html")


@main.route("/exercises")
def exercises():
    return render_template("exercises.html")


@main.route("/push_up_preview")
def push_up_preview():
    return render_template("push_up_preview.html")


@main.route("/squat_preview")
def squat_preview():
    return render_template("squat_preview.html")


@main.route("/curl_preview")
def curl_preview():
    return render_template("curl_preview.html")


@main.route("/crunch_preview")
def crunch_preview():
    return render_template("crunch_preview.html")


@main.route('/lunge_preview')
def lunge_preview():
    return render_template('lunge_preview.html')


@main.route('/v_up_crunch_preview')
def v_up_crunch_preview():
    return render_template('v_up_crunch_preview.html')


@main.route("/profile")
@login_required
def profile():
    return render_template("profile.html", user=current_user)


@main.route('/lateral_raise_preview')
@login_required
def lateral_raise_preview():
    return render_template('lateral_raise_preview.html')


@main.route('/forward_bend_preview')
@login_required
def forward_bend_preview():
    return render_template('forward_bend_preview.html')


@main.route('/plank_preview')
@login_required
def plank_preview():
    return render_template('plank_preview.html')


@main.route("/curl")
@login_required
def curl():
    return render_template("curl.html")


@main.route("/push_up")
@login_required
def push_up():
    return render_template("push_up.html")


@main.route("/squat")
@login_required
def squat():
    return render_template("squat.html")


@main.route("/crunch")
@login_required
def crunch():
    return render_template("crunch.html")


@main.route("/lunge")
@login_required
def lunge():
    return render_template("lunge.html")


@main.route("/v_up_crunch")
@login_required
def v_up_crunch():
    return render_template("v_up_crunch.html")


@main.route("/lateral_raise")
@login_required
def lateral_raise():
    return render_template("lateral_raise.html")


@main.route("/forward_bend")
@login_required
def forward_bend():
    return render_template("forward_bend.html")


@main.route("/plank")
@login_required
def plank():
    return render_template("plank.html")


@main.route("/test_preview")
def test_preview():
    return render_template("test_preview.html")


@main.route("/test_results")
@login_required
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


@main.route('/test_step_1', methods=['GET', 'POST'])
@login_required
def test_step_1():
    form = FittestStep1Form()
    if request.method == "POST" and form.validate_on_submit():
        height = form.height.data
        weight = form.weight.data
        user_result[current_user.get_id()] = UserFittestResult(current_user.get_id(), height, weight, 0, 0, 0)
        return redirect(url_for("main.test_step_2"))
    return render_template("test_step_1.html", form=form)


@main.route("/test_step_2")
@login_required
def test_step_2():
    return render_template("test_step_2.html")


@main.route("/test_step_3")
@login_required
def test_step_3():
    return render_template('test_step_3.html')


@main.route("/test_step_4")
@login_required
def test_step_4():
    return render_template("test_step_4.html")


@main.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("main.index"))


@main.route('/register', methods=['GET', 'POST'])
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
        return redirect(url_for("main.login"))
    return render_template("register.html", form=form)


@login_manager.user_loader
def load_user(user_id):
    return session.query(User).get(user_id)
