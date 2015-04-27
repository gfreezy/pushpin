from functools import wraps
from flask import request, abort, g
from models.user import User


def logined(f):
    @wraps(f)
    def _(*args, **kwargs):
        token = request.values.get('token')
        g.me = u = User.get_by_token(token)
        if not u:
            abort(401)
        return f(*args, **kwargs)

    return _
