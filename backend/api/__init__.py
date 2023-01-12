from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy as _BaseSQLAlchemy
from flask_jwt_extended import JWTManager, unset_jwt_cookies
from flask_bcrypt import Bcrypt
from flask_cors import CORS


class SQLAlchemy(_BaseSQLAlchemy):
    def apply_pool_defaults(self, app, options):
        options = super().apply_pool_defaults(app, options)
        options["pool_pre_ping"] = True
        return options


db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()


def create_app(config_class, restart_db=False):
    app = Flask(__name__)

    print(f"STARTING CONFIG MODE: {config_class.MODE}")
    app.config.from_object(config_class)

    db.init_app(app)
    bcrypt.init_app(app)
    CORS(app, supports_credentials=True)
    jwt.init_app(app)

    @jwt.expired_token_loader
    def my_expired_token_callback(jwt_header, jwt_payload):
        resp = jsonify(status="Error", msg="Token expired")
        unset_jwt_cookies(resp)
        return resp, 401

    @jwt.user_lookup_error_loader
    def custom_user_loader_error(jwt_header, jwt_payload):
        resp = jsonify({"msg": "User not found"})
        unset_jwt_cookies(resp)
        return resp, 404

    @jwt.invalid_token_loader
    def my_invalid_token_loader(jwt_header):
        resp = jsonify(status="Error", msg="Invalid token value")
        unset_jwt_cookies(resp)
        return resp, 401

    from api.python.main.routes import main
    from api.python.users.routes import users
    from api.python.items.routes import items
    app.register_blueprint(main)
    app.register_blueprint(users)
    app.register_blueprint(items)

    print("\nRestart DB set to:", restart_db, '\n')

    from api.python.models import User, Item
    if restart_db is True:
        with app.app_context():
            print("Dropando tabelas")
            db.drop_all()
            print("Criando tabelas")
            db.create_all()

            user = User(
                name="Gabriel Schubert",
                email="gabriel.costa@lnls.br",
                username="gabriel.costa",
                password=bcrypt.generate_password_hash(
                    "teste").decode('utf-8')
            )

            db.session.add(user)
            db.session.commit()
            print("Banco de dados restaurado. \n")

    return app
