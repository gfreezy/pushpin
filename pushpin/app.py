#coding: utf8
from flask import Flask
from flask.json import JSONEncoder
from views.libs.asset import Asset
from config import Config


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        __json__ = getattr(obj, '__json__')
        if __json__:
            return __json__()
        return JSONEncoder.default(self, obj)


app = Flask(__name__)
app.json_encoder = CustomJSONEncoder
asset_management = Asset(Config.asset_file, host=Config.asset_host, debug=Config.debug)


@app.context_processor
def utility_processor():
    def asset(name):
        return asset_management.get(name)
    return dict(asset=asset)


import views.index  # noqa
