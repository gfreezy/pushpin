# coding: utf8
from flask import jsonify, g
from app import app
from views.libs.auth import logined


@app.route('/account')
@logined
def account():
    return jsonify(g.me)
