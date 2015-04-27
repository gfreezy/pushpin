# coding: utf8
from flask import jsonify, g, abort, request
from playhouse.flask_utils import get_object_or_404
from app import app
from models.user import User
from models.room import Room
from views.libs.auth import logined


@app.route('/rooms')
@logined
def rooms():
    return jsonify([{
        'id': str(room.id),
        'oneToOne': room.is_one_to_one(),
        'users': room.users,
        'unreadItems': room.unreadItems,
    } for room in g.me.rooms])


@app.route('/rooms/create', methods=['POST'])
@logined
def rooms_create():
    user_ids = request.form.get('user_ids', '').split(',')
    users = User.get_list(user_ids)
    if g.me in users:
        users.append(g.me)
    room = Room.create(users)
    return jsonify(room)


@app.route('/rooms/<int:id>/users')
@logined
def rooms_users(id):
    room = get_object_or_404(Room, Room.id == id)
    if not room.is_user_in_room(g.me):
        abort(401)
    return jsonify(room.users)


@app.route('/rooms/<int:id>/messages')
@logined
def rooms_messages(id):
    room = get_object_or_404(Room, Room.id == id)
    if not room.is_user_in_room(g.me):
        abort(401)
    size = request.args.get('size', '50')
    before = request.args.get('before', 'inf')
    after = request.args.get('after')
    if after:
        messages = room.messages_after(after, int(size))
    else:
        messages = room.messages_before(before, int(size))
    return jsonify(messages)


@app.route('/rooms/<int:id>/say')
@logined
def rooms_say(id):
    room = get_object_or_404(Room, Room.id == id)
    if not room.is_user_in_room(g.me):
        abort(401)
    text = request.form.get('text', '')
    if not text.strip():
        abort(400)

    message = room.say(text, g.me)
    return jsonify(message)
