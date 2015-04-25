#coding: utf8
from flask import Flask
from views.libs.asset import Asset
from config import Config

app = Flask(__name__)
asset_management = Asset(Config.asset_file, host=Config.asset_host, debug=Config.debug)


@app.context_processor
def utility_processor():
    def asset(name):
        return asset_management.get(name)
    return dict(asset=asset)


import views.index  # noqa
