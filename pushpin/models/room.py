# coding: utf8
import datetime
from peewee import CharField, DateTimeField, ForeignKeyField, DoesNotExist, IntegerField
from models.base import BaseModel, db
from models.notification_center import NotificationCenter
from models.user import User


class Room(BaseModel):
    """Room for chatting"""
    identity = CharField(max_length=64, index=True)
    create_time = DateTimeField(default=datetime.datetime.now)
    update_time = DateTimeField(default=datetime.datetime.now)

    def __json__(self):
        return {
            "id": str(self.id),
            "oneToOne": self.is_one_to_one(),
            "users": self.users,
        }

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

    @property
    def users(self):
        return [roommate.user for roommate in self.roommates.join(User)]

    @db.atomic()
    def say(self, text, user):
        from models.message import Message
        message = Message.create(text=text, user=user, room=self)
        for roommate in Roommate.select().join(User).where(Roommate.room == self):
            NotificationCenter.notify_new_message(roommate.user, message)
        return message

    def is_one_to_one(self):
        return bool(self.roommates.count() <= 2)

    def unread_items_for_user(self, user):
        return self.roommates.where(Roommate.room == self).get().unreadItems

    def is_user_in_room(self, user):
        return bool(self.roommates.where(Roommate.user == user).count())

    def messages_by_before(self, before='inf', size=50):
        from modles.message import Message
        if before == 'inf':
            return self.messages.order_by(Message.id.desc()).limit(50)
        return self.messages.where(Message.id < before).order_by(Message.id.desc()).limit(50)

    def messages_by_after(self, after=0, size=50):
        from modles.message import Message
        return self.messages.where(Message.id > after).order_by(Message.id).limit(size)


class Roommate(BaseModel):
    room = ForeignKeyField(Room, related_name='roommates')
    user = ForeignKeyField(User, related_name='roommates')
    unreadItems = IntegerField(default=0)
    create_time = DateTimeField(default=datetime.datetime.now)
    update_time = DateTimeField(default=datetime.datetime.now)
