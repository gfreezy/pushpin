# coding: utf8
import datetime
from peewee import CharField, DateTimeField, ForeignKeyField
from models.base import BaseModel
from models.user import User
from models.room import Room


class Message(BaseModel):
    text = CharField(max_length=512)
    user = ForeignKeyField(User, related_name='messages')
    room = ForeignKeyField(Room, related_name='messages')
    create_time = DateTimeField(default=datetime.datetime.now)
    update_time = DateTimeField(default=datetime.datetime.now)

    def __json__(self):
        return {
            "id": str(self.id),
            "text": self.text,
            "html": self.text,
            "sent": self.create_time,
            "editedAt": self.update_time,
            "fromUser": self.user,
        }
