from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Email, Length, DataRequired, NumberRange
from wtforms import IntegerField


class FittestStep1Form(FlaskForm):
    height = IntegerField(
        "Height", validators=[DataRequired("Invalid height"), NumberRange(min=0, max=300)]
    )
    weight = IntegerField(
        "Weight", validators=[DataRequired("Invalid weight"), NumberRange(min=0, max=300)]
    )
    submit = SubmitField("FittestStep1")
