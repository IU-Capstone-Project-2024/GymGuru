import csv
import io
import uuid

from flask import render_template, redirect, url_for, flash, request, Blueprint, send_file
from flask_login import login_user, logout_user, login_required, current_user

from app.models.User import User, Exercise, FitnessTestResult
from forms.fittest_step_1_form import FittestStep1Form
from forms.login_form import LoginForm
from forms.register_form import RegistrationForm
from app.extensions import login_manager, db
from app.models.UserFittestResult import UserFittestResult
from app.sockets import user_result

main = Blueprint('main', __name__)


@main.route("/")
@main.route("/index")
def index():
    return render_template("index.html")


@main.route("/rating")
def rating():
    try:
        users = (db.session.query(User).all())
        users_data = [user.to_json() for user in users]
        return render_template("rating.html", users=users_data)
    except Exception as e:
        db.session.rollback()
        return "Error. Please try again :("


@main.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == "POST" and form.validate_on_submit():
        try:
            user = db.session.query(User).filter(User.email == form.email.data).first()
            if user and user.check_password(form.password.data):
                login_user(user)
                return redirect(url_for("main.index"))
            else:
                flash("Invalid email or password", "danger")
        except Exception as e:
            db.session.rollback()
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


@main.route("/profile", methods=['GET', 'POST'])
@login_required
def profile():
    if request.method == 'POST':
        csv_content = b"User email, Weight, Height, Push-up (times), Crunches(times), Forward Bend\n"

        users = (db.session.query(User).all())
        for user in users:
            fitness_test_results = (
                db.session.query(FitnessTestResult).filter(FitnessTestResult.user_id == user.user_id).all())
            if len(fitness_test_results) == 0:
                continue
            last_result: FitnessTestResult = max(fitness_test_results, key=lambda x: x.datetime)
            csv_content += (f"{user.email}, {last_result.weight}, {last_result.height}, {last_result.push_up_counter}, "
                            f"{last_result.crunch_counter}, {last_result.forward_bend.value}\n").encode()
            print(last_result)
        csv_file = io.BytesIO(csv_content)
        csv_file.seek(0)
        return send_file(csv_file, as_attachment=True, download_name='data.csv', mimetype='text/csv')
    elif request.method == 'GET':
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
    user_id = current_user.get_id()
    # gender = user.gender
    gender = 'M'
    result: UserFittestResult = user_result[user_id]
    points = result.get_points(gender)
    push_up_points = points['push_up']
    crunches_points = points['crunches']
    forward_bend_points = points['forward_bend']

    try:
        fitness_test_result = FitnessTestResult()

        fitness_test_result.user_id = user_id
        fitness_test_result.test_id = str(uuid.uuid4())
        fitness_test_result.height = result.height
        fitness_test_result.weight = result.weight
        fitness_test_result.push_up_counter = result.push_up
        fitness_test_result.crunch_counter = result.crunches
        fitness_test_result.forward_bend = result.forward_bend
        fitness_test_result.datetime = db.func.now()
        db.session.add(fitness_test_result)

        db.session.query(Exercise).filter(Exercise.user_id == user_id).update(
            {Exercise.push_up_counter: Exercise.push_up_counter + result.push_up,
             Exercise.crunch_counter: Exercise.crunch_counter + result.crunches})

        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return "Error. Please try again :("

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
        try:
            user = User()
            user.name = form.name.data
            user.surname = form.surname.data
            user.gender = form.gender.data
            user.email = form.email.data
            user.set_password(form.password.data)
            db.session.add(user)
            db.session.commit()

            new_exercise = Exercise(user_id=user.user_id)
            db.session.add(new_exercise)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            flash("Unknown error. Please try again", "danger")

        return redirect(url_for("main.login"))
    return render_template("register.html", form=form)


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, user_id)
