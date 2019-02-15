import os
from .base import *

DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')


# TODO: Set ALLOWED_HOSTS for production
ALLOWED_HOSTS = []

try:
    from .local import *
except ImportError:
    pass
