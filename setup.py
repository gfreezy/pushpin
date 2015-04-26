#!/usr/bin/env python
from distutils.core import setup

setup(
    name='Pushpin',
    version='1.0',
    description='Pushpin',
    author='gfreezy',
    author_email='gfreezy@gmail.com',
    url='https://www.python.org/sigs/distutils-sig/',
    packages=['pushpin'],
    install_requires=[
        'Flask==0.10.1',
        'peewee==2.5.1',
        'requests==2.5.0',
        'pytest==2.7.0',
        'mock==1.0.1',
    ]
)
