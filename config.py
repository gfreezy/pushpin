import os


BASE_PATH = os.path.dirname(os.path.abspath(__file__))


class Config(object):
    db_name = 'pushpin.sqlite'
    db = os.path.join(BASE_PATH, db_name)
