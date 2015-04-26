from os.path import join, dirname, abspath


BASE_PATH = dirname(abspath(__file__))


class Config(object):
    db_name = 'pushpin.sqlite'
    db = join(BASE_PATH, db_name)
    asset_file = join(BASE_PATH, 'static/webpack-assets.json')
    asset_host = ''
    debug = True
