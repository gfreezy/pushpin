# coding: utf8
from peewee import Model, SqliteDatabase
from config import Config


db = SqliteDatabase(Config.db)


class BaseModel(Model):
    """base model for all models"""

    class Meta:
        database = db

    def __repr__(self):
        return u'<%s id: %s>' % (self.__class__.__name__, self.id)


import models.message
import models.notification_center
import models.room
import models.user # noqa
