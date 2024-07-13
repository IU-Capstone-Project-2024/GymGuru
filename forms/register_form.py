from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, RadioField
from wtforms.validators import InputRequired, Email, Length


class RegistrationForm(FlaskForm):
    name = StringField(
        "Name", validators=[InputRequired(), Length(min=4, max=20)]
    )
    surname = StringField(
        "Surname", validators=[InputRequired(), Length(min=4, max=20)]
    )
    gender = RadioField(
        "Gender",
        choices=[("M", "Male"), ("F", "Female")],
        validators=[InputRequired()]
    )
    email = StringField(
        "Email",
        validators=[InputRequired(), Email(message="Invalid email"), Length(max=50)],
    )
    password = PasswordField(
        "Password", validators=[InputRequired(), Length(min=6, max=80)]
    )
    submit = SubmitField("Register")
