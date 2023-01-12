
from datetime import timedelta


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = "MY_SECRET"
    JWT_TOKEN_LOCATION = ["headers", "cookies"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=60*48)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    JWT_ACCESS_COOKIE_PATH = "/"
    JWT_REFRESH_COOKIE_PATH = "/auth/token-refresh"
    JWT_COOKIE_CSRF_PROTECT = False
    JWT_COOKIE_SECURE = False
    JWT_SESSION_COOKIE = True
    JWT_ACCESS_COOKIE_NAME = "__session"
    RESET_PASSWORD_EXPIRES_IN = 10  # minutes


class Development(Config):
    MODE = "DEVELOPMENT"
    DEBUG = True
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'


class Production(Config):
    MODE = "PRODUCTION"
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
