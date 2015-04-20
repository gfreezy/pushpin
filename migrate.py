# coding: utf8
from models import Message, Room, User, db


def create_tables():
    db.connect()
    db.create_tables([Message, Room, User])
    db.close()


if __name__ == '__main__':
    create_tables()
