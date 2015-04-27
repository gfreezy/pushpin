# coding: utf8
import datetime
from peewee import CharField, DateTimeField
from models.base import BaseModel


class User(BaseModel):
    name = CharField(max_length=100)
    avatar = CharField(max_length=200)
    create_time = DateTimeField(default=datetime.datetime.now)
    update_time = DateTimeField(default=datetime.datetime.now)

    def __json__(self):
        return {
            "id": str(self.id),
            "username": self.name,
            "avatar": self.avatar,
        }

    @classmethod
    def get_list(ids):
        return User.select().where(User.id << ids)

    @classmethod
    def create(cls, name, avatar=''):
        return super(User, cls).create(name=name, avatar=avatar)

    @classmethod
    def get_by_token(cls, token):
        try:
            return User.get(User.id == token)
        except:
            pass

    def rooms(self):
        from models.room import Room
        return [roomate.room for roomate in self.roommates.join(Room)]
