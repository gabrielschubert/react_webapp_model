from flask import jsonify, Blueprint, request
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, set_access_cookies, set_refresh_cookies, unset_jwt_cookies, current_user

from api import db, bcrypt
from api.python.models import User
# from api.python.users.utils import login_required


users = Blueprint('users', __name__)


@users.route('/auth/list/users', methods=["GET"])
@jwt_required()
def list_users():
    users_list = [user.serialize for user in User.query.all()]
    return jsonify(users_list)


@users.route('/auth/login', methods=["POST"])
def login():
    data = request.get_json()
    if data.get('username') and data.get('password'):
        user = User.query.filter(
            User.username == data['username']).one_or_none()
        if not user:
            return jsonify({"status": "error", "code": 1, "message": "User not found"}), 403

        check_pass = bcrypt.check_password_hash(
            user.password, data['password'])
        if not check_pass:
            return jsonify({"status": "error", "code": 2, "message": "Wrong password"}), 403

        if user and check_pass:
            access_token = create_access_token(
                identity=user, fresh=True, additional_claims={"is_user": True})
            refresh_token = create_refresh_token(user)

            resp = jsonify(
                status="Success",
                msg="Login completed",
                access_token=access_token,
                refresh_token=refresh_token)

            set_access_cookies(resp, access_token)
            set_refresh_cookies(resp, refresh_token)

            return resp, 200
    return jsonify({"status": "error", "code": 3, "message": "Invalid input"}), 403


@users.route('/auth/logout', methods=["GET"])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200


@users.route('/auth/token-refresh', methods=["POST"])
@jwt_required(refresh=True)
def token_refresh():
    new_token = create_access_token(identity=current_user, fresh=False)
    return jsonify(
        status="Success",
        msg="Token refreshed",
        access_token=new_token)


@users.route('/auth/token-check', methods=["GET"])
@jwt_required(optional=True)
def token_check():
    user = current_user
    if user:
        return jsonify(
            status="Success",
            msg="Token is active")
    else:
        return jsonify(
            status="Error",
            msg="Token is inactive")
