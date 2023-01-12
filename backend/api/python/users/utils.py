from flask import jsonify, current_app
from flask_jwt_extended import current_user, verify_jwt_in_request, get_jwt, unset_jwt_cookies

from functools import wraps

### DECORATORS ###
def login_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            jti = get_jwt()["jti"]
            last_jti = current_user.last_jti
            if last_jti and jti == last_jti:
                return fn(*args, **kwargs)
            else:
                resp = jsonify({'logout': True})
                unset_jwt_cookies(resp)
                return resp, 401
        return decorator
    return wrapper