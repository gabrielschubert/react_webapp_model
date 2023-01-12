from api import db, jwt
import datetime


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    user = User.query.get(identity)
    return user


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, unique=False, nullable=False)
    registration_date = db.Column(
        db.DateTime, default=datetime.datetime.now, nullable=False)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'username': self.username,
            'registration_date': self.registration_date.strftime('%d/%m/%y %H:%M:%S')
        }

    def __repr__(self):
        return f"<User: {self.email}>"


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)

    room = db.Column(db.String, nullable=False)
    storage = db.Column(db.String, nullable=False)
    level = db.Column(db.String, nullable=False)
    sublevel = db.Column(db.String, nullable=False)

    type = db.Column(db.String)
    asset_number = db.Column(db.String)
    category = db.Column(db.String)
    description = db.Column(db.String)
    sc_number = db.Column(db.String)

    amount = db.Column(db.Integer, nullable=False, default=1)
    high_amount_alarm = db.Column(db.Integer)
    low_amount_alarm = db.Column(db.Integer)

    user_access = db.Column(db.Boolean, nullable=False)
    labeled = db.Column(db.Boolean, nullable=False)
    comments = db.Column(db.Text)

    registration_date = db.Column(
        db.DateTime, default=datetime.datetime.now, nullable=False
    )
    last_update = db.Column(
        db.DateTime, default=datetime.datetime.now, nullable=False
    )

    @property
    def serialize(self):
        return {
            'id': self.id,
            'code': self.code,
            'name': self.name,

            'room': self.room,
            'storage': self.storage,
            'level': self.level,
            'sublevel': self.sublevel,

            'type': self.type,
            'asset_number': self.asset_number,
            'category': self.category,
            'description': self.description,
            'sc_number': self.sc_number,


            'amount': self.amount,

            'high_amount_alarm': self.high_amount_alarm,
            'low_amount_alarm': self.low_amount_alarm,

            'user_access': self.user_access,
            'labeled': self.labeled,
            'comments': self.comments,

            'last_update': self.last_update.strftime('%d/%m/%y %H:%M:%S'),
            'registration_date': self.registration_date.strftime('%d/%m/%y %H:%M:%S')
        }
