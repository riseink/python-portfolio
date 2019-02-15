from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'pi3t%b08sz@v0&n&(b+9zh)s6(6$3+ew6rb+1vo4af3v_n9mqx'


EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }
DATABASES = {
    'default': {
        'ENGINE': os.getenv('DB_ENGINE','django.db.backends.mysql'),
        'NAME': os.getenv('DB_NAME','wagtail'),
        'USER': os.getenv('DB_USER','root'),
        'PASSWORD': os.getenv('DB_PASSWORD','password'),
        'HOST': os.getenv('DB_HOST','db'),
        'PORT': os.getenv('DB_PORT','3306'),
        'OPTIONS': {
            # https://django-mysql.readthedocs.io/en/latest/checks.html#django-mysql-w003-utf8mb4
            'charset': 'utf8mb4'
        },
        # Tell Django to build the test database with the 'utf8mb4' character set
        # https://django-mysql.readthedocs.io/en/latest/checks.html#django-mysql-w003-utf8mb4
        'TEST': {
            'CHARSET': 'utf8mb4',
            'COLLATION': 'utf8mb4_unicode_ci',
        }
    }
}

try:
    from .local import *
except ImportError:
    pass
