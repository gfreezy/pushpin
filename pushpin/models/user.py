# coding: utf8
import datetime
from peewee import CharField, DateTimeField
from models.base import BaseModel


class User(BaseModel):
    name = CharField(max_length=100)
    avatar = CharField(max_length=200)
    create_time = DateTimeField(default=datetime.datetime.now)
    update_time = DateTimeField(default=datetime.datetime.now)

    @classmethod
    def create(cls, name, avatar=''):
        return super(User, cls).create(name=name, avatar=avatar)

    def rooms(self):
        from models.room import Room
        return (roomate.room for roomate in self.roommates.join(Room))
