# coding: utf8
import datetime
from peewee import CharField, DateTimeField, ForeignKeyField, DoesNotExist
from models.base import BaseModel, db
from models.notification_center import NotificationCenter
from models.user import User


class Room(BaseModel):
    """Room for chatting"""
    identity = CharField(max_length=64, index=True)
    create_time = DateTimeField(default=datetime.datetime.now)
    update_time = DateTimeField(default=datetime.datetime.now)

    @classmethod
    def compute_identity(cls, users):
        return hash(str(sorted(u.id for u in users))) & 0xffffffffffffffff

    @classmethod
    @db.atomic()
    def create(cls, users):
        identity = cls.compute_identity(users)
        try:
            room = cls.get(Room.identity == identity)
        except DoesNotExist:
            room = super(Room, cls).create(identity=identity)
            for u in users:
                Roommate.create(room=room, user=u)
        return room

    @db.atomic()
    def say(self, text, user):
        from models.message import Message
        message = Message.create(text=text, user=user, room=self)
        for roommate in Roommate.select().join(User).where(Roommate.room == self):
            NotificationCenter.notify_new_message(roommate.user, message)


class Roommate(BaseModel):
    room = ForeignKeyField(Room, related_name='roommates')
    user = ForeignKeyField(User, related_name='roommates')
    create_time = DateTimeField(default=datetime.datetime.now)
    update_time = DateTimeField(default=datetime.datetime.now)
