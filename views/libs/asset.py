# coding: utf8
import json
from urlparse import urljoin


class Asset(object):
    """Asset management"""
    def __init__(self, path, host=None, debug=False):
        self.path = path
        self._stats = {}
        self.host = host
        self.debug = debug

    @property
    def stats(self):
        _stats = self._stats
        if not _stats:
            with open(self.path) as f:
                _stats = json.loads(f.read())

        if not self.debug:
            self._stats = _stats
        return _stats

    def get(self, name):
        if not self.host:
            return self.stats.get(name, '')
        return urljoin(self.host, self.stats.get(name, ''))
